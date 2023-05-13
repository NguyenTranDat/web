import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Layout, Input, Row, Col } from "antd";
import { Card, Button, Modal } from 'react-bootstrap';

import "./Header.css"
import { getBooks } from "../API/getBook";
import { createBorrowBook } from "../API/createBorrowBook";

import Logo from "../img/logo192.png";
import user from "../img/user.png";
import home from "../img/home.png";
import cart from "../img/cart.png";

function Home(props) {
    const [searchTerm, setSearchTerm] = useState(" ");
    const [books, setBooks] = useState([]);
    const isAdmin = localStorage.getItem("isAdmin") === "true";

    const fetchData = async () => {
        const data = await getBooks(searchTerm);
        setBooks(data);
    }

    useEffect(() => {
        const userID = localStorage.getItem("userID");
        if (!userID) {
            window.location.href = "/login"
        }
        fetchData();
    }, [searchTerm]);

    const Header = () => {
        return (
            <div className="container-fluid navbar-container" >
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt="logo" id="img-logo" />
                </a>

                <form style={{ display: 'inline', margin: '10px' }}>
                    <Input.Search
                        placeholder="Tìm kiếm sản phẩm"
                        allowClear
                        enterButton="Tìm kiếm"
                        size="large"
                        value={searchTerm}
                        onChange={(event) => setSearchTerm(event.target.value)}
                        style={{ width: 500 }}
                    />
                </form>

                <div style={{ marginLeft: 'auto' }}>
                    <button id='user'><Link to='/user'><img src={user} alt="user" /></Link></button>
                    <button id="home"><Link to="/"><img src={home} alt="home" /></Link></button>
                    <button id="cart"><Link to="/cart"><img src={cart} alt="cart" /></Link></button>
                </div>
            </div>
        );
    }

    const NavBar = () => {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={`/`}
                                onClick={() => setSearchTerm(" ")}
                            >
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={`/`}
                                onClick={() => setSearchTerm("Văn")}
                            >
                                Văn
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={`/`}
                                onClick={() => setSearchTerm("Trinh thám")}
                            >
                                Trinh thám
                            </Link>
                        </li>

                        {isAdmin && <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={`/add`}
                            >
                                Thêm sản phẩm
                            </Link>
                        </li>}
                    </ul>
                </div>
            </nav>
        )
    }

    const BookDetailsModal = (props) => {
        const { _id, type, author, name, content } = props.book;

        const handleRental = async () => {
            await createBorrowBook(_id, localStorage.getItem("userID"));
        }

        const handleBorrow = () => {
            const confirmation = window.confirm(`Bạn đã mượn sách ${name}.`);

            if (confirmation) {
                console.log('Người dùng đã xác nhận.');
                handleRental();
            } else {
                console.log('Người dùng đã huỷ bỏ.');
            }
        };

        return (
            <Modal show={props.show} onHide={props.handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <img src={content} alt={name} style={{ width: '100%' }} />
                    <p>Author: {author}</p>
                    <p>Type: {type}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleBorrow}>
                        Mượn
                    </Button>
                    <Button variant="secondary" onClick={props.handleClose}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const BookCart = (props) => {
        const { _id, type, author, name, content } = props.book;

        const handleRental = async () => {
            await createBorrowBook(_id, localStorage.getItem("userID"));
        }

        const handleBorrow = () => {
            const confirmation = window.confirm(`Bạn đã mượn sách ${name}.`);

            if (confirmation) {
                console.log('Người dùng đã xác nhận.');
                handleRental();
            } else {
                console.log('Người dùng đã huỷ bỏ.');
            }
        };

        return (
            <Card style={{ width: '18rem', margin: '2px' }}>
                <Card.Img variant="top" src={`${content}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
                <Card.Body>
                    <Card.Title style={{ height: '4.5rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{type}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                    <Card.Text style={{ height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</Card.Text>
                    <Button variant="primary" style={{ margin: '2px' }} onClick={handleBorrow}>Mượn</Button>
                    <Button variant="primary" style={{ margin: '2px' }} onClick={() => props.handleShowProduct(props.book)}>Xem</Button>
                </Card.Body>
            </Card>
        );
    }

    const Content = (props) => {
        const [showProduct, setShowProduct] = useState(false);
        const [selectedBook, setSelectedBook] = useState({});
        const [books, setBooks] = useState([]);

        const fetchData = async () => {
            const data = await getBooks(searchTerm);
            setBooks(data);
        }

        useEffect(() => {
            fetchData();
        }, [searchTerm]);

        const handleShowProduct = (book) => {
            setSelectedBook(book);
            setShowProduct(true);
        }

        const handleCloseProductModal = () => {
            setShowProduct(false);
        }

        return (
            <div className="container">
                <Row gutter={[16, 16]}>
                    {books && books.map((book) => (
                        <React.Fragment key={book._id}>
                            <Col xs={24} sm={12} md={8} lg={6}>
                                <BookCart
                                    book={book}
                                    handleShowProduct={handleShowProduct}
                                />
                            </Col>
                        </React.Fragment>
                    ))}
                </Row>

                {showProduct &&
                    <BookDetailsModal
                        book={selectedBook}
                        show={showProduct}
                        handleClose={handleCloseProductModal}
                    />
                }
            </div>
        );
    };

    const Footer = () => {
        return (
            <Layout>
                <div id="footer" className="bg-dark text-white lg-light text-center text-lg-start">
                    <div className="container p-4">
                        <div className="row">
                            <div id="cus-sp-infor" className="col-lg-4 col-md-12 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Thông tin hỗ trợ khách hàng</h5>
                                <p>Nếu bạn cần hỗ trợ, vui lòng liên hệ với chúng tôi qua email hoặc số điện thoại dưới đây:</p>
                                <ul className="list-unstyled mb-0">
                                    <li>Email: support@example.com</li>
                                    <li>Điện thoại: +84 123 456 789</li>
                                </ul>
                            </div>

                            <div id="ovewview" className="col-lg-4 col-md-6 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Giới thiệu về website</h5>
                                <p>Chúng tôi cung cấp các sản phẩm và dịch vụ tốt nhất cho khách hàng của mình.</p>
                            </div>

                            <div id="infor" className="col-lg-4 col-md-12 mb-4 mb-md-0">
                                <h5 className="text-uppercase">Thông tin liên hệ</h5>
                                <ul className="list-unstyled mb-0">
                                    <li>Địa chỉ: 123 Đường ABC, Quận XYZ, TP HCM</li>
                                    <li>Email: contact@example.com</li>
                                    <li>Điện thoại: +84 987 654 321</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div id="license" className="text-center p-3">© 2023 Example.com</div>
            </Layout>
        )
    }

    console.log(localStorage.getItem("isAdmin"));
    return (
        <Layout>
            <Header />
            <NavBar />
            <Content />
            <Footer />
        </Layout>
    )
}

export default Home;