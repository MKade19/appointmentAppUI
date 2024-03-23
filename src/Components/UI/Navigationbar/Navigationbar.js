import { useContext } from 'react'
import { NavLink, Nav, Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AuthContext from '../../Context/AuthContext'

const Navigationbar = () => {
    const { logoutUser, user } = useContext(AuthContext);

    const handleLogout = event => {
        logoutUser();
    }

    return (
        <Navbar bg="light" data-bs-theme="light">
            <Container>
                <LinkContainer to={'/'}>
                    <Navbar.Brand>{!user ? '' : user.email}</Navbar.Brand>
                </LinkContainer>
                <Nav className="me-auto">
                    <LinkContainer to={"/customers"}>
                        <NavLink>Customers</NavLink>
                    </LinkContainer>
                    <LinkContainer to={"/departmets"}>
                        <NavLink>Departmets</NavLink>
                    </LinkContainer>
                    <LinkContainer to={"/employees"}>
                        <NavLink>Employees</NavLink>
                    </LinkContainer>
                    <LinkContainer to={"/appointments"}>
                        <NavLink>Appointments</NavLink>
                    </LinkContainer>
                    { !user ? null : <NavLink onClick={handleLogout}>Log out</NavLink> }
                </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigationbar;