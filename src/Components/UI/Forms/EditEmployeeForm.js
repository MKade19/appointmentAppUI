import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EmployeeDataService from "../../../Services/EmployeeDataService";
import Employee from "../../../Models/Employee"
import DepartmentDataService from "../../../Services/DepartmentDataService";

const EditEmployeeForm = ({ employeeId, handleClose, fetchData }) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [activeDepartment, setActiveDepartment] = useState({});
    const [departments, setDepartments] = useState([]);
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const departmentsResponse = await DepartmentDataService.getAll();
            setDepartments(departmentsResponse.data);
            setActiveDepartment(departmentsResponse.data[0]);

            if (employeeId) {
                const employeeResponse = await EmployeeDataService.getById(employeeId);
                setFullname(employeeResponse.data.fullname);
                setEmail(employeeResponse.data.email);
                setPhone(employeeResponse.data.phone);
                setAddress(employeeResponse.data.address);
            }
        } 

        fetchData().catch(console.error);
    }, [employeeId]);

    const changeFullName = event => {
        setFullname(event.target.value);
    }

    const changeEmail = event => {
        setEmail(event.target.value);
    }

    const changePhone = event => {
        setPhone(event.target.value);
    }

    const changeAddress = event => {
        setAddress(event.target.value);
    }

    const changePassword = event => {
        setPassword(event.target.value);
    }

    const changeConfirmPassword = event => {
        setConfirmPassword(event.target.value);
    }

    const changeActiveDepartment = event => {
        setActiveDepartment(departments.filter(d => d.name === event.target.value)[0]);
    }

    const addDepartmentOptions = () => {
        return departments.map(d => <option key={d.id}>{d.name}</option>);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (password !== confirmPassword) {
                Swal.fire({
                    title: "Passwords don't match!",
                    icon: "error",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }

            if (employeeId) {
                response = await EmployeeDataService.updateOne(new Employee(employeeId, fullname, email, phone, address, activeDepartment, password));
                Swal.fire({
                    title: "Employee was updated!",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                console.log(activeDepartment);
                response = await EmployeeDataService.createOne(new Employee(-1, fullname, email, phone, address, activeDepartment, password));
                Swal.fire({
                    title: "Employee was created!",
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
                    <div className="d-flex flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="nameInput">Name</label>
                        <input className="form-control" type="text" id="nameInput" value={fullname} onChange={changeFullName} placeholder="Enter name"/>
                    </div>
                    <div className="d-flex flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="emailInput">Email</label>
                        <input className="form-control" type="email" id="emailInput" value={email} onChange={changeEmail} placeholder="Enter email"/>
                    </div>
                    <div className="d-flex flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="phoneInput">Phone</label>
                        <input className="form-control" type="text" id="phoneInput" value={phone} onChange={changePhone} placeholder="Enter phone"/>
                    </div>
                    <div className="d-flex flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="addressInput">Address</label>
                        <input className="form-control" type="text" id="addressInput" value={address} onChange={changeAddress} placeholder="Enter address"/>
                    </div>
                    <div className="d-flex flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="departmentSelect">Department</label>
                        <select className="form-select" 
                            id="departmentSelect"
                            value={activeDepartment.name} 
                            onChange={changeActiveDepartment} 
                            placeholder="Choose department">
                            {addDepartmentOptions()}
                        </select>
                    </div>
                    <div className="d-flex flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="passwordInput">Password</label>
                        <input className="form-control" type="password" id="passwordInput" value={password} onChange={changePassword} placeholder="Password"/>
                    </div>
                    <div className="d-flex justify-content-center">
                        <button type="submit" className="btn btn-primary mt-4">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditEmployeeForm;