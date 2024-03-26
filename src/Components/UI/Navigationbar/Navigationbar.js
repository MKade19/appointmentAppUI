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
                            <NavLink>Appointments</NavLink>
                        </LinkContainer>
                        <LinkContainer to={"/customers"}>
                            <NavLink>Customers</NavLink>
                        </LinkContainer>
                        {user().userRole.permission_department !== 'none' ? 
                            <LinkContainer  to={"/departments"}>
                                <NavLink>Departments</NavLink>
                            </LinkContainer> : null
                        }
                        {user().userRole.permission_employee !== 'none' ? 
                            <LinkContainer to={"/employees"}>
                                <NavLink>Employees</NavLink>
                            </LinkContainer> : null
                        }
                    </Nav>
                    <Navbar>{!user() ? '' : user().fullname + ' – ' + (!user().userRole ? '' : user().userRole.name)}&nbsp;&nbsp;&nbsp;
                    { !user ? null : <NavLink onClick={handleLogout}>Log out</NavLink> }</Navbar>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavigationBar;