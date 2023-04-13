import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';

function Cart() {
  const [purchasedProducts, setPurchasedProducts] = useState([]);
  const [books, setBookState] = useState([])

  useEffect(()=>{
    const getTodos = async () =>{
      try {
        const res = await axios.get('http://localhost:9000/')
        //console.log(res.data);
        setBookState(res.data)
      } catch (error) {
        console.log(error);
      }
    }

    getTodos();
  });

  const removeProduct = (id) => {
    // Xóa sản phẩm đã mua khỏi danh sách
    const updatedProducts = books.filter(product => product.id !== id);
    setPurchasedProducts(updatedProducts);
    localStorage.setItem('books', JSON.stringify(updatedProducts));
  }

  return (
    <div className="container">
      <h1>Danh sách sản phẩm đã mua</h1>
      <div className="row">
        {books.map(product => (
          <div className="col-md-4" key={product.id}>
            <Card style={{ width: '18rem', margin: '2px' }}>
              <Card.Img variant="top" src={product.image} />
              <Card.Body>
                <Card.Title>{product.name}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{product.author}</Card.Subtitle>
                <Card.Text>{product.description}</Card.Text>
                <Button variant="primary" onClick={() => removeProduct(product.id)}>Xóa</Button>
              </Card.Body>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MyPurchasedProducts;
