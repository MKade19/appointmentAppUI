import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import CustomerDataService from "../../../Services/CustomerDataService";
import Customer from "../../../Models/Customer";

const EditCustomerForm = ({ customerId, handleClose, fetchData }) => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await CustomerDataService.getById(customerId);
            setFullName(response.data.fullname);
            setEmail(response.data.email);
            setPhone(response.data.phone);
            setAddress(response.data.address);
        } 

        if (customerId) {
            fetchData().catch(console.error);
        }
    }, []);

    const changeFullName = event => {
        setFullName(event.target.value);
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

    const handleSubmit = async event => {
        event.preventDefault();
        let response;

        try {
            if (customerId) {
                response = await CustomerDataService.updateOne(new Customer(customerId, fullname, email, phone, address));
                Swal.fire({
                    title: "Customer has been updated",
                    icon: "success",
                    toast: true,
                    timer: 3000,
                    position: 'top-right',
                    timerProgressBar: true,
                    showConfirmButton: false,
                });
            }
            else {
                response = await CustomerDataService.createOne(new Customer(-1, fullname, email, phone, address));
                Swal.fire({
                    title: "Customer has been created",
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
                        <label className="mx-3" htmlFor="fullNameInput">Fullname</label>
                        <input className="form-control" type="text" id="fullNameInput" value={fullname} onChange={changeFullName} placeholder="Enter fullname"/>
                    </div>
                    <div className="flex-row my-3">
                        <label className="mx-3" htmlFor="emailInput">Email</label>
                        <input className="form-control" type="text" id="emailInput" value={email} onChange={changeEmail} placeholder="Enter email"/>
                    </div>
                    <div className="flex-row my-3">
                        <label className="mx-3" htmlFor="phoneInput">Phone</label>
                        <input className="form-control" type="text" id="phoneInput" value={phone} onChange={changePhone} placeholder="Enter phone"/>
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

export default EditCustomerForm;