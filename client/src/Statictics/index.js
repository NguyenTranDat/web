import { useEffect, useState } from "react";
import Header from "../Container/Header";
import { Card, Container, Row, Col } from "react-bootstrap";
import axios from "axios";

function Static(props) {
    const [items, setItems] = useState([]);

    useEffect(() => {
        const getBooks = async () => {
            try {
                const res = await axios.post('http://localhost:9000/static', { limit: 10 });
                setItems(res.data.books);
            } catch (error) {
                console.log(error);
            }
        };
        getBooks();
    }, []);

    const StaticItem = (props) => {
        const { _id, type, name, content } = props.item;
        const { index } = props;
    
        let rankLabel = '';
        if (index === 0) {
            rankLabel = <span style={{color: '#FFD700', fontSize: '70px'}}>Top 1</span>;
        } else if (index === 1) {
            rankLabel = <span style={{color: '#D3D3D3', fontSize: '50px'}}>Top 2</span>;
        } else if (index === 2) {
            rankLabel = <span style={{color: '#CDAF95', fontSize: '30px'}}>Top 3</span>;
        } else {
            rankLabel = <span>{`Top ${index + 1}`}</span>;
        }
    
        return (
            <>
                <Card style={{ marginBottom: '1rem' }}>
                    <Card.Body style={{ display: 'flex', alignItems: 'center' }}>
                        <div style={{ flex: '0.75', marginRight: '1rem', fontWeight: 'bold' }}>
                            {rankLabel}
                        </div>
                        <div style={{ flex: '1', marginRight: '1rem' }}>
                            <img src={content} alt={name} style={{ maxWidth: '100%', height: 'auto' }} />
                        </div>
                        <div style={{ flex: '2', marginRight: '1rem' }}>
                            <h5>{name}</h5>
                            <div style={{ display: 'flex', alignItems: 'center', margin: 2 }}>{type}</div>
                        </div>
                    </Card.Body>
                </Card>
            </>
        )
    };
    
    return (
        <>
            <Container>
                <Header />
                <Row>
                    <Col>
                        <Card>
                            <Card.Header>
                                <h3>Top 10 sách mượn nhiều nhất.</h3>
                            </Card.Header>
                            <Card.Body>
                                {items && items.map((item, index) => <StaticItem item={item} index={index} key={item._id} />)}
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    )
}

export default Static;