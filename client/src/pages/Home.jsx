import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import { Footer, Header, NavBar } from "./consequence";
import { sliceResults, Content } from "./consequence";
import { PaginationComponent, PageContext } from "./consequence";
import { getSearchResults, getUserID } from "./consequence";

function Home() {
  const [searchTerm, setSearchTerm] = useState(' ');
  const [searchResults, setSearchResults] = useState([]);
  const [userID, setUserID] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    async function fetchData() {
      const res = await getUserID();
      setUserID(res);
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function getTodos() {
      const res = await getSearchResults(searchTerm);
      setSearchResults(res);
    }

    getTodos();

  }, [searchTerm]);

  const itemsPerPage = 12;
  const slicedResults = sliceResults(searchResults, currentPage, itemsPerPage);

  return (
    <PageContext.Provider value={{ currentPage, setCurrentPage, itemsPerPage, searchResults }}>
      <Layout>
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <NavBar setSearchTerm={setSearchTerm} />
        <Content slicedResults={slicedResults} />
        <div className="d-flex justify-content-center mt-4">
          <PaginationComponent />
        </div>
        <Footer />
      </Layout>
    </PageContext.Provider>
  );
}

export default Home;
