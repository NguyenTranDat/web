import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';

import { createGiveBook } from '../API/createGiveBook';
import urlPDF from "./testpdf.pdf";

function CartItem(props) {
    const { _id, name, content } = props.item;
    const [showView, setShowView] = useState(false);

    if (showView) {
        return (
          <iframe src={urlPDF} width="100%" height="700px" />
        );
    }

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

export default CartItem;
