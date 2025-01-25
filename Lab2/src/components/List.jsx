import React, { Component } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { OrchidsData } from '../shared/ListOfOrchids';

export default class List extends Component {

    render() {

        const data = [1, 2, 3, 4, 5, 6, 7];

        return (
            <>
                <Container>
                    <Row>
                        {
                            OrchidsData.map((item, index) => (
                                <Col className='mb-3' md={3} index={index}>
                                    <Card>
                                        <Card.Img variant="top" src={((index % 7) + 1) + '.jpg'} />
                                        <Card.Body>
                                            <Card.Title>
                                                {item.orchidName}
                                            </Card.Title>
                                            <Card.Text>
                                                {item.category}
                                            </Card.Text>
                                            <Button variant='primary'>
                                                Detail
                                            </Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))
                        }
                    </Row>
                </Container>
            </>
        )
    }
}
