import React from 'react';
import './style/Header.css';

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
                
                <button id="user"><a href="/login"><img src="fig/user.png" alt = "user" /></a></button> 
                <button id="home"><a href="/home"><img src="fig/home.png" alt = "home" /></a></button>
                <button id="cart"><a href="/cart"><img src="fig/cart.png" alt = "cart" /></a></button>
            </div>
        )
    }
}

export default Header;