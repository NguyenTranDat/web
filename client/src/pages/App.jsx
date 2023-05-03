import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';

import { Home, Login, Cart } from './index';
import User from './User';
import { getSearchResults, getUserID } from "./consequence";

function App() {
  const [userID, setUserID] = useState('');
  const [searchTerm, setSearchTerm] = useState(' ');
  const [searchResults, setSearchResults] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const res = await getSearchResults(searchTerm, userID);
      setSearchResults(res);
    }

    getTodos();

  }, [searchTerm]);

  return (
    <Routes>
      <Route path="/" element={<Home 
                                  userID={userID} 
                                  setUserID={setUserID}
                                  searchResults={searchResults}
                                  setSearchResults={setSearchResults}
                                  searchTerm={searchTerm}
                                  setSearchTerm={setSearchTerm}
                                  />} />
      <Route
        path="/login"
        element={<Login userID={userID} setUserID={setUserID} />}
      />
      <Route path="/cart" element={<Cart 
                                      userID={userID}
                                      searchTerm={searchTerm}
                                      setSearchTerm={setSearchTerm}
                                      />} />
      <Route path="/user" element={<User 
                                      userID={userID} 
                                      setUserID={setUserID}
                                      searchResults={searchResults}
                                      setSearchResults={setSearchResults}
                                      searchTerm={searchTerm}
                                      setSearchTerm={setSearchTerm}
                                      />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
