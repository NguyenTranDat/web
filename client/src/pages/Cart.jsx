import React, {useEffect, useState }  from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios  from 'axios';

function CartItem(props) {
    const { name, link } = props.item;
  
    return (
      <Card style={{ marginBottom: '1rem' }}>
        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1', marginRight: '1rem' }}>
            <img src={link} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div style={{ flex: '2', marginRight: '1rem' }}>
            <h5>{name}</h5>
            {/* <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{price.toLocaleString()}đ</p> */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="outline-secondary" size="sm" style={{ marginRight: '1rem' }}>−</Button>
              {/* <span style={{ fontSize: '1.2rem', fontWeight: 'bold', marginRight: '1rem' }}>{quantity}</span> */}
              <Button variant="outline-secondary" size="sm" style={{ marginRight: '1rem' }}>+</Button>
              <Button variant="outline-danger" size="sm">Trả lại</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

function Cart(props) {
  const [items, setItems] = useState([]);
  const [useID, setUserID] = useState(1);

  useEffect(()=>{
    const getTodos = async () =>{
      try {
        const res = await axios.get(`http://localhost:9000/cart?term=${useID}`)
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();
    
});

  return (
    <Container>
      <Row>
        <Col>
          <Card>
          <Card.Header>
            <h3>Giỏ hàng của bạn</h3>
          </Card.Header>
          <Card.Body>
            {items.map(item => <CartItem key={item.id} item={item} />)}
          </Card.Body>
          <Card.Footer>
            <Button variant="primary">Thanh toán</Button>
          </Card.Footer>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Cart;