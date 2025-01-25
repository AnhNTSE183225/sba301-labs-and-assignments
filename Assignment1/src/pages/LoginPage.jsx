import React from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import vaccine_front_image from '../assets/vaccine-front-image.png';
import { Link } from 'react-router';

export const LoginPage = () => {
    return (
        <Container style={{ backgroundColor: "#ececec" }} className='min-vh-100' fluid>
            <Row className='p-5'>
                <Col xs={12} md={8} lg={6} className='bg-white rounded-5 shadow-sm'>
                    <Row className='h-100 py-3 px-3'>
                        <Col className='rounded-5'
                            style={{
                                backgroundImage: `url(${vaccine_front_image})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat'
                            }}
                        >
                        </Col>
                        <Col>
                            <Form className='p-4'>
                                <Form.Group className='mb-3'>
                                    <Form.Label className='fs-1 fw-bold'>VaccineX</Form.Label> <br/>
                                    <Form.Label className='fs-5'>The world #1 leading in vaccination</Form.Label>
                                </Form.Group>
                                <Form.Group className="mb-1">
                                    <Form.Control className='mb-2 fs-4' type="email" placeholder="Email" />
                                    <Form.Control className='fs-4' type="password" placeholder="Password" />
                                </Form.Group>
                                <Form.Group className="mb-3 d-flex justify-content-between">
                                    <Form.Check className='text-muted fs-6' type="checkbox" label="Remember me" />
                                    <Link to='/forgot-password'>Forgot password?</Link>
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Submit
                                </Button>
                            </Form>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}
