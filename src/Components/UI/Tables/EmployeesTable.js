import Table from 'react-bootstrap/Table';
import EmployeeDataService from '../../../Services/EmployeeDataService';
import Swal from "sweetalert2";
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';

const EmployeesTable = ({ handleOpenForm, employees, fetchData }) => {
    const { user } = useContext(AuthContext);
    const deleteHandler = async (id, event) => {
        Swal.fire({
            title: "Please confirm",
            text: 'Are you sure, to delete the employee? All appointments the employees involve will be deleted as well',
            showDenyButton: true,
            confirmButtonText: 'Yes',
            denyButtonText: 'No',
            confirmButtonColor: '#007bff',
            customClass: {
                actions: 'my-actions',
                cancelButton: 'order-1 right-gap',
                confirmButton: 'order-2',
                denyButton: 'order-3',
            },
        }).then(async (result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Employee was deleted!",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                await EmployeeDataService.deleteById(id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const addRows = () => {
        return employees.map(d => createRow(d));
    }
 
    const createRow = employee => {
        return (
            <tr key={employee.id}>
                <td>{employee.fullname}</td>
                <td>{employee.email}</td>
                <td>{employee.phone}</td>
                <td>{employee.address}</td>
                <td>{employee.department.name}</td>
                <td>{employee.role.name}</td>
                <td>
                {user().userRole.permission_employee === 'editable' ?
                    <button className='btn btn-outline-primary' onClick={ event => { handleOpenForm(employee.id, event) } }>
                        <i className="bi bi-pen"></i>
                    </button> : null
                }
                </td>
                <td>
                {user().userRole.permission_employee === 'editable' ?
                    <button className='btn btn-outline-danger' onClick={ event => { deleteHandler(employee.id, event) } }>
                        <i className="bi bi-trash"></i>
                    </button> : null
                }
                </td>
            </tr>
        )
    }

    return (
        <div className='my-4 px-4'>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                        <th>Department</th>
                        <th>Role</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {addRows()}
                </tbody>
            </Table>
        </div>
    )
}

export default EmployeesTable;