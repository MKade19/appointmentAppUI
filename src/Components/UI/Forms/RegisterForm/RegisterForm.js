import { useContext, useState } from "react"
import AuthContext from "../../../Context/AuthContext";

const RegisterForm = () => {
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();

    const { registerUser } = useContext(AuthContext);

    const changeEmail = event => {
        setEmail(event.target.value);
    }

    const changePassword = event => {
        setPassword(event.target.value);
    }

    const changeConfirmPassword = event => {
        setConfirmPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await registerUser(email, password, confirmPassword);

        console.log(email);
        console.log(password);
        console.log(confirmPassword);
    }

    return (
        <div className="my-3 d-flex flex-column justify-content-center align-items-center">
            <div>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="my-3" htmlFor="emailInput">Email</label>
                        <input className="form-control" type="email" id="emailInput" value={email} onChange={changeEmail} placeholder="Enter email"/>
                        <label className="my-3" htmlFor="passwordInput">Password</label>
                        <input className="form-control" type="password" id="passwordInput" value={password} onChange={changePassword} placeholder="Password"/>
                        <label className="my-3" htmlFor="confirmPasswordInput">Confirm password</label>
                        <input 
                            className="form-control" 
                            type="password" 
                            id="confirmPasswordInput" 
                            value={confirmPassword} 
                            onChange={changeConfirmPassword} 
                            placeholder="Confirm password"
                            />
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default RegisterForm;