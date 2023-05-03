import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from 'react-bootstrap';
import { Layout } from 'antd';

import Cart from "./Cart";
import { UserProfile, ChangePassword, Booked } from './consequence';
import { NavBar } from './consequence';
import { getSearchResults, getUserID } from "./consequence";
import { Link } from 'react-router-dom';


function User({ userID, setUserID, searchTerm, setSearchTerm, searchResults, setSearchResults}) {
  const [showInfo, setShowInfo] = useState(true);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showBooked, setShowBooked] = useState(false);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const res = await getUserID();
      setUserID(res);
    }

    fetchData();
  }, []);

  const handleClick = (_showChangePassword, _showBooked, _showBooking, _showInfo) => {
    setShowInfo(_showInfo);
    setShowChangePassword(_showChangePassword);
    setShowBooked(_showBooked);
    setShowBooking(_showBooking);
  }

  const handleExit = () => {
    setUserID(0);
    window.location.href = '/login';
  }

  if(showBooking === true) {
    return <Cart userID={userID} />
  }

  return (
    <Layout>
      <NavBar setSearchTerm={setSearchTerm} />
      <Container>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Header onClick={() => handleClick(false, false, false, true)}>Hồ sơ của tôi</Card.Header>
              <ListGroup variant="flush">
                <ListGroupItem onClick={() => handleClick(false, false, false, true)}>Thông tin cá nhân</ListGroupItem>
                <ListGroupItem onClick={() => handleClick(true, false, false, false)}>Đổi mật khẩu</ListGroupItem>
                <ListGroupItem onClick={() => handleExit()}>Đăng xuất</ListGroupItem>
              </ListGroup>
              <Card.Header>Lịch sử </Card.Header>
              <ListGroup variant="flush">
                <ListGroupItem onClick={() => handleClick(false, false, true, false)}>Sách đang mượn</ListGroupItem>
                <ListGroupItem onClick={() => handleClick(false, true, false, false)}>Sách đã trả</ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
          <Col md={9}>
            <Card>
              {showInfo ? <UserProfile /> :  null}
              {showChangePassword ? <ChangePassword /> : null }
              {showBooked ? <Booked userID={userID} /> : null }
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default User;
