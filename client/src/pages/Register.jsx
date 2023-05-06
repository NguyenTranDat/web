import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Login from './Login';

function Register({userID, setUserID}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [switchLogin, setSwitchLogin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/register', { username, password });
      console.log(1);
      setSwitchLogin(true);
    } catch (error) {
      console.log(error);
    }
  };

  if(switchLogin === true) {
    return <Login userID={userID} setUserID={setUserID} />
  }

  return (
    <Container>
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h3 className="text-center">Đăng ký</h3>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="Nhập tên đăng nhập" value={username} onChange={(e) => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Mật khẩu</Form.Label>
              <Form.Control type="password" placeholder="Nhập mật khẩu" value={password} onChange={(e) => setPassword(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicConfirmPassword">
              <Form.Label>Xác nhận mật khẩu</Form.Label>
              <Form.Control type="password" placeholder="Nhập lại mật khẩu" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
            </Form.Group>

            <Button variant="primary" type="submit" style={{margin: 5}}>
              Đăng ký
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
