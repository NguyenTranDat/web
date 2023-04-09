import React from 'react';
import {Routes, Route} from "react-router-dom";
import Login from "./Login"
import HomePage from "./HomePage"

function App() {
    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    );
  };

  export default (App);

