import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import DepartmentDataService from "../../../Services/DepartmentDataService";
import Department from "../../../Models/Department";

const EditDepartmentForm = ({ departmentId, handleClose, fetchData }) => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await DepartmentDataService.getById(departmentId);
            setName(response.data.name);
            setAddress(response.data.address);
        } 

        if (departmentId) {
            fetchData().catch(console.error);
        }
    }, []);

    const changeName = event => {
        setName(event.target.value);
    }

    const changeAddress = event => {
        setAddress(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (departmentId) {
                response = await DepartmentDataService.updateOne(new Department(departmentId, name, address));
                Swal.fire({
                    title: "Department has been updated",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                response = await DepartmentDataService.createOne(new Department(-1, name, address));
                Swal.fire({
                    title: "Department has been created",
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
                    <div className="flex-row my-3">
                        <label className="mx-3" htmlFor="nameInput">Name</label>
                        <input className="form-control" type="text" id="nameInput" value={name} onChange={changeName} placeholder="Enter name"/>
                    </div>
                    <div className="flex-row my-3">
                        <label className="mx-3" htmlFor="addressInput">Address</label>
                        <input className="form-control" type="text" id="addressInput" value={address} onChange={changeAddress} placeholder="Enter address"/>
                    </div>
                    <div className="d-flex justify-content-end">
                        <button type="submit" className="btn btn-primary">Submit</button>
                    </div>
                </div>
            </form>
        </div>
    )
}

export default EditDepartmentForm;