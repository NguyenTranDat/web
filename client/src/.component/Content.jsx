import React, {useEffect, useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import axios  from 'axios';

function BookCard(props) {
  const { title, author, name, link } = props.book;

  return (
    <Card style={{ width: '18rem', margin: '2px' }}>
      <Card.Img variant="top" src={link} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
        <Card.Text>{name}</Card.Text>
        <Button variant="primary">Mượn</Button>
      </Card.Body>
    </Card>
  );
}

function Content() {


  const [books, setBookState] = useState([])

  useEffect(()=>{
    const getTodos = async () =>{
      try {
        const res = await axios.get('http://localhost:9000/')
        console.log(res.data);
        setBookState(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();
  })

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
