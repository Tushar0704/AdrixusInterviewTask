import React from 'react';
import { Link } from "react-router-dom";
import { useHistory } from "react-router";
import { Button, Form, FormControl, Nav, Navbar } from 'react-bootstrap';

const NavbarScreen = () => {

    const history = useHistory();
    const logoutHandler = () => {
        localStorage.clear();
        localStorage.removeItem("authToken");
        history.push('/login');
    }

    return(
        <Navbar bg="light" variant="light" expand="lg" className="mb-5">
            <Navbar.Brand href="/"> INTERNSHIP-TASK </Navbar.Brand>
            <Nav className="mr-auto">
                <Nav.Link href="/" > HOME </Nav.Link>
                <Nav.Link href="/" onClick={logoutHandler} style={{color: "red", float:"right"}}> LOGOUT </Nav.Link>
            </Nav>
            <Form inline>
                <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                <Button variant="outline-light">Search</Button>
            </Form>
        </Navbar>
    )
}


export default NavbarScreen;