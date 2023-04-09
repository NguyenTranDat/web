import React from 'react';
import './style/Header.css';
import {Link} from "react-router-dom";

class Header extends React.Component {

    render() {
        return (
            <div className="container-fluid">
                <a className="navbar-brand" href="/">
                    <img src="fig/logo192.png" alt="logo" id="img-logo"/>
                </a>
    
                <div id='search'>
                    <input type="text" placeholder='Search' />
                    <button id="go" onClick={this.handlSearch}><img src="fig/search.png" alt = "user" /></button> 
                </div>
                
                <button id='user'><Link to='/login'><img src="fig/user.png" alt = "user" /></Link></button>
                <button id="home"><Link to="/"><img src="fig/home.png" alt = "home" /></Link></button>
                <button id="cart"><Link to="/cart"><img src="fig/cart.png" alt = "cart" /></Link></button>
            </div>
        )
    }
}

export default Header;