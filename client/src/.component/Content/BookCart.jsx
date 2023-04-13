import React from 'react';
import { Card, Button } from 'react-bootstrap';

function BookCart(props) {
  const { title, author, name, link } = props.book;

  return (
    <Card style={{ width: '18rem', margin: '2px' }}>
      <Card.Img variant="top" src={`${link}`} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{name}</Card.Text>
        <Button variant="primary">Mượn</Button>
      </Card.Body>
    </Card>
  );
}

export default BookCart;
