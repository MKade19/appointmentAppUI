import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage';
import LoginPage from './Components/Pages/LoginPage';
import Layout from './Components/Layout/Layout/Layout';
import AuthContext from './Components/Context/AuthContext';
import ChangePasswordPage from './Components/Pages/ChangePasswordPage';
import { useContext } from 'react';
import NotFoundPage from './Components/Pages/ErrorPages/NotFoundPage';
import DepartmentsPage from './Components/Pages/DepartmentsPage';
import EmployeesPage from './Components/Pages/EmployeesPage';
import CustomersPage from './Components/Pages/CustomersPage';

const App = () => {
    const { user } = useContext(AuthContext);

    return (
        <div className="App">
            <Routes>
                <Route path="/" element={ user() ? <Layout/> : <Navigate to={'/auth/sign-in'}/> }>
                    <Route index element={ <HomePage/> }/>
                    <Route path='departments' element={ <DepartmentsPage/> }/>
                    <Route path='employees' element={ <EmployeesPage/> }/>
                    <Route path='customers' element={ <CustomersPage/> }/>
                    <Route path='*' element={ <NotFoundPage/> }/>
                </Route>
                <Route path='/auth' element={ !user() ? null : <Navigate to={'/'}/> }>
                    <Route path="sign-in" element={ <LoginPage/> }/>
                    <Route path="change-password" element={ <ChangePasswordPage/> }/>
                    <Route index element={ <Navigate to={'/auth/sign-in'}/> }/>
                </Route>
            </Routes>
        </div>
    );
}

export default App;
