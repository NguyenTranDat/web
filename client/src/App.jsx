import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import Home from './Home';
import Login from './Login';
import Register from './Login/Register';
import UserInfo from './User';
import Cart from './Cart';
import Addproduct from './Home/AddProduct';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/user" element={<UserInfo />} />
      <Route path="/login" element={<Login />} />
      <Route path="/add" element={<Addproduct />} />
      <Route path="/register" element={<Register />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;