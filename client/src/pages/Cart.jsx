import React, {useEffect, useState }  from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios  from 'axios';

function CartItem(props) {
    const { name, price, quantity, imageUrl } = props.item;
  
    return (
      <Card style={{ marginBottom: '1rem' }}>
        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1', marginRight: '1rem' }}>
            <img src={imageUrl} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div style={{ flex: '2', marginRight: '1rem' }}>
            <h5>{name}</h5>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{price.toLocaleString()}đ</p>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Button variant="outline-secondary" size="sm" style={{ marginRight: '1rem' }}>−</Button>
              <span style={{ fontSize: '1.2rem', fontWeight: 'bold', marginRight: '1rem' }}>{quantity}</span>
              <Button variant="outline-secondary" size="sm" style={{ marginRight: '1rem' }}>+</Button>
              <Button variant="outline-danger" size="sm">Xóa</Button>
            </div>
          </div>
        </Card.Body>
      </Card>
    );
  }

function Cart(props) {
  const items = [
    {
      id: 1,
      name: 'Áo phông nam trơn',
      price: 200000,
      quantity: 1,
      imageUrl: 'https://cdn.pixabay.com/photo/2017/08/15/15/06/white-t-shirt-2644298_1280.jpg'
    },
    {
      id: 2,
      name: 'Quần jeans nam',
      price: 500000,
      quantity: 2,
      imageUrl: 'https://cdn.pixabay.com/photo/2015/07/02/10/23/jeans-828693_1280.jpg'
    }
  ];

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