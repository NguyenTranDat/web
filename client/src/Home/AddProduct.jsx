import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";

import Logo from "../img/logo192.png";
import user from "../img/user.png";
import home from "../img/home.png";
import cart from "../img/cart.png";


function Addproduct() {
  const [ten, setTen] = useState('');
  const [link, setLink] = useState('');
  const [type, setType] = useState('');

  const Header = () => {
    return (
      <div className="container-fluid navbar-container" >
        <a className="navbar-brand" href="/">
          <img src={Logo} alt="logo" id="img-logo" />
        </a>

        <h1 style={{ color: 'white', margin: '0 20px' }}>Quản lý thư viện</h1>

        <div style={{ marginLeft: 'auto' }}>
          <button id='user'><Link to='/user'><img src={user} alt="user" /></Link></button>
          <button id="home"><Link to="/"><img src={home} alt="home" /></Link></button>
          <button id="cart"><Link to="/cart"><img src={cart} alt="cart" /></Link></button>
        </div>
      </div>
    );
  }

  const handleBorrow = (e) => {
    e.preventDefault();
    const confirmation = window.confirm(`Xác nhận thêm ${ten} vào thư viện?`);
    if (confirmation) {
      console.log("Xác nhận thêm sản phẩm vào thư viện");
    }
  };
  
  return (
    <Container>
      <Header />
      <Row className="justify-content-md-center mt-5">
        <Col md={6}>
          <h3 className="text-center">Đăng ký sản phẩm</h3>
          <Form>
            <Form.Group>
              <Form.Label>Tên</Form.Label>
              <Form.Control type="text" placeholder="Tam Quoc dien nghia" value={ten} onChange={(e) => setTen(e.target.value)} />
            </Form.Group>
  
            <Form.Group>
              <Form.Label>Link</Form.Label>
              <Form.Control type="text" placeholder="https://..." value={link} onChange={(e) => setLink(e.target.value)} />
            </Form.Group>
  
            <Form.Group>
              <Form.Label>Type</Form.Label>
              <Form.Control type="text" placeholder="Van, ...." value={type} onChange={(e) => setType(e.target.value)} />
            </Form.Group>
            <Button className="login-button" style={{ margin: '10px' }} onClick={handleBorrow}>Xác nhận</Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default Addproduct;