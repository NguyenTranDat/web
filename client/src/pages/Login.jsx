import { useState } from 'react';
import axios from 'axios';

import "./style/Login.css";

function Login({userID, setUserID}) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:9000/api/login', { username, password });
      // localStorage.setItem('token', response.data.token);
      setUserID(response.data.customer_id);
      console.log(1);
      // Chuyển hướng đến trang chủ
      window.location.href = '/';
    } catch (error) {
      console.log(error);
    }
  };

  if(userID !== undefined && userID != 0) {
    window.location.href = '/user';
  }

  return (
    <form className="login-form" onSubmit={handleSubmit}>
        <label>
            <p>Email:</p>
            <input type="text" className="login-input" value={username} onChange={(event) => setUsername(event.target.value)} />
        </label>
        <label>
            <p>Mật khẩu:</p>
            <input type="password" className="login-input" value={password} onChange={(event) => setPassword(event.target.value)} />
        </label>
        <button type="submit" className="login-button">Đăng nhập</button>
    </form>
  );
}

export default Login;
