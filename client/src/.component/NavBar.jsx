import { Navbar, Nav } from 'react-bootstrap';
import React, { useState } from 'react';
import { Layout } from 'antd';
import { Router, Route } from 'react-router-dom';

import {Content} from './index';

function NavBar() {
  return (
    <Layout>
      <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Nav.Link href="/">Trang chủ</Nav.Link>
                  <Nav.Link href="#van">Văn</Nav.Link>
                  <Nav.Link href="#trinh-tham">Trinh thám</Nav.Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
      {/* <Router>
        <Route path="/" element={<ContentBook/>}/>
        <Route path="#van" element={<ContentBook/>}/>
        <Route path="#trinh-tham" element={<ContentBook/>}/>
      </Router> */}
      <Content></Content>
    </Layout>
    
  )
}

export default NavBar;