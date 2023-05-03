import React, {useEffect, useState }  from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios  from 'axios';
import { Layout } from 'antd';

import { NavBar } from './consequence';

function CartItem(props) {
    const { book_id, name, link, soluong, customer_id } = props.item;

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
            {/* <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{price.toLocaleString()}đ</p> */}
            <div style={{ display: 'flex', alignItems: 'center', margin: 2 }}>
              <Button variant="outline-danger" size="sm" style={{ display: 'flex', alignItems: 'center', margin: 2 }}>Xem</Button>
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
            <Card.Footer>
              <Button variant="primary">Trả lại hết</Button>
            </Card.Footer>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>
    
  );
}

export default Cart;