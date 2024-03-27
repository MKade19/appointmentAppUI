import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import EmployeeDataService from "../../../Services/EmployeeDataService";
import Employee from "../../../Models/Employee"
import DepartmentDataService from "../../../Services/DepartmentDataService";
import RoleDataService from "../../../Services/RoleDataService";

const EditEmployeeForm = ({ employeeId, handleClose, fetchData }) => {
    const [fullname, setFullname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [activeDepartment, setActiveDepartment] = useState({});
    const [departments, setDepartments] = useState([]);
    const [password, setPassword] = useState('');
    const [activeRole, setActiveRole] = useState({});
    const [roles, setRoles] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const departmentsResponse = await DepartmentDataService.getAll();
            const rolesResponse = await RoleDataService.getAll();
            setDepartments(departmentsResponse.data.results);            
            setActiveDepartment(departmentsResponse.data.results[0]);
            setRoles(rolesResponse.data.results);
            setActiveRole(rolesResponse.data.results[0]);            

            if (employeeId) {
                const employeeResponse = await EmployeeDataService.getById(employeeId);
                setFullname(employeeResponse.data.fullname);
                setEmail(employeeResponse.data.email);
                setPhone(employeeResponse.data.phone);
                setAddress(employeeResponse.data.address);
                setActiveDepartment(employeeResponse.data.department);
                setActiveRole(employeeResponse.data.role);
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

    const changeActiveDepartment = event => {
        setActiveDepartment(departments.filter(d => d.name === event.target.value)[0]);
    }

    const addDepartmentOptions = () => {
        return departments.map(d => <option key={d.id}>{d.name}</option>);
    }

    const changeActiveRole = event => {
        setActiveRole(roles.filter(d => d.name === event.target.value)[0]);
    }

    const addRoleOptions = () => {
        return roles.map(d => <option key={d.id}>{d.name}</option>);
    }    

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (employeeId) {
                response = await EmployeeDataService.updateOne(new Employee(employeeId, fullname, email, phone, address, activeDepartment, activeRole, password));
                Swal.fire({
                    title: "Employee has been updated",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                response = await EmployeeDataService.createOne(new Employee(-1, fullname, email, phone, address, activeDepartment, activeRole, password));
                Swal.fire({
                    title: "Employee has been created",
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
                        <label className="mx-3" htmlFor="nameInput">Name</label>
                        <input className="form-control" type="text" id="nameInput" value={fullname} onChange={changeFullName} placeholder="Enter name"/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="emailInput">Email</label>
                        <input className="form-control" disabled={ employeeId } type="email" id="emailInput" value={email} onChange={changeEmail} placeholder="Enter email"/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="phoneInput">Phone</label>
                        <input className="form-control" type="text" id="phoneInput" value={phone} onChange={changePhone} placeholder="Enter phone"/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="addressInput">Address</label>
                        <input className="form-control" type="text" id="addressInput" value={address} onChange={changeAddress} placeholder="Enter address"/>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="departmentSelect">Department</label>
                        <select className="form-select" 
                            id="departmentSelect"
                            value={activeDepartment.name} 
                            onChange={changeActiveDepartment} 
                            placeholder="Choose department">
                            {addDepartmentOptions()}
                        </select>
                    </div>
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="roleSelect">Role</label>
                        <select className="form-select" 
                            id="roleSelect"
                            value={activeRole.name} 
                            onChange={changeActiveRole} 
                            placeholder="Choose role">
                            {addRoleOptions()}
                        </select>
                    </div>                    
                    <div className="flex-row align-items-center my-3">
                        <label className="mx-3" htmlFor="passwordInput">Password</label>
                        <input className="form-control" type="password" id="passwordInput" value={password} onChange={changePassword} placeholder="Set New Password"/>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditEmployeeForm;