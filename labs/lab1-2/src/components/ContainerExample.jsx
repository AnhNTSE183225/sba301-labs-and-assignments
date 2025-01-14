import React from 'react'
import { Alert, Col, Container, Row } from 'react-bootstrap';

export default function ContainerExample() {
    return (
        <Container fluid>
            <Row>
                <Col className='bg-primary'>1 of 1</Col>
                <Col className='bg-secondary'>1 of 1</Col>
                <Col className='bg-tertiaryy'>1 of 1</Col>
                <Col>1 of 1</Col>
                <Col>1 of 1</Col>
                <Col>
                    <Alert variant={'primary'}>
                        This is a {'primary'} alert—check it out!
                    </Alert>
                </Col>
            </Row>
            <Row>
                <Col>
                    <Alert variant={'primary'}>
                        This is a {'primary'} alert—check it out!
                    </Alert>
                </Col>
            </Row>
        </Container>
    )
}
