import { Navbar, Nav } from 'react-bootstrap';
import React, { Component } from 'react';

class NavBar extends Component {
  render() {
    return (
      <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
              <Nav.Link href="#home">Toán</Nav.Link>
              <Nav.Link href="#about">Lý</Nav.Link>
              <Nav.Link href="#services">Hóa</Nav.Link>
              <Nav.Link href="#contact">Contact</Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
    )
  }
  
}

export default NavBar;