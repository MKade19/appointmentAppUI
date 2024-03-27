import { useState, useEffect } from "react";
import CustomersTable from "../UI/Tables/CustomerTable";
import CustomerDataService from "../../Services/CustomerDataService";
import EditCustomerModal from "../UI/Modals/EditCustomerModal";
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const CustomersPage = () => {
    const { user } = useContext(AuthContext);
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [customerId, setCustomerId] = useState(null);
    const [customers, setCustomers] = useState([]);

    const handleOpenForm = (id, event) => {
        setCustomerId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const fetchData = async () => {
        const customersData = await CustomerDataService.getAll()
        setCustomers(customersData.data.results);
    }

    useEffect(() => {
        fetchData().catch(console.error);
        document.title = 'Customers - Appointments';
    }, []);
    
    return (
        <div>
            <h2 className="mb-4">Customers</h2>
            {user().userRole.permission_customer === 'editable' ? 
            <div>
                <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                    <div class="bi bi-plus-circle"> Create new</div>
                </button>
            </div> : null
            }
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
        </div>
    )
}

export default CustomersPage;