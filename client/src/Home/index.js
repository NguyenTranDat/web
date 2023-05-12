import { Component, useEffect } from "react";
import { Link } from "react-router-dom";
import { Layout, Input, Row, Col } from "antd";
import { Card, Button } from 'react-bootstrap';
import axios from "axios";

import "./Header.css"
import { getBooks } from "../API/getBook";

import Logo from "../img/logo192.png";
import user from "../img/user.png";
import home from "../img/home.png";
import cart from "../img/cart.png";

class Home extends Component {
    constructor(props) {
        super(props);
        this.state ={
            searchTerm: " ",
            books: []
        }
    }

    componentDidMount() {
        const userID = localStorage.getItem("userID");
        if (!userID) {
          window.location.href = "/login"
        }
    }

    setSearchTerm(value) {
        this.setState({searchTerm: value});
    }

    Header = () => {
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
                        value={this.state.searchTerm}
                        onChange={(event) => this.setSearchTerm(event.target.value)}
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

    NavBar = () => {
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
                                onClick={() => this.setSearchTerm(" ")}
                            >
                                Trang chủ
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={`/`}
                                onClick={() => this.setSearchTerm("Văn")}
                            >
                                Văn
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={`/`}
                                onClick={() => this.setSearchTerm("Trinh thám")}
                            >
                                Trinh thám
                            </Link>
                        </li>

                        {false && <li className="nav-item">
                            <Link
                                className="nav-link"
                                to={`/add`}
                            >
                                Thêm sản phẩm.
                            </Link>
                        </li>}
                    </ul>
                </div>
            </nav>
        )
    }

    BookCart(props) {
        const {_id, type, author, name, content } = props.book;

        const handleRental = async () => {
            axios.post('http://localhost:9000/update/rental', { _id, userID:localStorage.getItem("userID")})
                .then(() => console.log("Data update done!"))
                .catch((err) => console.log(err));
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
              <Card.Title style={{height: '4.5rem', overflow: 'hidden', textOverflow: 'ellipsis'}}>{type}</Card.Title>
              <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
              <Card.Text style={{height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis'}}>{name}</Card.Text>
              <Button variant="primary" style={{  margin: '2px' }} onClick={handleBorrow}>Mượn</Button>
              <Button variant="primary" style={{ margin: '2px' }}>Xem</Button>
            </Card.Body>
          </Card>
        );
    }

    
    Content = (props) => {
        const fetchData = async () => {
            const data = await getBooks(this.state.searchTerm); 
            this.setState({ books: data });
        }

        useEffect(() => {
            fetchData();
        }, [this.state.searchTerm]);

        return (
            <div className="container">
                <Row gutter={[16, 16]}>
                    {this.state.books && this.state.books.map((book) => (
                        <Col xs={24} sm={12} md={8} lg={6}>
                            <this.BookCart book={book} />
                        </Col>
                    ))}
                </Row>
            </div>
        );
    }

    render() {
        return (
            <Layout>
                <this.Header />
                <this.NavBar />
                <this.Content />
            </Layout>
        )
    }
}

export default Home;