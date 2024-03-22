import RegisterForm from "../../UI/Forms/RegisterForm/RegisterForm";
import { LinkContainer } from "react-router-bootstrap";

const RegisterPage = () => {
    return (
        <div>
            <h1 className="my-4">Sign up</h1>
            <RegisterForm/>
            <LinkContainer to={'/sign-in'}>
                <button className="btn btn-link">Back to sign in</button>
            </LinkContainer>
        </div>
    )
}

export default RegisterPage;