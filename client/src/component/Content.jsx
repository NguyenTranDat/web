import React from 'react';
import { Row, Col } from 'antd';
import { BookCart } from './index';

function Content({ slicedResults, userID }) {
  return (
    <div className="container">
      <Row gutter={[16, 16]}>
        {slicedResults.map((book) => (
          <Col xs={24} sm={12} md={8} lg={6}>
            <BookCart book={book} userID={userID} />
          </Col>
        ))}
      </Row>
    </div>
  );
}

export default Content;
