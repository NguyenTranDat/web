import React from 'react';
import {Link} from "react-router-dom";

import Logo from "../img/logo192.png";
import user from "../img/user.png";
import home from "../img/home.png";
import cart from "../img/cart.png";
import search from "../img/search.png";
import './.style/Header.css';

class Header extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src={Logo} alt="logo" id="img-logo"/>
                </a>
    
                <div id='search'>
                    <input type="text" placeholder='Search' />
                    <button id="go" onClick={this.handlSearch}><img src={search} alt = "user" /></button> 
                </div>
                
                <button id='user'><Link to='/login'><img src={user} alt = "user" /></Link></button>
                <button id="home"><Link to="/"><img src={home} alt = "home" /></Link></button>
                <button id="cart"><Link to="/cart"><img src={cart} alt = "cart" /></Link></button>
            </div>
        )
    }
}

export default Header;