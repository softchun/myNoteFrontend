import axios from 'axios';
import logo from '../logo.svg';
import logo001 from './logo001.png';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Navbar, Nav, NavDropdown } from 'react-bootstrap';

const baseURL = 'http://localhost:5000';

function NavBar() {

    const navigate = useNavigate();

    function handleLogout(e) {
        e.preventDefault();
        localStorage.removeItem("token");
        navigate('/');
    }

    const [user, setUser] = useState();

    useEffect(() => {
        axios.get(`${baseURL}/user`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            }
        })
            .then((response) => {
                if (response.status === 403){
                    localStorage.removeItem("token");
                }
                setUser(response.data.username)
            });
    }, []);

    return (
        <Navbar bg="dark" variant="dark" expand="md">
            <Container>
                <Navbar.Brand href="/home">
                    <img
                        alt=""
                        src={logo001}
                        width="30"
                        height="30"
                        className="d-inline-block align-top"
                    />{' '}
                    MyNote
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="container-fluid">
                        <Nav.Link href="/home">Home</Nav.Link>
                        <Nav.Link href="/mynote">My Notes</Nav.Link>
                        <Nav.Link href="/fav">My Fav Notes</Nav.Link>
                        <Nav.Link href="/createnote">Create Note</Nav.Link>
                        <Nav.Item className="ms-auto">
                            <NavDropdown title={user} id="basic-nav-dropdown">
                                <NavDropdown.Item href="/editprofile">Edit Profile</NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action/3.4" onClick={handleLogout}>Log out</NavDropdown.Item>
                            </NavDropdown>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default NavBar
