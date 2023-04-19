import React, { useState, useEffect, createContext } from 'react';
import {Link} from "react-router-dom";
import {Layout} from 'antd';
import { Input } from "antd";
import axios from 'axios';
import { Card, Button } from 'react-bootstrap';

import "./style/Home.css";

import Logo from "../img/logo192.png";
import user from "../img/user.png";
import home from "../img/home.png";
import cart from "../img/cart.png";

export const UserContext = createContext(null);

function BookCart(props) {
    const { title, author, name, link } = props.book;
  
    return (
      <Card style={{ width: '18rem', margin: '2px' }}>
        <Card.Img variant="top" src={`${link}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title style={{height: '4.5rem', overflow: 'hidden', textOverflow: 'ellipsis'}}>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
          <Card.Text style={{height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis'}}>{name}</Card.Text>
          <Button variant="primary">Mượn</Button>
        </Card.Body>
      </Card>
    );
}

function Home() {
    const [ searchTerm, setSearchTerm ] = useState(' ');
    const [searchResults, setSearchResults] = useState([]);
    const [userID, setUserID] = useState(null);

    async function handleSearch(event) {
        event.preventDefault();
        const response = await axios.get(`/search?term=${searchTerm}`);
        setSearchResults(response.data);
    }

    useEffect(() => {
        async function getUserID() {
            const response = await axios.get(`http://localhost:9000/api/user`);
            setUserID((response.data).map.customer_id);
        }
        getUserID();
    }, []);
    //console.log(userID);

    useEffect(()=>{
        const getTodos = async () =>{
          try {
            const res = await axios.get(`http://localhost:9000/search?term=${searchTerm}`)
            setSearchResults(res.data);
          } catch (error) {
            console.log(error);
          }
        }

        getTodos();
        
    });

    return (
        <Layout>
            {/* 
            ***********************
            * Header
            ***********************
            */}
            <div className="container-fluid navbar-container" >
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt="logo" id="img-logo"/>
                </a>

                <form onSubmit={handleSearch} style={{ display: 'inline', margin: '10px' }}>
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
                    <button id='user'><Link to='/login'><img src={user} alt = "user" /></Link></button>
                    <button id="home"><Link to="/"><img src={home} alt = "home" /></Link></button>
                    <button id="cart"><Link to="/cart"><img src={cart} alt = "cart" /></Link></button>
                </div>
            </div>

            {/* 
            ***********************
            * NavBar
            ***********************
            */}

            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item"> <Link className="nav-link" onClick={() => setSearchTerm(' ')} to={`/`}>Trang chủ</Link></li>
                        <li className="nav-item"> <Link className="nav-link" onClick={() => setSearchTerm('Văn')} to={`/`}>Văn</Link></li>
                        <li className="nav-item"><Link className="nav-link" onClick={() => setSearchTerm('Trinh thám')} to={`/`}>Trinh thám</Link></li>
                    </ul>
                </div>
            </nav>

            {/* 
            ***********************
            * Content
            ***********************
            */}

            <div className="container">
                <div className="row">
                    {searchResults.map((book) => (
                    <div className="col-md-4">
                        <BookCart book={book} />
                    </div>
                    ))}
                </div>
            </div>

            {/* 
            ***********************
            * Footer
            ***********************
            */}

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
        
    );
}

export default Home;