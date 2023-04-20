import React, { useState } from "react";
import axios from "axios";
import { Card, Button } from 'react-bootstrap';


function BookCart(props) {
    const {book_id, title, author, name, link } = props.book;
    const [userID, setUserID] = useState(1);

    const handleRental = async () => {
        axios.post('http://localhost:9000/update/rental', {book_id, userID})
            .then(() => console.log("Data update done!"))
            .catch((err) => console.log(err));
    }
  
    return (
      <Card style={{ width: '18rem', margin: '2px' }}>
        <Card.Img variant="top" src={`${link}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
        <Card.Body>
          <Card.Title style={{height: '4.5rem', overflow: 'hidden', textOverflow: 'ellipsis'}}>{title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
          <Card.Text style={{height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis'}}>{name}</Card.Text>
          <Button variant="primary" onClick={handleRental}>Mượn</Button>
        </Card.Body>
      </Card>
    );
}

export default BookCart;