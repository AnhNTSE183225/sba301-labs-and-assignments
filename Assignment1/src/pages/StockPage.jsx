import React, { useState } from 'react'
import { Button, Col, Container, Dropdown, Form, FormCheck, Pagination, Row, Table } from 'react-bootstrap'
import { batches } from '../data/batches'
import styles from './stockPage.module.css';
import dayjs from 'dayjs';
export const StockPage = () => {

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(batches.length / itemsPerPage);
    const currentItems = batches.slice((currentPage * itemsPerPage) - itemsPerPage, currentPage * itemsPerPage);

    const [selected, setSelected] = useState([]);

    const handleSelectAll = (selected) => {
        if (selected) {
            const newSelected = currentItems.map((batch) => batch.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    }

    return (
        <Container className={`p-2 ${styles.stockPage}`} fluid>
            <Row>
                <Col xs={12} md={3}>
                    <Container className='bg-secondary p-2'>
                        <Form.Group controlId="searchStock">
                            <Form.Label>Search Stocks</Form.Label>
                            <Form.Control type="text" placeholder="Enter stock symbol or name" />
                        </Form.Group>
                        <Form.Group controlId="filterOptions" className="mt-3">
                            <Form.Label>Filter Options</Form.Label>
                            <Form.Select>
                                <option>All</option>
                                <option value="tech">Technology</option>
                                <option value="finance">Finance</option>
                                <option value="energy">Energy</option>
                            </Form.Select>
                        </Form.Group>
                        <Button variant="danger" className="mt-3">Search</Button>
                    </Container>
                </Col>
                <Col xs={12} md={9}>
                    <Row>
                        <div className='d-flex align-items-center justify-content-between'>
                            <h1 className='fw-bold'>Lô</h1>
                            <div className='d-flex gap-3'>
                                {/* <Dropdown>
                                    <Dropdown.Toggle className='rounded-0' variant="info">
                                        Actions
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu className='rounded-0'>
                                        <Dropdown.Item>Action</Dropdown.Item>
                                        <Dropdown.Item>Another action</Dropdown.Item>
                                        <Dropdown.Item>Something else</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown> */}
                                {
                                    selected.length > 0 && (
                                        <Button variant='danger' className='rounded-0'> <i className="bi bi-trash me-2"></i> Delete selected</Button>
                                    )
                                }
                                <Button variant='success' className='rounded-0'> <i className="bi bi-plus-square me-2"></i> Thêm mới</Button>
                                <Button variant='success' className='rounded-0'> <i className="bi bi-box-arrow-in-right me-2"></i> Import</Button>
                                <Button variant='success' className='rounded-0'> <i className="bi bi-box-arrow-right me-2"></i> Xuất file</Button>
                            </div>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <Table striped bordered hover responsive>
                                <thead>
                                    <tr>
                                        <th className='text-center'>
                                            <input type="checkbox" className={styles.checkbox} onChange={(e) => handleSelectAll(e.target.checked)} />
                                        </th>
                                        <th>Mã lô</th>
                                        <th>Mã Vaccine</th>
                                        <th>Tên Vaccine</th>
                                        <th>Số lượng</th>
                                        <th>Nhập</th>
                                        <th>Hết hạn</th>
                                        <th>Kho</th>
                                        <th className='text-center'></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {currentItems.map((batch, index) => (
                                        <tr key={batch.id}>
                                            <td width='50px' className='text-center align-middle'>
                                                <input type="checkbox" className={styles.checkbox} onChange={(e) => {
                                                    if (e.target.checked) {
                                                        setSelected([...selected, batch.id]);
                                                        return;
                                                    }
                                                    setSelected(selected.filter((id) => id !== batch.id));
                                                }} checked={selected.find(e => e === batch.id)} />
                                            </td>
                                            <td width='100px'>{batch.batchCode}</td>
                                            <td width='150px'>{batch.vaccineCode}</td>
                                            <td>{batch.vaccineName}</td>
                                            <td width='100px'>{batch.quantity}/{batch.batchSize}</td>
                                            <td width='150px'>{dayjs(batch.imported).format('DD/MM/YYYY HH:mm')}</td>
                                            <td width='150px'>{dayjs(batch.expiration).format('DD/MM/YYYY HH:mm')}</td>
                                            <td width='200px'>{batch.warehouseName}</td>
                                            <td width='50px' className='text-center'>
                                                <Button variant='' className='rounded-0'>
                                                    <i className="bi bi-pencil-square"></i>
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Pagination className='mt-3 justify-content-end'>
                        {
                            [...Array(totalPages)].map((_, index) => (
                                <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                    {index + 1}
                                </Pagination.Item>
                            ))
                        }
                    </Pagination>
                </Col>
            </Row>
        </Container>
    )
}
