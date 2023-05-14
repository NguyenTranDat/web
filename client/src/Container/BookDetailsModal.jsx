import { Modal,Button } from "react-bootstrap";

import { createBorrowBook } from "../API/createBorrowBook";

const BookDetailsModal = (props) => {
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
        <Modal show={props.show} onHide={props.handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>{name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <img src={content} alt={name} style={{ width: '100%' }} />
                <p>Author: {author}</p>
                <p>Type: {type}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleBorrow}>
                    Mượn
                </Button>
                <Button variant="secondary" onClick={props.handleClose}>
                    Đóng
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default BookDetailsModal;