import Table from 'react-bootstrap/Table';
import AppointmentDataService from '../../../Services/AppointmentDataService';
import Swal from "sweetalert2";

const AppointmentsTable = ({ handleOpenForm, appointments, fetchData }) => {
    const deleteHandler = async (id, event) => {
        Swal.fire({
            title: 'Do you want to delete this employee?',
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
                    title: "Appointment was deleted!",
                    icon: "success",
                    toast: true,
                    timer: 1000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
                await AppointmentDataService.deleteById(id);
                await fetchData();
            } else if (result.isDenied) {
                return;
            }
        })
    }

    const addRows = () => {
        return appointments.map(a => createRow(a));
    }
 
    const createRow = appointment => {
        return (
            <tr key={appointment.id}>
                <td>{new Date(appointment.date).toLocaleDateString()}</td>
                <td>{appointment.start}</td>
                <td>{appointment.end}</td>
                <td>{appointment.employee.fullname}</td>
                <td>{appointment.customer.fullname}</td>
                <td>
                    <button className='btn btn-outline-primary' onClick={ event => { handleOpenForm(appointment.id, event) } }>
                        <i className="bi bi-pen"></i>
                    </button>
                </td>
                <td>
                    <button className='btn btn-outline-danger' onClick={ event => { deleteHandler(appointment.id, event) } }>
                        <i className="bi bi-trash"></i>
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
                        <th>Date</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Employee</th>
                        <th>Customer</th>
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

export default AppointmentsTable;