import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EmployeeDataService from "../../../Services/EmployeeDataService";
import CustomerDataService from "../../../Services/CustomerDataService";
import AppointmentDataService from "../../../Services/AppointmentDataService";
import Appointment from "../../../Models/Appointment";


const EditAppointmentForm = ({ appointmentId, handleClose, fetchData }) => {
    const [date, setDate] = useState('');
    const [start, setStart] = useState('');
    const [end, setEnd] = useState('');
    const [activeEmployee, setActiveEmployee] = useState({});
    const [activeCustomer, setActiveCustomer] = useState({});
    const [employees, setEmployees] = useState([]);
    const [customers, setCustomers] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const employeesResponse = await EmployeeDataService.getAll();
            setEmployees(employeesResponse.data);
            setActiveEmployee(employeesResponse.data[0]);

            const customersResponse = await CustomerDataService.getAll();
            setCustomers(customersResponse.data);
            setActiveCustomer(customersResponse.data[0]);

            if (appointmentId) {
                const appointmentsResponse = await AppointmentDataService.getById(appointmentId);
                setDate(appointmentsResponse.data.date.split('T')[0]);
                setStart(appointmentsResponse.data.start);
                setEnd(appointmentsResponse.data.end);
                setActiveEmployee(appointmentsResponse.data.employee);
                setActiveCustomer(appointmentsResponse.data.customer);
            }
        } 

        fetchData().catch(console.error);
    }, [appointmentId]);

    const changeDate = event => {
        setDate(event.target.value);
    }

    const changeStart = event => {
        setStart(event.target.value);
    }

    const changeEnd = event => {
        setEnd(event.target.value);
    }

    const changeActiveEmployee = event => {
        setActiveEmployee(employees.filter(e => e.fullname === event.target.value)[0]);
    }

    const changeActiveCustomer = event => {
        setActiveCustomer(customers.filter(c => c.fullname === event.target.value)[0]);
    }

    const addEmployeeOptions = () => {
        return employees.map(e => <option key={e.id}>{e.fullname}</option>);
    }

    const addCustomersOptions = () => {
        return customers.map(c => <option key={c.id}>{c.fullname}</option>);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (appointmentId) {
                response = await AppointmentDataService.updateOne(new Appointment(appointmentId, date, start, end, activeEmployee, activeCustomer));
                Swal.fire({
                    title: "Appointment has been updated",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                response = await AppointmentDataService.createOne(new Appointment(appointmentId, date, start, end, activeEmployee, activeCustomer));
                Swal.fire({
                    title: "Appointment has been created",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }

            fetchData();
            handleClose();
        } catch (error) {
            console.log(error);
            Swal.fire({
                title: `Validation error!`,
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    return (
        <div className="my-3">
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="dateInput">Date</label>
                        <input className="form-control" type="date" id="dateInput" value={date} onChange={changeDate}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="startInput">Start</label>
                        <input type="time" className="form-control" id="startInput" value={start} onChange={changeStart}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="endInput">End</label>
                        <input type="time" className="form-control" id="endInput" value={end} onChange={changeEnd}/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="employeeSelect">Employee</label>
                        <select className="form-select" 
                            id="employeeSelect"
                            value={activeEmployee.fullname} 
                            onChange={changeActiveEmployee} 
                            placeholder="Choose employee">
                            {addEmployeeOptions()}
                        </select>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="customerSelect">Customer</label>
                        <select className="form-select" 
                            id="customerSelect"
                            value={activeCustomer.fullname} 
                            onChange={changeActiveCustomer} 
                            placeholder="Choose customer">
                            {addCustomersOptions()}
                        </select>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditAppointmentForm;