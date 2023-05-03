import React, { useState, useEffect } from 'react';
import { Card, ListGroup, ListGroupItem, Badge } from 'react-bootstrap';
import axios from "axios";

import { getSearchResults, getUserID } from "./consequence";

function UserProfile() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function getUser() {
      const res = await axios.get('http://localhost:9000/api/getUser');
      const data = res.data;
      setUser(data[0]);
    }
    getUser();
  }, [user]);
  //console.log(user);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <Card>
      <Card.Header>
        <h5>{user.name}</h5>
        <p>{user.age}</p> 
      </Card.Header>
      <Card.Body>
        <ListGroup variant="flush">
          <ListGroupItem>
            <h6>Số điện thoại:</h6>
            <p>{user.phone}</p> 
          </ListGroupItem>
          <ListGroupItem>
            <h6>Địa chỉ:</h6>
            <p>{user.address}</p> 
          </ListGroupItem>
        </ListGroup>
      </Card.Body>
    </Card>
  );
}

export default UserProfile;