import { LinkContainer } from "react-router-bootstrap";
import ChangePasswordForm from "../../UI/Forms/ChangePasswordForm/ChangePasswordForm";

const ChangePasswordPage = () => {
    return (
        <div>
            <h1 className="my-4">Change password</h1>
            <ChangePasswordForm/>
            <LinkContainer to={'/auth/sign-in'}>
                <button className="btn btn-link">Back to sign in</button>
            </LinkContainer>
        </div>
    )
}

export default ChangePasswordPage;