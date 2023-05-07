import React, {useEffect, useState }  from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios  from 'axios';
import { Layout } from 'antd';
import { Document, Page } from 'react-pdf';

import { NavBar } from './consequence';
import urlPDF from "./testpdf.pdf";

function CartItem(props) {
    const { book_id, name, link, soluong, customer_id } = props.item;
    const [showView, setShowView] = useState(false);


    if (showView) {
      return (
        <iframe src={urlPDF} width="100%" height="500px" />
      );
    }

    const handleReturn = async () => {
      axios.post('http://localhost:9000/update/return', {book_id, customer_id})
          .then(() => console.log("Data update done!"))
          .catch((err) => console.log(err));
    }
  
    return (
      <Card style={{ marginBottom: '1rem' }}>
        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1', marginRight: '1rem' }}>
            <img src={link} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div style={{ flex: '2', marginRight: '1rem' }}>
            <h5>{name}</h5>
            <div style={{ display: 'flex', alignItems: 'center', margin: 2 }}>
              <Button variant="outline-danger" size="sm" style={{ display: 'flex', alignItems: 'center', margin: 2 }} onClick={() => setShowView(true)}>Xem</Button>
              <Button variant="outline-danger" size="sm" style={{ display: 'flex', alignItems: 'center', margin: 2 }} onClick={handleReturn}>Trả lại</Button>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', margin: 2 }}>
              <p>Số lượng: {soluong}</p>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

function Cart({ userID, searchTerm, setSearchTerm }) {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const getTodos = async () =>{
      try {
        const res = await axios.get(`http://localhost:9000/cart?term=${userID}`)
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();
    
});

  return (
    <Layout>
      <NavBar setSearchTerm={setSearchTerm} />
      <Container>
        <Row>
          <Col>
            <Card>
            <Card.Header>
              <h3>Sách đang mượn</h3>
            </Card.Header>
            <Card.Body>
              {items.map(item => <CartItem key={item.id} item={item} userID={userID}/>)}
            </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
    
  );
}

export default Cart;