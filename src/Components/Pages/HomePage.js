import { useState, useEffect } from "react";
import AppointmentDataService from "../../Services/AppointmentDataService";
import EditAppointmentModal from "../UI/Modals/EditAppointmentModal";
import AppointmentsTable from "../UI/Tables/AppointmentsTable";

const HomePage = () => {
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [appointmentId, setAppointmentId] = useState(null);
    const [appointments, setAppointments] = useState([]);

    const handleOpenForm = (id, event) => {
        setAppointmentId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const fetchData = async () => {
        const appointmentsData = await AppointmentDataService.getAll();
        setAppointments(appointmentsData.data);
    }

    useEffect(() => {
        fetchData().catch(console.error);
    }, []);

    return (
        <div>
            <h2 className="mb-4">Appointments</h2>
            <div>
                <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                    <div className="bi bi-plus-circle"> Create new</div>
                </button>
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
        </div>
    )
}

export default HomePage;