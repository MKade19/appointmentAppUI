import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import AuthDataService from "../../Services/AuthDataService";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
    const authTokens = () => localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")) : null;
    const user = () => localStorage.getItem("user") ? JSON.parse(localStorage.getItem("user")) : null;

    const navigate = useNavigate();

    const loginUser = async (email, password) => {
        const response = await AuthDataService.login(email, password);
        const data = response.data;

        if(response.status === 200){
            const tokens = {
                access: data.access, 
                refresh: data.refresh
            }

            localStorage.setItem("authTokens", JSON.stringify(tokens))
            localStorage.setItem("user", JSON.stringify(data.user))
            navigate("/")
            Swal.fire({
                title: "You are logged in",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });

        } else {    
            Swal.fire({
                title: "Email does not exist or Incorrect Password. Please contact to administrator",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            });
        }
    }

    const logoutUser = () => {
        localStorage.removeItem("authTokens");
        localStorage.removeItem("user");
        navigate("/auth/sign-in");
        Swal.fire({
            title: "You are logged out",
            icon: "success",
            toast: true,
            timer: 3000,
            position: 'top-right',
            timerProgressBar: true,
            showConfirmButton: false,
        })
    }

    const changePassword = async (email, oldPassword, newPassword, confirmPassword) => {
        const response = await AuthDataService.changePassword(email, oldPassword, newPassword, confirmPassword);

        if(response.status === 200){
            Swal.fire({
                title: "You have changed a password successfully",
                icon: "success",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })

            navigate("/auth/sign-in");
        } else {
            Swal.fire({
                title: "Error occured. Please verify given data.",
                icon: "error",
                toast: true,
                timer: 3000,
                position: 'top-right',
                timerProgressBar: true,
                showConfirmButton: false,
            })
        }
    }

    const contextData = {
        user, 
        authTokens,
        changePassword,
        loginUser,
        logoutUser,
    }

    return (
        <AuthContext.Provider value={ contextData }>
            { children }
        </AuthContext.Provider>
    )
}