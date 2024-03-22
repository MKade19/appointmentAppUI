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
                <LinkContainer to={"/sign-in"}>
                    <NavLink>Sign in</NavLink>
                </LinkContainer>
                { !user ? null : <NavLink onClick={handleLogout}>Log out</NavLink> }
            </Nav>
            </Container>
        </Navbar>
    )
}

export default Navigationbar;