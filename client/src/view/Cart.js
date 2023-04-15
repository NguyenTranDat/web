import React, {useEffect, useState }  from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios  from 'axios';

import { CartItem } from '../.component/index';

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
