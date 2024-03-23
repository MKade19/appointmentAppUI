import { Link, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DepartmentDataService from "../../../../Services/DepartmentDataService";
import Department from "../../../../Models/Department";

const EditDepartmentForm = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');

    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        const departmentId = searchParams.get('id');

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
        const departmentId = searchParams.get('id');

        if (departmentId) {
            response = await DepartmentDataService.updateOne(new Department(departmentId, name, address));
        }
        else {
            response = await DepartmentDataService.createOne(new Department(-1, name, address));
        }
    }

    return (
        <div className="my-3 d-flex flex-column justify-content-center align-items-center">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="my-3" htmlFor="nameInput">Name</label>
                        <input className="form-control" type="text" id="nameInput" value={name} onChange={changeName} placeholder="Enter name"/>
                        <label className="my-3" htmlFor="addressInput">Address</label>
                        <input className="form-control" type="text" id="addressInput" value={address} onChange={changeAddress} placeholder="Enter address"/>
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Submit
                        </button>
                        <div className="my-3">
                            <Link to={'/departments'} className="btn btn-link">Back to departments</Link>
                        </div>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default EditDepartmentForm;