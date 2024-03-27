import { useState, useEffect } from "react";
import EmployeesTable from "../UI/Tables/EmployeesTable";
import EmployeeDataService from "../../Services/EmployeeDataService";
import EditEmployeeModal from "../UI/Modals/EditEmployeeModal";
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const EmployeesPage = () => {
    const { user } = useContext(AuthContext);
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [employeeId, setEmployeeId] = useState(null);
    const [employees, setEmployees] = useState([]);

    const handleOpenForm = (id, event) => {
        setEmployeeId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const fetchData = async () => {
        const employeesData = await EmployeeDataService.getAll();
        setEmployees(employeesData.data.results);
    }

    useEffect(() => {
        fetchData().catch(console.error);
        document.title = 'Employees - Appointments';
    }, []);
    
    return (
        <div>
            <h2 className="mb-4">Employees</h2>
            <div>
            {user().userRole.permission_employee === 'editable' ? 
                <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                    <div className="bi bi-plus-circle"> Create new</div>
                </button> : null
            }
            </div>
            <EmployeesTable 
                employees={ employees } 
                handleOpenForm={ handleOpenForm } 
                fetchData={ fetchData }
            />
            <EditEmployeeModal 
                employeeId={ employeeId } 
                showModal={ editFormOpened } 
                handleClose={ handleCloseForm }
                fetchData={ fetchData }
            />
        </div>
    )
}

export default EmployeesPage;