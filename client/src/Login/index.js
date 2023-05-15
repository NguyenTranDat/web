import { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "../API/login";
import "./Login.css";

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if(username == "" && password == "") {
            setError("Vui lòng nhập email và mật khẩu.")
            return;
        }
        if(username == "") {
            setError("Vui lòng nhập email.")
            return;
        }
        if(password == "") {
            setError("Vui lòng nhập mật khẩu.")
            return;
        }
        try {
            const customerId = await login(username, password);
            if(customerId == false) {
                setError("Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.");
            }
            localStorage.setItem("userID", customerId.userId);
        } catch (error) {
            setError("Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.");
        }
    };

    return (
        <>
            
            <form className="login-form" onSubmit={handleSubmit}>
                <h3 className="text-center">Đăng nhập</h3>
                <label>
                    <p>Email:</p>
                    <input
                    type="text"
                    className="login-input"
                    value={username}
                    onChange={(event) => setUsername(event.target.value)}
                    />
                </label>
                <label>
                    <p>Mật khẩu:</p>
                    <input
                    type="password"
                    className="login-input"
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                    />
                </label>
                {error && <p className="error" style={{color: 'red'}}>{error}</p>}
                <button type="submit" className="login-button">Đăng nhập</button>
                <p>Bạn chưa có tài khoản? <Link to="/register">Đăng ký.</Link></p>
            </form>
        </>
        
    );
}

export default Login;
