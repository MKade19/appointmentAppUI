import { useContext, useState } from "react"
import AuthContext from "../../Context/AuthContext";

const LoginForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { loginUser } = useContext(AuthContext);

    const changeEmail = event => {
        setEmail(event.target.value);
    }

    const changePassword = event => {
        setPassword(event.target.value);
    }

    const handleSubmit = async event => {
        event.preventDefault();
        await loginUser(email, password);
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
                        <button
                            type="submit"
                            className="btn btn-primary mt-4"
                        >
                            Login
                        </button>
                    </div>
                </form>
            </div>
            
        </div>
    )
}

export default LoginForm;