import './App.css';
import { Route, Routes } from 'react-router-dom';
import HomePage from './Components/Pages/HomePage/HomePage';
import LoginPage from './Components/Pages/LoginPage/LoginPage';
import RegisterPage from './Components/Pages/RegisterPage/RegisterPage';
import { AuthProvider } from './Components/Context/AuthContext';
import Navigationbar from './Components/UI/Navigationbar/Navigationbar';
import Footer from './Components/Layout/Footer/Footer';

const App = () => {
    return (
        <div className="App">
            <AuthProvider>
                <Navigationbar/>
                <Routes>
                    <Route path="/" element={ <HomePage/> }/>
                    <Route path="/sign-in" element={ <LoginPage/> }/>
                    <Route path="/sign-up" element={ <RegisterPage/> }/>
                </Routes>
            </AuthProvider>
            <Footer/>
        </div>
    );
}

export default App;
