import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";

import {Home, Login, Cart} from "./index";

function App() {
    return (
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/cart' element={<Cart />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    );
};

export default App;