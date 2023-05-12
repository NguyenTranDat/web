import { useEffect, useState } from "react";
import { Layout } from "antd";
import axios from "axios";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";
import { APIgetUserInfo } from "../API/getUserInfo";

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showBooked, setShowBooked] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  useEffect(() => {
    async function fetchUserInfo() {
      try {
        const response = await APIgetUserInfo(localStorage.getItem("userID"))
        setUserInfo(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchUserInfo();
  }, []);

  
  const changePassword = () => {
    return (
      <div class="container mt-5">
          <div class="row justify-content-center">
            <div class="col-md-6">
                <h2>Change Password</h2>
                <form>
                  <div class="form-group">
                      <label for="current-password">Current Password</label>
                      <input type="password" name="currentPassword" id="current-password" class="form-control" />
                  </div>
                  <div class="form-group">
                      <label for="new-password">New Password</label>
                      <input type="password" name="newPassword" id="new-password" class="form-control" />
                  </div>
                  <div class="form-group">
                      <label for="confirm-password">Confirm Password</label>
                      <input type="password" name="confirmPassword" id="confirm-password" class="form-control" />
                  </div>
                  <button type="submit" class="btn btn-primary btn-block">Save Changes</button>
                </form>
            </div>
          </div>
      </div>
    )
  }

  const getUserInfo = () => {
    if (userInfo === null) {
      return <p>Loading...</p>;
    }
    return (
      <Card>
        <Card.Header>
          <h5>{userInfo.name}</h5>
          <p>{userInfo.age}</p>
        </Card.Header>
        <Card.Body>
          <ListGroup variant="flush">
            <ListGroupItem>
              <h6>Số điện thoại:</h6>
              <p>{userInfo.phone}</p>
            </ListGroupItem>
            <ListGroupItem>
              <h6>Địa chỉ:</h6>
              <p>{userInfo.address}</p>
            </ListGroupItem>
          </ListGroup>
        </Card.Body>
      </Card>
    );
  };

  const lognout = () => {
    localStorage.setItem("userID", null);
    window.location.href = "/login";
  }

  const booked = () => {
  }

  const handleClick = (_showChangePassword, _showBooked, _showBooking, _showInfo) => {
    setShowBooked(_showBooked);
    setShowBooking(_showBooking);
    setShowChangePassword(_showChangePassword);
    setShowInfo(_showInfo);
  };

  const content = () => {
    if(showInfo) return getUserInfo();
    if(showChangePassword) return changePassword();
  }

  return (
    <Layout>
      <Container>
        <Row>
          <Col md={3}>
            <Card>
              <Card.Header onClick={() => handleClick(false, false, false, true)}>Hồ sơ của tôi</Card.Header>
              <ListGroup variant="flush">
                <ListGroupItem onClick={() => handleClick(false, false, false, true)}>Thông tin cá nhân</ListGroupItem>
                <ListGroupItem onClick={() => handleClick(true, false, false, false)}>Đổi mật khẩu</ListGroupItem>
                <ListGroupItem onClick={() => lognout()}>Đăng xuất</ListGroupItem>
              </ListGroup>
              <Card.Header>Lịch sử </Card.Header>
              <ListGroup variant="flush">
                <ListGroupItem onClick={() => handleClick(false, false, true, false)}>Sách đang mượn</ListGroupItem>
                <ListGroupItem onClick={() => handleClick(false, true, false, false)}>Sách đã trả</ListGroupItem>
              </ListGroup>
            </Card>
          </Col>
          <Col md={9}>
            <Card>{content()}</Card>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
}

export default UserInfo;
