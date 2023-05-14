import { Link } from "react-router-dom";

import Logo from "../img/logo192.png";
import user from "../img/user.png";
import home from "../img/home.png";
import cart from "../img/cart.png";

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

export default Header;