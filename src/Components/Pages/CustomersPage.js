import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import CustomersTable from "../UI/Tables/CustomerTable";
import CustomerDataService from "../../Services/CustomerDataService";
import EditCustomerModal from "../UI/Modals/EditCustomerModal";
import AuthContext from '../Context/AuthContext';
import PaginationBar from "../UI/PaginationBar/PaginationBar";

const CustomersPage = () => {
    const INITIAL_PAGE_COUNT = 5;

    const { user } = useContext(AuthContext);
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const [customers, setCustomers] = useState([]);
    const [pageCount, setPageCount] = useState(INITIAL_PAGE_COUNT);
    const [entriesCount, setEntriesCount] = useState(0);
    const [searchParams, setSearchParams] = useSearchParams();

    const handleOpenForm = (id, event) => {
        setCustomerId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const changePageCount = event => {
        setPageCount(event.target.value);
    }

    const fetchData = async () => {
        try {
            const customersData = await CustomerDataService.getChunk(
                searchParams.get('page'),
                searchParams.get('page_count')
            );

            setEntriesCount(customersData.data.count);
            setCustomers(customersData.data.results);
        } catch (error) {
            if (error.response.status === 404) {
                setSearchParams(params => {
                    params.set("page", searchParams.get('page') - 1);
                    return params;
                });
            }
        }   
    }

    useEffect(() => {
        setSearchParams(params => {
            params.set("page", 1);
            params.set("page_count", INITIAL_PAGE_COUNT);
            return params;
        });

        fetchData().catch(console.error);
        document.title = 'Customers - Appointments';
    }, []);

    useEffect(() => {
        fetchData().catch(console.error);
    }, [searchParams]);

    useEffect(() => {
        setSearchParams(params => {
            params.set("page_count", pageCount);
            return params;
        });
    }, [pageCount]);
    
    return (
        <div>
            <h2 className="mb-4">Customers</h2>
            <div className="d-flex justify-content-around align-items-center">
                { user().userRole.permission_customer === 'editable' ? 
                <div>
                    <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                        <div className="bi bi-plus-circle"> Create new</div>
                    </button>
                </div> : null }
                <div className="d-flex align-items-center">
                    Show 
                    <input className="form-control mx-3"
                        type="number" 
                        id="pageCount" 
                        value={ pageCount } 
                        min={2}
                        onChange={ changePageCount }
                        /> 
                    entries
                </div>
            </div>
            <CustomersTable 
                customers={ customers } 
                handleOpenForm={ handleOpenForm } 
                fetchData={ fetchData }
            />
            <EditCustomerModal 
                customerId={ customerId } 
                showModal={ editFormOpened } 
                handleClose={ handleCloseForm }
                fetchData={ fetchData }
            />
            <PaginationBar 
                entriesCount={ entriesCount } 
                pagesCount={ pageCount }
            />
        </div>
    )
}

export default CustomersPage;