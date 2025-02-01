import React, { useContext, useState } from 'react'
import { Button, Col, Container, Form, Image, Row } from 'react-bootstrap'
import vaccine_front_image from '../assets/vaccine-front-image.png';
import { Link, useNavigate } from 'react-router';
import { UserContext } from '../App';

export const RegisterPage = () => {

  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [validated, setValidated] = useState(false);
  const [fullName, setFullName] = useState('');
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
      fullName: fullName,
      email: email,
      password: password
    }

    // Call API to login

    let user = {
      fullName: fullName,
      email: email,
      loggedIn: true
    };

    setUser(user);
    console.log(user);
    navigate('/');
  };

  return (
    <Container style={{ backgroundColor: "#ececec" }} className='vh-100 d-flex justify-content-center align-items-center' fluid>
      <Container style={{ minHeight: '600px', maxWidth: '1000px' }} className='bg-white shadow-lg rounded-3 h-50 w-75'>
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
                <Form.Label className='fs-1 fw-bold'>Đăng ký tài khoản</Form.Label> <br />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control required onChange={(e) => setFullName(e.target.value)} value={fullName} className='mb-2 fs-4' type="text" placeholder="Họ và tên" />
                <Form.Control.Feedback type="invalid">Hãy cung cấp họ và tên</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Control required onChange={(e) => setEmail(e.target.value)} value={email} className='mb-2 fs-4' type="email" placeholder="Email" />
                <Form.Control.Feedback type="invalid">Hãy cung cấp địa chỉ email</Form.Control.Feedback>
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Control required min={8} max={16} onChange={(e) => setPassword(e.target.value)} value={password} className='fs-4' type="password" placeholder="Mật khẩu (8-16 ký tự)" />
                <Form.Control.Feedback type="invalid">Hãy cung cấp mật khẩu (8-16 ký tự)</Form.Control.Feedback>
              </Form.Group>
              <Button className='w-100 mt-5 fs-4 fw-bold rounded-3' variant="success" type="submit">
                Tạo tài khoản
              </Button>
              <Button onClick={() => navigate('/login')} className='w-100 mt-2 fw-bold rounded-3' variant="secondary">
                Quay lại trang đăng nhập
              </Button>
            </Form>
          </Col>
        </Row>
      </Container>
    </Container>
  )
}
