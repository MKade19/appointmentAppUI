import { useState, useEffect } from "react";
import DepartmentsTable from "../UI/Tables/DepartmentTable";
import DepartmentDataService from "../../Services/DepartmentDataService";
import EditDepartmentModal from "../UI/Modals/EditDepartmentModal";
import { useContext } from 'react';
import AuthContext from '../Context/AuthContext';

const DepartmentsPage = () => {
    const { user } = useContext(AuthContext);
    const [editFormOpened, setEditFormOpened] = useState(false);
    const [departmentId, setDepartmentId] = useState(null);
    const [departments, setDepartments] = useState([]);

    const handleOpenForm = (id, event) => {
        setDepartmentId(id);
        setEditFormOpened(true);
    }

    const handleCloseForm = event => {
        setEditFormOpened(false);
    }

    const fetchData = async () => {
        const departmentsData = await DepartmentDataService.getAll()
        setDepartments(departmentsData.data);
    }

    useEffect(() => {
        fetchData().catch(console.error);
        document.title = 'Departments - Appointments';
    }, []);
    
    return (
        <div>
            <h2 className="mb-4">Departments</h2>
            <div>
            {user().userRole.permission_department === 'editable' ? 
                <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                    <div className="bi bi-plus-circle"> Create new</div>
                </button> : null
            }
            </div>
            <DepartmentsTable 
                departments={ departments } 
                handleOpenForm={ handleOpenForm } 
                fetchData={ fetchData }
            />
            <EditDepartmentModal 
                departmentId={ departmentId } 
                showModal={ editFormOpened } 
                handleClose={ handleCloseForm }
                fetchData={ fetchData }
            />
        </div>
    )
}

export default DepartmentsPage;