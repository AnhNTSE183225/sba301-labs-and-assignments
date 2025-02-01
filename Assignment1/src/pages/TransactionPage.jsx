import React, { useState } from 'react';
import { Button, Col, Container, Dropdown, Form, InputGroup, Modal, Row, Table } from 'react-bootstrap';
import { addTransaction, deleteTransactions, transactions, updateTransaction } from '../data/Transactions';
import dayjs from 'dayjs';
import { batches } from '../data/batches';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrAfter);
dayjs.extend(isSameOrBefore);

export const TransactionPage = () => {


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [filter, setFilter] = useState({
    start: '0000-00-00T00:00:00',
    end: '9999-99-99T00:00:00',
  });
  const [sort, setSort] = useState({
    by: 'exportDate',
    reversed: false,
    func: (a, b) => new Date(a.exportDate) - new Date(b.exportDate),
  });
  const modifiedItems = transactions
    .filter((transaction) => (
      dayjs(transaction.exportDate).isSameOrAfter(dayjs(filter.start))
      &&
      dayjs(transaction.exportDate).isSameOrBefore(dayjs(filter.end))
    ))
    .sort(sort.func);
  if (sort.reversed) {
    modifiedItems.reverse();
  }
  const totalPages = Math.ceil(modifiedItems.length / itemsPerPage);
  const pagedModifiedItems = modifiedItems.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const [selectedItems, setSelectedItems] = useState([]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [modal, setModal] = useState(
    {
      active: false,
      type: 'add',
    }
  );

  const [targetTransaction, setTargetTransaction] = useState({
    id: -1,
    quantity: 0,
    exportDate: '0000-00-00T00:00:00',
    batchId: -1,
    batchCode: '',
    batchSearch: ''
  });

  const handleCloseModal = () => {
    setTargetTransaction({
      id: -1,
      quantity: 0,
      exportDate: '0000-00-00T00:00:00',
      batchId: -1,
      batchCode: '',
      batchSearch: ''
    });
    setModal({
      active: false,
      type: 'add',
    });
  }

  const handleSelectAll = (checked) => {
    if (checked) {
      setSelectedItems(pagedModifiedItems.map(item => item.id));
      return;
    }
    setSelectedItems([]);
  }

  const handleClearFilter = () => {
    setFilter({
      start: '0000-00-00T00:00:00',
      end: '9999-99-99T00:00:00',
    });
    setSort({
      by: 'exportDate',
      reversed: false,
      func: (a, b) => new Date(a.exportDate) - new Date(b.exportDate),
    });
  }

  return (
    <>
      <Container fluid className='p-3'>
        <Row>
          <Col xs={12} md={3}>
            <Container className='py-3' fluid style={{
              backgroundColor: '#ececec',
            }}>
              <Row>
                <Col>
                  <span className='fw-bold fs-4'> <i className="bi bi-funnel"></i> Lọc theo ngày xuất kho</span>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className='fs-6'>Từ</span>
                  <InputGroup>
                    <Form.Control className='rounded-0' value={filter.start.split('T')[0]} onChange={(e) => setFilter({ ...filter, start: e.target.value + 'T' + filter.start.split('T')[1] })} type="date" />
                    <Form.Control className='rounded-0' value={filter.start.split('T')[1]} onChange={(e) => setFilter({ ...filter, start: filter.start.split('T')[0] + 'T' + e.target.value })} type="time" />
                  </InputGroup>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col>
                  <span className='fs-6'>Đến</span>
                  <InputGroup>
                    <Form.Control className='rounded-0' value={filter.end.split('T')[0]} onChange={(e) => setFilter({ ...filter, end: e.target.value + 'T' + filter.end.split('T')[1] })} type="date" />
                    <Form.Control className='rounded-0' value={filter.end.split('T')[1]} onChange={(e) => setFilter({ ...filter, end: filter.end.split('T')[0] + 'T' + e.target.value })} type="time" />
                  </InputGroup>
                </Col>
              </Row>
              <Row>
                <Col>
                  <span className='fs-4 fw-bold'> <i className="bi bi-filter"></i> Sắp xếp theo</span>
                </Col>
              </Row>
              <Row className='mb-3'>
                <Col>
                  <Button variant={sort.by === 'exportDate' ? 'primary' : 'light'} className='rounded-0 me-3 mb-3' onClick={() =>
                    setSort({
                      by: 'exportDate',
                      reversed: sort.by === 'exportDate' ? !sort.reversed : false,
                      func: (a, b) => {
                        return new Date(a.exportDate) - new Date(b.exportDate);
                      }
                    })
                  }>
                    Ngày xuất kho {sort.by === 'exportDate' ?
                      !sort.reversed ?
                        <i className="bi bi-sort-up"></i> :
                        <i className="bi bi-sort-down"></i> : null}
                  </Button>
                  <Button
                    variant={sort.by === 'quantity' ? 'primary' : 'light'}
                    className="rounded-0 me-3 mb-3"
                    onClick={() =>
                      setSort({
                        by: 'quantity',
                        reversed: sort.by === 'quantity' ? !sort.reversed : false,
                        func: (a, b) => a.quantity - b.quantity,
                      })
                    }
                  >
                    Số lượng{' '}
                    {sort.by === 'quantity'
                      ? !sort.reversed
                        ? <i className="bi bi-sort-up" />
                        : <i className="bi bi-sort-down" />
                      : null}
                  </Button>
                  <Button
                    variant={sort.by === 'id' ? 'primary' : 'light'}
                    className="rounded-0 me-3 mb-3"
                    onClick={() =>
                      setSort({
                        by: 'id',
                        reversed: sort.by === 'id' ? !sort.reversed : false,
                        func: (a, b) => a.id - b.id,
                      })
                    }
                  >
                    ID{' '}
                    {sort.by === 'id'
                      ? !sort.reversed
                        ? <i className="bi bi-sort-up" />
                        : <i className="bi bi-sort-down" />
                      : null}
                  </Button>

                  <Button
                    variant={sort.by === 'batchCode' ? 'primary' : 'light'}
                    className="rounded-0 me-3 mb-3"
                    onClick={() =>
                      setSort({
                        by: 'batchCode',
                        reversed: sort.by === 'batchCode' ? !sort.reversed : false,
                        func: (a, b) => a.batchCode.localeCompare(b.batchCode),
                      })
                    }
                  >
                    Mã lô{' '}
                    {sort.by === 'batchCode'
                      ? !sort.reversed
                        ? <i className="bi bi-sort-up" />
                        : <i className="bi bi-sort-down" />
                      : null}
                  </Button>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button variant='light' className='rounded-0' onClick={handleClearFilter}>
                    Xoá bộ lọc
                  </Button>
                </Col>
              </Row>
            </Container>
          </Col>
          <Col xs={12} md={9}>
            <div className='d-flex align-items-center justify-content-between'>
              <span className='fs-1 fw-bold'>Quản lý xuất kho</span>
              <div className='d-flex gap-3'>
                {
                  selectedItems.length > 0 && (
                    <Button onClick={() => setDeleteModal(true)} variant='danger' className='rounded-0'> <i className="bi bi-trash me-2"></i>Xoá đã chọn</Button>
                  )
                }
                <Button onClick={() => setModal({
                  active: true,
                  type: 'add',
                })} variant='success' className='rounded-0'> <i className="bi bi-plus-square me-2"></i> Xuất kho</Button>
                <Button variant='success' className='rounded-0'> <i className="bi bi-box-arrow-in-right me-2"></i> Import</Button>
                <Button variant='success' className='rounded-0'> <i className="bi bi-box-arrow-right me-2"></i> Xuất file</Button>
              </div>
            </div>
            <Container>
              <Row>
                <Col className='p-0'>
                  <Table striped bordered hover responsive>
                    <thead>
                      <tr className='text-center align-middle'>
                        <th>
                          <input onChange={(e) => handleSelectAll(e.target.checked)} type="checkbox" style={{ transform: 'scale(1.2)' }} />
                        </th>
                        <th>ID</th>
                        <th>Số lượng</th>
                        <th>Ngày xuất</th>
                        <th>Mã lô</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        pagedModifiedItems.map((transaction, index) => (
                          <tr key={transaction.id} className='text-center align-middle'>
                            <td><input onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedItems([...selectedItems, transaction.id]);
                                return;
                              }
                              setSelectedItems(selectedItems.filter(id => id !== transaction.id));
                            }} checked={selectedItems.find(id => id === transaction.id)} style={{ transform: 'scale(1.2)' }} type="checkbox" /></td>
                            <td>{transaction.id}</td>
                            <td>{transaction.quantity}</td>
                            <td>{dayjs(transaction.exportDate).format('DD/MM/YYYY HH:mm')}</td>
                            <td>{transaction.batchCode}</td>
                            <td>
                              <Button onClick={() => {
                                setTargetTransaction({
                                  ...targetTransaction,
                                  id: transaction.id,
                                  quantity: transaction.quantity,
                                  exportDate: transaction.exportDate,
                                  batchId: transaction.batchId,
                                  batchCode: transaction.batchCode,
                                });
                                setModal({
                                  active: true,
                                  type: 'edit',
                                });
                              }} className='rounded-0' variant=''>
                                <i className="bi bi-pencil-square"></i>
                              </Button>
                            </td>
                          </tr>
                        ))
                      }
                    </tbody>
                  </Table>
                </Col>
              </Row>
              <Row>
                <Col>
                  <div className='d-flex justify-content-end align-items-center gap-2'>
                    <Button disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className='p-0' variant=''><i className="bi bi-chevron-bar-left"></i></Button>
                    <Button disabled={currentPage === 1} onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} className='p-0' variant=''><i className="bi bi-chevron-left"></i></Button>
                    <span>Hiển thị trang </span>
                    <input value={currentPage} onChange={(e) => setCurrentPage(e.target.value)} type="number" min={1} step={1} max={totalPages} style={{ width: '30px' }} className='form-control p-0 text-center' />
                    <span>trong {totalPages}</span>
                    <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} className='p-0' variant=''><i className="bi bi-chevron-right"></i></Button>
                    <Button disabled={currentPage === totalPages} onClick={(e) => setCurrentPage(totalPages)} className='p-0' variant=''><i className="bi bi-chevron-bar-right"></i></Button>
                  </div>
                </Col>
              </Row>
            </Container>
          </Col>
        </Row>
      </Container >
      <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Xác nhận xoá</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Bạn có chắc chắn muốn xoá các lô đã chọn?</p>
          <p>
            {
              selectedItems.map((id) => {
                const item = transactions.find((t) => t.id === id);
                return <span key={id} className='badge bg-secondary me-2'>{item.id}</span>
              })
            }
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary rounded-0' onClick={() => setDeleteModal(false)}>Hủy</Button>
          <Button variant='danger rounded-0' onClick={() => {
            deleteTransactions(selectedItems);
            setSelectedItems([]);
            setDeleteModal(false);
          }}>Xoá</Button>
        </Modal.Footer>
      </Modal>
      <Modal show={modal.active} onHide={handleCloseModal} size='lg'>
        <Modal.Header closeButton>
          <Modal.Title>{modal.type == 'add' ? 'Xuất kho' : `Chỉnh sửa xuất kho #${targetTransaction.id}`}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Row className='mb-3'>
              <Col className='p-0'>
                <InputGroup>
                  <InputGroup.Text className='rounded-0'>Mã lô</InputGroup.Text>
                  <Dropdown>
                    <Dropdown.Toggle className='rounded-0 border text-wrap text-start' variant='light'>
                      {targetTransaction.batchId === -1 ? 'Chọn lô' : targetTransaction.batchCode}
                    </Dropdown.Toggle>
                    <Dropdown.Menu className='rounded-0 p-0'>
                      <Form.Control value={targetTransaction.batchSearch} onChange={(e) => setTargetTransaction({ ...targetTransaction, batchSearch: e.target.value })} type='text' className='rounded-0' placeholder='Nhập mã lô...' />
                      <div style={{
                        maxHeight: '200px',
                        overflowY: 'auto',
                      }}>
                        {
                          batches.filter((batch) => batch.batchCode.toLowerCase().includes(targetTransaction.batchSearch.toLowerCase())).map((batch) => (
                            <Dropdown.Item key={batch.id} onClick={() => setTargetTransaction({ ...targetTransaction, batchId: batch.id, batchCode: batch.batchCode })}>
                              {batch.batchCode}
                            </Dropdown.Item>
                          ))
                        }
                      </div>
                    </Dropdown.Menu>
                  </Dropdown>
                </InputGroup>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col className='p-0'>
                <InputGroup>
                  <InputGroup.Text className='rounded-0'>Số lượng</InputGroup.Text>
                  <input value={targetTransaction.quantity} onChange={(e) => setTargetTransaction({ ...targetTransaction, quantity: e.target.value })} type="number" className='form-control' />
                </InputGroup>
              </Col>
            </Row>
            <Row className='mb-3'>
              <Col className='p-0'>
                <InputGroup>
                  <InputGroup.Text className='rounded-0'>Ngày xuất lô</InputGroup.Text>
                  <Form.Control value={targetTransaction.exportDate.split("T")[1]} onChange={(e) => {
                    setTargetTransaction({
                      ...targetTransaction,
                      exportDate: targetTransaction.exportDate.split('T')[0] + 'T' + e.target.value
                    });
                  }} className='rounded-0' type="time" />
                  <Form.Control value={targetTransaction.exportDate.split("T")[0]} onChange={(e) => {
                    setTargetTransaction({
                      ...targetTransaction,
                      exportDate: e.target.value + 'T' + targetTransaction.exportDate.split('T')[1]
                    });
                  }} className='rounded-0' type="date" />
                </InputGroup>
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={handleCloseModal} variant='secondary' className='rounded-0'>Hủy</Button>
          {
            modal.type == 'add' ? (
              <Button variant='success' className='rounded-0' onClick={() => {
                addTransaction({
                  quantity: targetTransaction.quantity,
                  exportDate: targetTransaction.exportDate,
                  batchId: targetTransaction.batchId,
                  batchCode: targetTransaction.batchCode,
                });
                handleCloseModal();
              }}>Xuất kho</Button>
            ) : (
              <Button onClick={() => {
                updateTransaction({
                  id: targetTransaction.id,
                  quantity: targetTransaction.quantity,
                  exportDate: targetTransaction.exportDate,
                  batchId: targetTransaction.batchId,
                  batchCode: targetTransaction.batchCode,
                });
                handleCloseModal();
              }} variant='info' className='rounded-0'>Lưu</Button>
            )
          }
        </Modal.Footer>
      </Modal>
    </>
  )
}
