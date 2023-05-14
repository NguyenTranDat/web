import React, { useState, useEffect } from "react";
import { Row, Col } from "antd";

import { getBooks } from "../API/getBook";
import BookCart from "./BookCart";
import BookDetailsModal from "./BookDetailsModal";

function Content(props) {
  const [showProduct, setShowProduct] = useState(false);
  const [selectedBook, setSelectedBook] = useState({});
  const [books, setBooks] = useState([]);
  const { searchTerm } = props;

  const fetchData = async () => {
    const data = await getBooks(searchTerm);
    setBooks(data);
  };

  useEffect(() => {
    fetchData();
  }, [searchTerm]);

  const handleShowProduct = (book) => {
    setSelectedBook(book);
    setShowProduct(true);
  };

  const handleCloseProductModal = () => {
    setShowProduct(false);
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
