import React from 'react';
import { Nav, NavDropdown } from 'react-bootstrap';

class LeftMenu extends React.Component {
  render() {
    return (
      <Nav className="flex-column">
        <Nav.Link href="#home">Home</Nav.Link>
        <Nav.Link href="#about">About</Nav.Link>
        <NavDropdown title="Services" id="basic-nav-dropdown">
          <NavDropdown.Item href="#service-1">Service 1</NavDropdown.Item>
          <NavDropdown.Item href="#service-2">Service 2</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#all-services">All Services</NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#contact">Contact</Nav.Link>
      </Nav>
    );
  }
}

export default LeftMenu;