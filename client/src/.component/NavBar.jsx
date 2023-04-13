import { Navbar, Nav } from 'react-bootstrap';
import React, { createContext, useState } from 'react';
import { Layout } from 'antd';
import { Route, Routes, Link } from 'react-router-dom';

import {ContentHome, ContentTrinhTham, ContentVan} from './index';

export const ContentContext = createContext();

function NavBar() {
  const [content, setContent] = useState(<ContentHome/>);

  return (
    <Layout>
      <Navbar bg="light" expand="lg">
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="mr-auto">
                  <Link to="/" className="nav-link" onClick={() => setContent(<ContentHome/>)}>Trang chủ</Link>
                  <Link to="/van" className="nav-link" onClick={() => setContent(<ContentVan/>)}>Văn</Link>
                  <Link to="/trinhtham" className="nav-link" onClick={() => setContent(<ContentTrinhTham/>)}>Trinh thám</Link>
              </Nav>
          </Navbar.Collapse>
      </Navbar>
      <ContentContext.Provider value={{ setContent }}>
        {content}
      </ContentContext.Provider>
    </Layout>  
  )
}

export default NavBar;
