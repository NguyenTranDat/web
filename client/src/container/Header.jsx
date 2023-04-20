import React from 'react';
import {Link} from "react-router-dom";
import { Input } from "antd";

import "./style/Header.css";

import Logo from "../img/logo192.png";
import user from "../img/user.png";
import home from "../img/home.png";
import cart from "../img/cart.png";

function Header({ searchTerm, setSearchTerm }) {
  return (
    <div className="container-fluid navbar-container" >
        <a className="navbar-brand" href="/">
            <img src={Logo} alt="logo" id="img-logo"/>
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
            <button id='user'><Link to='/login'><img src={user} alt = "user" /></Link></button>
            <button id="home"><Link to="/"><img src={home} alt = "home" /></Link></button>
            <button id="cart"><Link to="/cart"><img src={cart} alt = "cart" /></Link></button>
        </div>
    </div>
  );
}

export default Header;