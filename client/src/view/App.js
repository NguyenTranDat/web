import React from 'react';
import {Routes, Route, Navigate} from "react-router-dom";

import {HomePage, Login} from "./index"

function App() {
    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/van' element={<HomePage />} />
        <Route path='/trinhtham' element={<HomePage />} />

        <Route path='/login' element={<Login />} />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes>
    );
};

export default App;

