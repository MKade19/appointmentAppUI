import { useContext } from 'react'
import { NavLink, Nav, Navbar, Container } from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import AuthContext from '../../Context/AuthContext'

const NavigationBar = () => {
    const { logoutUser, user } = useContext(AuthContext);

    const handleLogout = event => {
        logoutUser();
    }

    return (
        <Navbar bg="light" expand="lg" data-bs-theme="light">
            <Container>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="me-auto">
                        <LinkContainer to={"/"}>
                            <NavLink>Home</NavLink>
                        </LinkContainer>
                        <LinkContainer to={"/customers"}>
                            <NavLink>Customers</NavLink>
                        </LinkContainer>
                        <LinkContainer to={"/departments"}>
                            <NavLink>Departments</NavLink>
                        </LinkContainer>
                        <LinkContainer to={"/employees"}>
                            <NavLink>Employees</NavLink>
                        </LinkContainer>
                    </Nav>
                    <Navbar.Brand className='mr-5'>{!user() ? '' : user().fullname + ' – ' }</Navbar.Brand>
                    { !user ? null : <NavLink onClick={handleLogout}>Log out</NavLink> }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;