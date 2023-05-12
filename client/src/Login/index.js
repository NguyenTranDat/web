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
    try {
      const customerId = await login(username, password);
      localStorage.setItem("userID", customerId.userId);
      window.location.href = "/";
    } catch (error) {
      setError("Sai tên đăng nhập hoặc mật khẩu. Vui lòng thử lại.");
    }
  };

  return (
    <form className="login-form" onSubmit={handleSubmit}>
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
      {error && <p className="error">{error}</p>}
      <button type="submit" className="login-button">
        Đăng nhập
      </button>
      <p>
        Bạn chưa có tài khoản? <Link to="/register">Đăng ký.</Link>
      </p>
    </form>
  );
}

export default Login;
