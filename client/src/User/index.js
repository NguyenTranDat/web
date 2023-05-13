import { useEffect, useState } from "react";
import { Layout } from "antd";
import { Link } from "react-router-dom";
import { Container, Row, Col, Card, ListGroup, ListGroupItem } from "react-bootstrap";

import Logo from "../img/logo192.png";
import user from "../img/user.png";
import home from "../img/home.png";
import cart from "../img/cart.png";

import { APIgetUserInfo } from "../API/getUserInfo";
import { getBorrowBooks } from "../API/getBorrowBooks";
import { getBookRental } from "../API/getBookRental";

function UserInfo() {
  const [userInfo, setUserInfo] = useState(null);
  const [borrowBooks, setBorrowBooks] = useState(null);
  const [giveBooks, setGiveBooks] = useState(null);
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showBooked, setShowBooked] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [showBooking, setShowBooking] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

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

  useEffect(() => {
    async function fetchBorrowBooks() {
      try {
        const response = await getBorrowBooks(localStorage.getItem("userID"));
        setBorrowBooks(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchBorrowBooks();
  }, []);

  useEffect(() => {
    async function fetchGiveBooks() {
      try {
        const response = await getBookRental(localStorage.getItem("userID"));
        setGiveBooks(response);
      } catch (error) {
        console.log(error);
      }
    }
    fetchGiveBooks();
  }, []);


  const changePassword = () => {
    const handleRental = async () => {
      await changePassword(currentPassword, newPassword, localStorage.getItem("userID"));
  }

  const handleSubmit = () => {
      if(newPassword !== confirmPassword) {
        return;
      }

      const confirmation = window.confirm(`bạn muốn đổi mật khẩu?`);

      if (confirmation) {
          console.log('Người dùng đã xác nhận.');
          handleRental();
      } else {
          console.log('Người dùng đã huỷ bỏ.');
      }
  };

    return (
      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <h2>Change Password</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="current-password">Current Password</label>
                <input 
                  type="password" 
                  name="currentPassword" 
                  id="current-password" 
                  className="form-control" 
                  value={currentPassword} 
                  onChange={(event) => setCurrentPassword(event.target.value)} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="new-password">New Password</label>
                <input 
                  type="password" 
                  name="newPassword" 
                  id="new-password" 
                  className="form-control" 
                  value={newPassword} onChange={(event) => setNewPassword(event.target.value)} 
                />
              </div>
              <div className="form-group">
                <label htmlFor="confirm-password">Confirm Password</label>
                <input 
                  type="password" 
                  name="confirmPassword" 
                  id="confirm-password" 
                  className="form-control" 
                  value={confirmPassword} onChange={(event) => setConfirmPassword(event.target.value)} 
                />
              </div>
              <button type="submit" className="btn btn-primary btn-block">Save Changes</button>
            </form>
          </div>
        </div>
      </div>
    );
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
    return (
      <Card>
        <Card.Header>
          <h3>Sách đã trả</h3>
        </Card.Header>
        <Card.Body>
          {Array.isArray(borrowBooks) && borrowBooks.map(book =>
            <Card style={{ marginBottom: '1rem' }}>
              <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: '1', marginRight: '1rem' }}>
                  <img src={book.content} alt={book.name} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <div style={{ flex: '2', marginRight: '1rem' }}>
                  <h5>{book.name}</h5>
                </div>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    )
  }

  const booking = () => {
    return (
      <Card>
        <Card.Header>
          <h3>Sách đang mượn</h3>
        </Card.Header>
        <Card.Body>
          {Array.isArray(giveBooks) && giveBooks.map(book =>
            <Card style={{ marginBottom: '1rem' }}>
              <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                <div style={{ flex: '1', marginRight: '1rem' }}>
                  <img src={book.content} alt={book.name} style={{ maxWidth: '100%', height: 'auto' }} />
                </div>
                <div style={{ flex: '2', marginRight: '1rem' }}>
                  <h5>{book.name}</h5>
                </div>
              </Card.Body>
            </Card>
          )}
        </Card.Body>
      </Card>
    )
  }

  const handleClick = (_showChangePassword, _showBooked, _showBooking, _showInfo) => {
    setShowBooked(_showBooked);
    setShowBooking(_showBooking);
    setShowChangePassword(_showChangePassword);
    setShowInfo(_showInfo);
  };

  const content = () => {
    if (showInfo) return getUserInfo();
    if (showChangePassword) return changePassword();
    if (showBooked) return booked();
    if (showBooking) return booking();
  }

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

  return (
    <Layout>
      <Container>
        <Header />
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
