import { useState, useEffect, useContext } from "react";
import { useSearchParams } from "react-router-dom";
import AppointmentDataService from "../../Services/AppointmentDataService";
import EditAppointmentModal from "../UI/Modals/EditAppointmentModal";
import AppointmentsTable from "../UI/Tables/AppointmentsTable";
import AuthContext from '../Context/AuthContext';
import PaginationBar from "../UI/PaginationBar/PaginationBar";

const HomePage = () => {
    const INITIAL_PAGE_COUNT = 5;

    const { user } = useContext(AuthContext);
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [appointmentId, setAppointmentId] = useState(null);
    const [appointments, setAppointments] = useState([]);
    const [pageCount, setPageCount] = useState(INITIAL_PAGE_COUNT);
    const [entriesCount, setEntriesCount] = useState(0);
    const [ws] = useState(null);
    const [searchParams, setSearchParams] = useSearchParams();
    
    const handleOpenForm = (id, event) => {
        setAppointmentId(id);
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
            const appointmentsData = await AppointmentDataService.getChunk(
                searchParams.get('page'),
                searchParams.get('page_count')
            );

            setEntriesCount(appointmentsData.data.count);
            setAppointments(appointmentsData.data.results);
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
        document.title = 'Appointments - Appointments';
        let ws = new WebSocket('ws://127.0.0.1:8000/ws/test/');
        ws.onopen = () => console.log('ws opened');
        ws.onclose = () => console.log('ws closed');
        ws.onmessage = e => {
            const message = e.data;
            console.log('e', message);
            fetchData();
        };
        if (ws.readyState === 1) {
            ws.close();
        }
    }, [ws]);
    
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
            <h2 className="mb-4">Appointments</h2>
            <div className="d-flex justify-content-around align-items-center">
                {user().userRole.permission_appointment === 'editable' ? 
                <div>
                    <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                        <div className="bi bi-plus-circle"> Create new</div>
                    </button>
                </div> : null
                } 
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
              
            <AppointmentsTable 
                appointments={ appointments } 
                handleOpenForm={ handleOpenForm } 
                fetchData={ fetchData }
            />
            <EditAppointmentModal 
                appointmentId={ appointmentId } 
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

export default HomePage;