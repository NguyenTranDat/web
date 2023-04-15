import React from 'react';
import { Card, Button } from 'react-bootstrap';

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

export default CartItem;
