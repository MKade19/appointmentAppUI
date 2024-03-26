import Table from 'react-bootstrap/Table';
import CustomerDataService from '../../../Services/CustomerDataService';
import Swal from "sweetalert2";
import { useContext } from 'react';
import AuthContext from '../../Context/AuthContext';

const CustomersTable = ({ handleOpenForm, customers, fetchData }) => {
    const { user } = useContext(AuthContext);
    const deleteHandler = async (id, event) => {
        Swal.fire({
            title: "Please confirm",
            text: 'Are you sure, to delete the customer? Any appointments the customer involves will be deleted as well',
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
                    title: "Customer has been deleted",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                await CustomerDataService.deleteById(id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const addRows = () => {
        return customers.map(d => createRow(d));
    }
 
    const createRow = customer => {
        return (
            <tr key={customer.id}>
                <td>{customer.fullname}</td>
                <td>{customer.email}</td>
                <td>{customer.phone}</td>
                <td>{customer.address}</td>
                <td>
                {user().userRole.permission_customer === 'editable' ? 
                    <button className='btn btn-outline-primary' onClick={ event => { handleOpenForm(customer.id, event) } }>
                        <i class="bi bi-pen"></i>
                    </button> : null
                }
                </td>
                <td>
                {user().userRole.permission_customer === 'editable' ? 
                    <button className='btn btn-outline-danger' onClick={ event => { deleteHandler(customer.id, event) } }>
                        <i class="bi bi-trash"></i>
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

export default CustomersTable;