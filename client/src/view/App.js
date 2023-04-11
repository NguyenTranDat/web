import React from 'react';
import {Routes, Route} from "react-router-dom";

import {HomePage, Login} from "./index"

function App() {
    return (
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    );
  };

  export default (App);

