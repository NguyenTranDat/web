import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';

import { Footer, Header, NavBar } from "./consequence";
import { sliceResults, Content } from "./consequence";
import { PaginationComponent, PageContext } from "./consequence";
import { getSearchResults, getUserID } from "./consequence";
import Login from './Login';

function Home({userID, setUserID, searchTerm, setSearchTerm, searchResults, setSearchResults}) {

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function getTodos() {
      const res = await getSearchResults(searchTerm, userID);
      setSearchResults(res);
    }

    getTodos();

  }, [searchTerm]);

  useEffect(() => {
    async function fetchData() {
      const res = await getUserID();
      setUserID(res);
    }

    fetchData();
  }, []);

  if(userID == undefined) {
    return <Login userID={userID} setUserID={setUserID} />;
  }

  const itemsPerPage = 12;
  const slicedResults = sliceResults(searchResults, currentPage, itemsPerPage);

  if (slicedResults.length == 0) {
    return <div>loadding</div>
  }

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, itemsPerPage, searchResults }}>
      <Layout>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <NavBar setSearchTerm={setSearchTerm} />
        <Content slicedResults={slicedResults} />
        <PaginationComponent />
        <Footer />
      </Layout>
    </PageContext.Provider>
  );
}

export default Home;
