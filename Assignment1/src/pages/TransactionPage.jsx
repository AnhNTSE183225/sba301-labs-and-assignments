import React from 'react'
import { Button, Col, Container, Row, Table } from 'react-bootstrap'

export const TransactionPage = () => {
  return (
    <Container>
      <Row>
        <Col xs={12} md={3}>
        </Col>
        <Col xs={12} md={9}>
          <div className='d-flex align-items-center justify-content-between'>
            <span className='fs-1 fw-bold'>Quản lý xuất kho</span>
            <div className='d-flex gap-3'>
              <Button variant='success' className='rounded-0'> <i className="bi bi-plus-square me-2"></i> Xuất kho</Button>
              <Button variant='success' className='rounded-0'> <i className="bi bi-box-arrow-in-right me-2"></i> Import</Button>
              <Button variant='success' className='rounded-0'> <i className="bi bi-box-arrow-right me-2"></i> Xuất file</Button>
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Table>
          <thead>
            <tr>
              <th></th>
            </tr>
          </thead>
          <tbody>

          </tbody>
        </Table>
      </Row>
    </Container>
  )
}
