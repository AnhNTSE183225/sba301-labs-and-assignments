import React, { createContext, useContext } from 'react'
import { Link, Navigate, Outlet } from 'react-router';
import { signOut, UserContext } from '../App';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';


export const ProtectedRoutes = () => {
    const { user, setUser } = useContext(UserContext);
    return user.loggedIn ?
        <>
            <Navbar expand="lg" className="bg-body-tertiary">
                <Container>
                    <Navbar.Brand as={Link} to='/'>VaccineX</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Nav.Link as={Link} to='/stock-management'>Stock</Nav.Link>
                            <Nav.Link as={Link} to='/transaction-management'>Transactions</Nav.Link>
                            <NavDropdown title={user.fullName} id="basic-nav-dropdown">
                                <NavDropdown.Item as={Link} to='/profile'>Profile</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/settings'>Settings</NavDropdown.Item>
                                <NavDropdown.Item as={Link} to='/feedback'>Feedback</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item onClick={() => signOut(setUser)}>
                                    Logout
                                </NavDropdown.Item>
                            </NavDropdown>
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <Outlet />
        </>
        : <Navigate to='/login' />
}
