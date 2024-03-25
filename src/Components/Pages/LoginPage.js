import { useEffect } from "react";
import LoginForm from "../UI/Forms/LoginForm"
import { LinkContainer } from "react-router-bootstrap";

const LoginPage = () => {
    useEffect(() => {
        document.title = 'Login - Appointments';
    }, []);
    return (
        <div>
            <h1 className="my-4">Sign in</h1>
            <LoginForm/>
            <LinkContainer to={'/auth/change-password'}>
                <button className="btn btn-link">Change password</button>
            </LinkContainer>
        </div>
    )
}

export default LoginPage;