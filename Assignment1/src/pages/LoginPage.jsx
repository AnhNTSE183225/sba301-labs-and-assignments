import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import vaccine_front_image from '../assets/vaccine-front-image.png';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../App';

export const LoginPage = () => {

    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [validated, setValidated] = useState(false);
    const { user, setUser } = useContext(UserContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.currentTarget;

        // Mark form as validated
        setValidated(true);

        if (!form.checkValidity()) {
            e.stopPropagation();
            return;
        }

        let body = {
            email: email,
            password: password
        }

        // Call API to login

        let user = {
            fullName: 'John Doe',
            email: email,
            loggedIn: true
        };

        setUser(user);
        console.log(user);
        navigate('/');
    };


    return (
        <Container style={{ backgroundColor: "#ececec" }} className='vh-100 d-flex justify-content-center align-items-center' fluid>
            <Container style={{ minHeight: '560px', maxWidth: '1000px' }} className='bg-white shadow-lg rounded-3 h-50 w-75'>
                <Row className='h-100 py-3 px-3'>
                    <Col className='rounded-3'
                        style={{
                            backgroundImage: `url(${vaccine_front_image})`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundRepeat: 'no-repeat'
                        }}
                    >
                    </Col>
                    <Col>
                        <Form noValidate validated={validated} onSubmit={handleSubmit} className='p-4'>
                            <Form.Group className='mb-3'>
                                <Form.Label className='fs-1 fw-bold'>VaccineX</Form.Label> <br />
                                <Form.Label className='fs-5'>The world #1 leading in vaccination</Form.Label>
                            </Form.Group>
                            <Form.Group className="mb-3">
                                <Form.Control required onChange={(e) => setEmail(e.target.value)} value={email} className='mb-2 fs-4' type="email" placeholder="Email" />
                                <Form.Control.Feedback type="invalid">Please provide a valid email address</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-2">
                                <Form.Control required onChange={(e) => setPassword(e.target.value)} value={password} className='fs-4' type="password" placeholder="Password" />
                                <Form.Control.Feedback type="invalid">Please provide a password</Form.Control.Feedback>
                            </Form.Group>
                            <Form.Group className="mb-3 d-flex justify-content-between">
                                <Form.Check value={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} className='text-muted fs-6' type="checkbox" label="Remember me" />
                                <Link to='/forgot-password'>Forgot password?</Link>
                            </Form.Group>
                            <Button className='w-100 mt-5 fs-4 fw-bold rounded-3' variant="primary" type="submit">
                                Login
                            </Button>
                            <Button onClick={() => navigate('/register')} className='w-100 mt-2 fw-bold rounded-3' variant="secondary">
                                Register
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}
