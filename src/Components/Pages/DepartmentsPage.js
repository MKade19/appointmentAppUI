import { useState, useEffect } from "react";
import DepartmentsTable from "../UI/Tables/DepartmentTable";
import DepartmentDataService from "../../Services/DepartmentDataService";
import EditDepartmentModal from "../UI/Modals/EditDepartmentModal";

const DepartmentsPage = () => {
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
                <button onClick={ event => { handleOpenForm(null, event) } } className="btn btn-outline-primary">
                    <div className="bi bi-plus-circle"> Create new</div>
                </button>
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