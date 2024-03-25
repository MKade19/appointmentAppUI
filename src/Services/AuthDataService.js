import axios from "axios";

class AuthDataService {
    login = async (email, password) => {
        try {
            const body = { email, password };
            return await axios.post('http://127.0.0.1:8000/appointment-app/api/auth/token/', body);
        } catch (error) {
            return error.response;
        }
    }

    changePassword = async (email, oldPassword, newPassword, confirmPassword) => {
        try {
            const body = { email, oldPassword, newPassword, confirmPassword };
            return await axios.post("http://127.0.0.1:8000/appointment-app/api/auth/change-password/", body);
        } catch (error) {
            console.log(error.response);
            return error.response;
        }
    }
}

const authDataService = new AuthDataService();
export default authDataService;