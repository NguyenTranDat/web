import React, {useEffect, useState }  from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import axios  from 'axios';
import { Layout } from 'antd';

import { NavBar } from './consequence';

function BookItem(props) {
    const { name, link } = props.item;
  
    return (
      <Card style={{ marginBottom: '1rem' }}>
        <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
          <div style={{ flex: '1', marginRight: '1rem' }}>
            <img src={link} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
          </div>
          <div style={{ flex: '2', marginRight: '1rem' }}>
            <h5>{name}</h5>
          </div>
        </Card.Body>
      </Card>
    );
  }

function Booked({ userID, searchTerm, setSearchTerm }) {
  const [items, setItems] = useState([]);

  useEffect(()=>{
    const getTodos = async () =>{
      try {
        const res = await axios.get(`http://localhost:9000/booked?term=${userID}`)
        setItems(res.data);
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();
    
});

  return (
    <Layout>
      <Card>
            <Card.Header>
              <h3>Sách đã trả</h3>
            </Card.Header>
            <Card.Body>
              {items.map(item => <BookItem key={item.id} item={item}/>)}
            </Card.Body>
            </Card>
    </Layout>
    
  );
}

export default Booked;