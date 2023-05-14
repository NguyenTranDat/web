import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { Layout } from 'antd';

import Header from '../Container/Header';

import { getBookRental } from '../API/getBookRental';
import { createGiveBook } from '../API/createGiveBook';

import urlPDF from "./testpdf.pdf";

function Cart(props) {
    const [items, setItems] = useState([]);
    const [showView, setShowView] = useState(false);

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

    

    if (showView) {
        return (
            <>
                <Container>
                  <Header />
                  <iframe src={urlPDF} width="100%" height="900px" />
                </Container>
            </>
        );
    }

    const CartItem = (props) => {
        const { _id, name, content } = props.item;
        const handleRental = async () => {
            await createGiveBook(_id, localStorage.getItem("userID"));
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
                            <Button variant="outline-danger" size="sm" style={{ display: 'flex', alignItems: 'center', margin: 2 }} onClick={() => setShowView(true)}>Xem</Button>
                            <Button variant="outline-danger" size="sm" style={{ display: 'flex', alignItems: 'center', margin: 2 }} onClick={handleBorrow}>Trả lại</Button>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', margin: 2 }}></div>
                    </div>
                </Card.Body>
            </Card>
        );
    }

    return (
        <Layout>
            <Container>
                <Header />
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h3>Sách đang mượn</h3>
                            </Card.Header>
                            <Card.Body>
                                {items && items.map(item => <CartItem key={item.id} item={item} userID={localStorage.getItem("userID")} />)}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Layout>
    );
}

export default Cart;
