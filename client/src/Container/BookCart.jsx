import { Card, Button } from "react-bootstrap";

import { createBorrowBook } from "../API/createBorrowBook";

const BookCart = (props) => {
    const { _id, type, author, name, content } = props.book;

    const handleRental = async () => {
        await createBorrowBook(_id, localStorage.getItem("userID"));
    }

    const handleBorrow = () => {
        const confirmation = window.confirm(`Bạn đã mượn sách ${name}.`);

        if (confirmation) {
            console.log('Người dùng đã xác nhận.');
            handleRental();
        } else {
            console.log('Người dùng đã huỷ bỏ.');
        }
    };

    return (
        <Card style={{ width: '18rem', margin: '2px' }}>
            <Card.Img variant="top" src={`${content}`} style={{ width: '150px', height: '150px', objectFit: 'cover' }} />
            <Card.Body>
                <Card.Title style={{ height: '4.5rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{type}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted">{author}</Card.Subtitle>
                <Card.Text style={{ height: '3rem', overflow: 'hidden', textOverflow: 'ellipsis' }}>{name}</Card.Text>
                <Button variant="primary" style={{ margin: '2px' }} onClick={handleBorrow}>Mượn</Button>
                <Button variant="primary" style={{ margin: '2px' }} onClick={() => props.handleShowProduct(props.book)}>Xem</Button>
            </Card.Body>
        </Card>
    );
}

export default BookCart;