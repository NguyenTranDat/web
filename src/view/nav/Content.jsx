import React from 'react';
import { Card, Button } from 'react-bootstrap';

function BookCard(props) {
  const { title, author, description, imageUrl } = props.book;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={imageUrl} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{description}</Card.Text>
        <Button variant="primary">Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}

function Content() {
  const books = [];

  return (
    <div className="container">
      <div className="row">
        {books.map((book) => (
          <div className="col-md-4">
            <BookCard book={book} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Content;
