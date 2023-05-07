import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import Login from './Login';
import { Link } from 'react-router-dom';

function Register({userID, setUserID}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [switchLogin, setSwitchLogin] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(password != confirmPassword) return;
    try {
      const response = await axios.post('http://localhost:9000/api/register', { username, password, firstName, lastName, address, phone });
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
            <Form.Group>
              <Form.Label>Họ</Form.Label>
              <Form.Control type="text" placeholder="Nguyễn Văn" value={firstName} onChange={(e) => setFirstName(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Tên</Form.Label>
              <Form.Control type="text" placeholder="A" value={lastName} onChange={(e) => setLastName(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>SDT</Form.Label>
              <Form.Control type="text" placeholder="0987654321" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </Form.Group>

            <Form.Group>
              <Form.Label>Địa chỉ</Form.Label>
              <Form.Control type="text" placeholder="HN, TP.HCM,..." value={address} onChange={(e) => setAddress(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control type="text" placeholder="example@gamil.com" value={username} onChange={(e) => setUsername(e.target.value)} />
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
            <p>Bạn đã có tài khoản? <Link to="/login">Đăng nhập.</Link></p>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;
