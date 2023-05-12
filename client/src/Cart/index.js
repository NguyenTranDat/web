import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios from 'axios';
import { Layout } from 'antd';

import { getBookRental } from '../API/getBookRental';

function CartItem(props) {
  const { _id, name, content, type } = props.item;

  const handleRental = async () => {
    axios.post('http://localhost:9000/update/return', { _id, userID:localStorage.getItem("userID")})
        .then(() => console.log("Data update done!"))
        .catch((err) => console.log(err));
}

const handleBorrow = () => {
    const confirmation = window.confirm(`Bạn muốn trả sách ${name}?`);

    if (confirmation) {
        console.log('Người dùng đã xác nhận.');
        handleRental();
    } else {
        console.log('Người dùng đã huỷ bỏ.');
    }
};

  return (
    <Card style={{ marginBottom: '1rem' }}>
      <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
        <div style={{ flex: '1', marginRight: '1rem' }}>
          <img src={content} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
        </div>
        <div style={{ flex: '2', marginRight: '1rem' }}>
          <h5>{name}</h5>
          <div style={{ display: 'flex', alignItems: 'center', margin: 2 }}>
            <Button variant="outline-danger" size="sm" style={{ display: 'flex', alignItems: 'center', margin: 2 }} >Xem</Button>
            <Button variant="outline-danger" size="sm" style={{ display: 'flex', alignItems: 'center', margin: 2 }}  onClick={handleBorrow}>Trả lại</Button>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', margin: 2 }}>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
}

function Cart(props) {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const getTodos = async () => {
      try {
        const res = await getBookRental(localStorage.getItem("userID"));
        setItems(res);
      } catch (error) {
        console.log(error);
      }
    }
    getTodos();
  }, []);

  return (
    <Layout>
      <Container>
        <Row>
          <Col>
            <Card>
              <Card.Header>
                <h3>Sách đang mượn</h3>
              </Card.Header>
              <Card.Body>
                {items.map(item => <CartItem key={item.id} item={item} userID={localStorage.getItem("userID")} />)}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </Layout>

  );
}

export default Cart;