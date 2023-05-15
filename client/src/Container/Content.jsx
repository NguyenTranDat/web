import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import { getBooks } from "../API/getBook";
import BookCart from "./BookCart";
import BookDetailsModal from "./BookDetailsModal";

function Content(props) {
  const [showProduct, setShowProduct] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [books, setBooks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const { searchTerm } = props;

  const fetchData = async () => {
    setLoading(true);
    const data = await getBooks(searchTerm, currentPage);
    setBooks((prevBooks) => [...prevBooks, ...data]);
    setLoading(false);
  };

  useEffect(() => {
    setBooks([]);
    fetchData();
  }, [searchTerm]);

  useEffect(() => {
    fetchData();
  }, [currentPage]);

  const handleShowProduct = (book) => {
    setSelectedBook(book);
    setShowProduct(true);
  };

  const handleCloseProductModal = () => {
    setShowProduct(false);
  };

  const handleLoadMore = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  return (
    <div className="container">
      <Row gutter={[16, 16]}>
        {books &&
          books.map((book) => (
            <React.Fragment key={book._id}>
              <Col xs={24} sm={12} md={8} lg={6}>
                <BookCart book={book} handleShowProduct={handleShowProduct} />
              </Col>
            </React.Fragment>
          ))}
      </Row>

      {loading && <p>Loading...</p>}

      {!loading && books.length > 0 && (
        <div className="load-more-container">
          <button className="load-more-button" onClick={handleLoadMore}>
            Load More
          </button>
        </div>
      )}

      {showProduct && (
        <BookDetailsModal
          book={selectedBook}
          show={showProduct}
          handleClose={handleCloseProductModal}
        />
      )}
    </div>
  );
}

export default Content;