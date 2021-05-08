import axios from 'axios';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, Button, Card, Alert, Container } from "react-bootstrap";


const RegisterScreen = ({ history }) => {
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmpassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if(localStorage.getItem("authToken")) {
            history.push(`/`);
        }
    }, [history]);

    //Submit data to backend
    const registerHandler = async (e) => {
        e.preventDefault();

        const config = {
            header: {
              "Content-Type": "application/json",
            },
        };

        if (password !== confirmpassword) {
            setPassword("");
            setConfirmPassword("");
            setTimeout(() => {
              setError("");
            }, 5000);
            return setError("Passwords do not match");
        }

        try {
            const {data} = await axios.post("/api/auth/register", {firstname, lastname, email, password}, config);

            localStorage.setItem("authToken", data.token);
            //console.log(data.token);

            history.push(`/`);
        } catch (error) {
            setError(error.response.data.error);
            setTimeout(() => {
                setError("");
            }, 5000);
        }
    };

    return (
        <Container className="d-flex align-items-center justify-content-center" style={{ minHeight: "100vh" }}>
            <div className="w-100" style={{ maxWidth: "400px" }}>
                <Card>
                    <Card.Body>
                        <h2 className="text-center mb-4">Register</h2>
                        {error && <Alert variant="danger">{error}</Alert>}
                        <Form onSubmit={registerHandler}>
                            <Form.Group id="firstname" className="mb-2">
                                <Form.Label>First Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => setFirstName(e.target.value)} value={firstname} required />
                            </Form.Group>
                            <Form.Group id="lastname" className="mb-2">
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control type="text" onChange={(e) => setLastName(e.target.value)} value={lastname} required />
                            </Form.Group>
                            <Form.Group id="email" className="mb-2">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" onChange={(e) => setEmail(e.target.value)} value={email} required />
                            </Form.Group>
                            <Form.Group id="password" className="mb-2">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} value={password} required />
                            </Form.Group>
                            <Form.Group id="password-confirm" className="mb-4">
                                <Form.Label>Password Confirmation</Form.Label>
                                <Form.Control type="password" onChange={(e) => setConfirmPassword(e.target.value)} value={confirmpassword} required />
                            </Form.Group>
                            <Button className="w-100" type="submit">
                                Sign Up
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
                <div className="w-100 text-center mt-2">
                    Already have an account? <Link to="/login">Log In</Link>
                </div>
            </div>
        </Container>
    ); 
};

export default RegisterScreen;