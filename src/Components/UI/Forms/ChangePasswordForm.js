import { useState, useContext } from 'react'
import AuthContext from "../../Context/AuthContext";

const ChangePasswordForm = () => {
    const [email, setEmail] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const { changePassword } = useContext(AuthContext);

    const changeEmail = event => {
        setEmail(event.target.value);
    }

    const changeOldPassword = event => {
        setOldPassword(event.target.value);
    }

    const changeNewPassword = event => {
        setNewPassword(event.target.value);
    }

    const changeConfirmPassword = event => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await changePassword(email, oldPassword, newPassword, confirmPassword);

        console.log(email);
        console.log(oldPassword);
        console.log(newPassword);
        console.log(confirmPassword);
    }

    return (
        <div className="my-3 d-flex flex-column justify-content-center align-items-center">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="my-3" htmlFor="emailInput">Email</label>
                        <input className="form-control" type="email" id="emailInput" value={email} onChange={changeEmail} placeholder="Enter email"/>
                        <label className="my-3" htmlFor="oldPasswordInput">Old password</label>
                        <input className="form-control" type="password" id="oldPasswordInput" value={oldPassword} onChange={changeOldPassword} placeholder="Old password"/>
                        <label className="my-3" htmlFor="newPasswordInput">New password</label>
                        <input className="form-control" type="password" id="newPasswordInput" value={newPassword} onChange={changeNewPassword} placeholder="New password"/>
                        <label className="my-3" htmlFor="confirmPasswordInput">Confirm new Password</label>
                        <input className="form-control" type="password" id="confirmPasswordInput" value={confirmPassword} onChange={changeConfirmPassword} placeholder="Confirm new password"/>
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Change
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default ChangePasswordForm;