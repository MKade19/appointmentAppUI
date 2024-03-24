import Table from 'react-bootstrap/Table';
import DepartmentDataService from '../../../Services/DepartmentDataService';
import Swal from "sweetalert2";

const DepartmentsTable = ({ handleOpenForm, departments, fetchData }) => {
    const deleteHandler = async (id, event) => {
        Swal.fire({
            title: 'Do you want to delete this department?',
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
                    title: "Deparetment was deleted!",
                    icon: "success",
                    toast: true,
                    timer: 1000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                await DepartmentDataService.deleteById(id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const addRows = () => {
        return departments.map(d => createRow(d));
    }
 
    const createRow = department => {
        return (
            <tr key={department.id}>
                <td>{department.name}</td>
                <td>{department.address}</td>
                <td>
                    <button className='btn btn-outline-primary' onClick={ event => { handleOpenForm(department.id, event) } }>
                        <i class="bi bi-pen"></i>
                    </button>
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={ event => { deleteHandler(department.id, event) } }>
                        <i class="bi bi-trash"></i>
                    </button>
                </td>
            </tr>
        )
    }

    return (
        <div className='my-4 px-4'>
            <Table hover striped bordered>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Address</th>
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

export default DepartmentsTable;