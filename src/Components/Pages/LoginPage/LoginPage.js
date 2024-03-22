import LoginForm from "../../UI/Forms/LoginForm/LoginForm"
import { LinkContainer } from "react-router-bootstrap";

const LoginPage = () => {
    return (
        <div>
            <h1 className="my-4">Sign in</h1>
            <LoginForm/>
            <LinkContainer to={'/sign-up'}>
                <button className="btn btn-link">Sign up</button>
            </LinkContainer>
        </div>
    )
}

export default LoginPage;