import React, { useEffect, useState } from 'react'
import { Button, Col, Container, Dropdown, Form, FormCheck, InputGroup, Modal, Pagination, Row, Table } from 'react-bootstrap'
import { addBatch, batches, deleteBatches, editBatch, vaccines, warehouses } from '../data/batches'
import styles from './stockPage.module.css';
import dayjs from 'dayjs';
export const StockPage = () => {

    const [itemsPerPage, setItemsPerPage] = useState(5);
    const [currentPage, setCurrentPage] = useState(1);
    const [filterVaccine, setFilterVaccine] = useState({
        search: '',
        vaccineId: -1,
        vaccineCode: '',
        vaccineName: ''
    });
    const [search, setSearch] = useState('');
    const [filterWarehouse, setFilterWarehouse] = useState({
        search: '',
        warehouseId: -1,
        warehouseName: ''
    });
    const [sortFunction, setSortFunction] = useState({
        field: 'batchCode',
        function: () => (a, b) => a.batchCode.localeCompare(b.batchCode),
        reversed: false
    });
    const filteredItems = batches
        .filter((batch) => search === ''
            || batch.batchCode.toLowerCase().includes(search.toLowerCase())
            || batch.vaccineName.toLowerCase().includes(search.toLowerCase()))
        .filter((batch) => filterVaccine.vaccineId === -1 || batch.vaccineId === filterVaccine.vaccineId)
        .filter((batch) => filterWarehouse.warehouseId === -1 || batch.warehouseId === filterWarehouse.warehouseId)
        .sort(sortFunction.function);
    if (sortFunction.reversed) {
        filteredItems.reverse();
    }
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
    const currentItems = filteredItems.slice((currentPage * itemsPerPage) - itemsPerPage, currentPage * itemsPerPage);

    const [selected, setSelected] = useState([]);
    const [targetBatch, setTargetBatch] = useState({
        batchId: -1,
        batchCode: "",
        batchSize: 0,
        quantity: 0,
        vaccineId: 0,
        vaccineCode: '',
        vaccineName: '',
        imported: "0000-00-00T00:00:00",
        expiration: "0000-00-00T00:00:00",
        warehouseId: 0,
        warehouseName: ''
    });

    const [showAddModal, setShowAddModal] = useState(false);
    const [warehouseSearch, setWarehouseSearch] = useState('');
    const [vaccineSearch, setVaccineSearch] = useState('');
    const [currentMode, setCurrentMode] = useState('add');

    const handleSelectAll = (selected) => {
        if (selected) {
            const newSelected = currentItems.map((batch) => batch.id);
            setSelected(newSelected);
            return;
        }
        setSelected([]);
    }

    const handleClearFilter = () => {
        setFilterVaccine({
            search: '',
            vaccineId: -1,
            vaccineCode: '',
            vaccineName: ''
        });
        setFilterWarehouse({
            search: '',
            warehouseId: -1,
            warehouseName: ''
        });
        setSortFunction({
            field: 'batchCode',
            function: () => (a, b) => a.batchCode.localeCompare(b.batchCode),
            reversed: false
        });
    }

    const handleCloseModal = () => {
        setShowAddModal(false);
        setVaccineSearch('');
        setWarehouseSearch('');
        setTargetBatch({
            batchId: -1,
            batchCode: "",
            batchSize: 0,
            quantity: 0,
            vaccineId: 0,
            vaccineCode: '',
            vaccineName: '',
            imported: "0000-00-00T00:00:00",
            expiration: "0000-00-00T00:00:00",
            warehouseId: 0,
            warehouseName: ''
        });
    }

    useEffect(() => {
        setCurrentPage(1);
    }, [filterVaccine, filterWarehouse, search])

    const [deleteModal, setDeleteModal] = useState(false);

    return (
        <>
            <Container fluid className='p-3'>
                <Row>
                    <Col xs={12} md={3}>
                        <Container className='py-3' fluid style={{
                            backgroundColor: '#ececec',
                        }}>
                            <Row >
                                <Col>
                                    <h1 className='fs-4'> <i className="bi bi-search"></i> Tìm kiếm</h1>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Form.Control value={search} onChange={(e) => setSearch(e.target.value)} placeholder='Nhập tên lô/ tên vaccine...' type='text' className='rounded-0' />
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h1 className='fs-4'> <i className="bi bi-funnel"></i> Lọc theo</h1>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className='fs-6'>Theo vaccine</span>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Dropdown>
                                        <Dropdown.Toggle className='rounded-0 border text-wrap text-start' variant='light' id="dropdown-basic">
                                            {filterVaccine.vaccineId === -1 ? 'Chọn vaccine' : `[${filterVaccine.vaccineCode}]${filterVaccine.vaccineName}`}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='rounded-0 p-0'>
                                            <Form.Control value={filterVaccine.search} onChange={(e) => setFilterVaccine({ ...filterVaccine, search: e.target.value })} type='text' className='rounded-0' placeholder='Nhập tên/mã vaccine...' />
                                            <div style={{
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                            }}>
                                                {
                                                    vaccines.filter(
                                                        (vaccine) => vaccine.vaccineName.toLowerCase().includes(filterVaccine.search.toLowerCase())
                                                            || vaccine.vaccineCode.toLowerCase().includes(filterVaccine.search.toLowerCase())
                                                    ).map((vaccine) => (
                                                        <Dropdown.Item onClick={() => {
                                                            setFilterVaccine({
                                                                ...filterVaccine,
                                                                vaccineId: vaccine.vaccineId,
                                                                vaccineCode: vaccine.vaccineCode,
                                                                vaccineName: vaccine.vaccineName
                                                            });
                                                        }} key={vaccine.vaccineId} className='align-middle text-wrap text-start'>
                                                            [{vaccine.vaccineCode}]{vaccine.vaccineName}
                                                        </Dropdown.Item>
                                                    ))
                                                }
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <span className='fs-6'>Theo kho</span>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Dropdown>
                                        <Dropdown.Toggle className='rounded-0 border text-wrap text-start' variant='light' id="dropdown-basic">
                                            {filterWarehouse.warehouseId === -1 ? 'Chọn kho' : filterWarehouse.warehouseName}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='rounded-0 p-0'>
                                            <Form.Control value={filterWarehouse.search} onChange={(e) => setFilterWarehouse({ ...filterWarehouse, search: e.target.value })} type='text' className='rounded-0' placeholder='Nhập tên/mã vaccine...' />
                                            <div style={{
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                            }}>
                                                {
                                                    warehouses.filter(
                                                        (warehouse) => warehouse.warehouseName.toLowerCase().includes(filterWarehouse.search.toLowerCase())
                                                    ).map((warehouse) => (
                                                        <Dropdown.Item onClick={() => {
                                                            setFilterWarehouse({
                                                                ...filterWarehouse,
                                                                warehouseId: warehouse.warehouseId,
                                                                warehouseName: warehouse.warehouseName
                                                            })
                                                        }} key={warehouse.warehouseId} className='align-middle text-wrap text-start'>
                                                            {warehouse.warehouseName}
                                                        </Dropdown.Item>
                                                    ))
                                                }
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </Col>
                            </Row>
                            <Row>
                                <Col>
                                    <h1 className='fs-4'> <i className="bi bi-filter"></i> Sắp xếp theo</h1>
                                </Col>
                            </Row>
                            <Row className='mb-3'>
                                <Col>
                                    <Button variant={sortFunction.field == 'batchCode' ? 'primary' : 'light'} className='rounded-0 me-3 mb-3' onClick={() => {
                                        setSortFunction({
                                            field: 'batchCode',
                                            function: (a, b) => a.batchCode.localeCompare(b.batchCode),
                                            reversed: sortFunction.field === 'batchCode' ? !sortFunction.reversed : false
                                        });
                                    }}>Mã lô {sortFunction.field === 'batchCode' ? !sortFunction.reversed ? <i class="bi bi-sort-up"></i> : <i class="bi bi-sort-down"></i> : null}</Button>
                                    <Button variant={sortFunction.field == 'vaccineName' ? 'primary' : 'light'} className='rounded-0 me-3 mb-3' onClick={() => {
                                        setSortFunction({
                                            field: 'vaccineName',
                                            function: (a, b) => a.vaccineName.localeCompare(b.vaccineName),
                                            reversed: sortFunction.field === 'vaccineName' ? !sortFunction.reversed : false
                                        });
                                    }}>Vaccine {sortFunction.field === 'vaccineName' ? !sortFunction.reversed ? <i class="bi bi-sort-up"></i> : <i class="bi bi-sort-down"></i> : null}</Button>
                                    <Button variant={sortFunction.field == 'quantity' ? 'primary' : 'light'} className='rounded-0 me-3 mb-3' onClick={() => {
                                        setSortFunction({
                                            field: 'quantity',
                                            function: (a, b) => a.quantity - b.quantity,
                                            reversed: sortFunction.field === 'quantity' ? !sortFunction.reversed : false
                                        });
                                    }}>Số lượng {sortFunction.field === 'quantity' ? !sortFunction.reversed ? <i class="bi bi-sort-up"></i> : <i class="bi bi-sort-down"></i> : null}</Button>
                                    <Button variant={sortFunction.field == 'imported' ? 'primary' : 'light'} className='rounded-0 me-3 mb-3' onClick={() => {
                                        setSortFunction({
                                            field: 'imported',
                                            function: (a, b) => new Date(a.imported) - new Date(b.imported),
                                            reversed: sortFunction.field === 'imported' ? !sortFunction.reversed : false
                                        });
                                    }}>Nhập {sortFunction.field === 'imported' ? !sortFunction.reversed ? <i class="bi bi-sort-up"></i> : <i class="bi bi-sort-down"></i> : null}</Button>
                                    <Button variant={sortFunction.field == 'expiration' ? 'primary' : 'light'} className='rounded-0 me-3 mb-3' onClick={() => {
                                        setSortFunction({
                                            field: 'expiration',
                                            function: (a, b) => new Date(a.expiration) - new Date(b.expiration),
                                            reversed: sortFunction.field === 'expiration' ? !sortFunction.reversed : false
                                        });
                                    }}>Hết hạn {sortFunction.field === 'expiration' ? !sortFunction.reversed ? <i class="bi bi-sort-up"></i> : <i class="bi bi-sort-down"></i> : null}</Button>
                                    <Button variant={sortFunction.field == 'warehouseName' ? 'primary' : 'light'} className='rounded-0 me-3 mb-3' onClick={() => {
                                        setSortFunction({
                                            field: 'warehouseName',
                                            function: (a, b) => a.warehouseName.localeCompare(b.warehouseName),
                                            reversed: sortFunction.field === 'warehouseName' ? !sortFunction.reversed : false
                                        });
                                    }}>Kho {sortFunction.field === 'warehouseName' ? !sortFunction.reversed ? <i class="bi bi-sort-up"></i> : <i class="bi bi-sort-down"></i> : null}</Button>
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
                        <Row>
                            <div className='d-flex align-items-center justify-content-between'>
                                <h1 className='fw-bold fs-1'>Quản lý lô Vaccine</h1>
                                <div className='d-flex gap-3'>
                                    {
                                        selected.length > 0 && (
                                            <Button onClick={() => setDeleteModal(true)} variant='danger' className='rounded-0'> <i className="bi bi-trash me-2"></i>Xoá đã chọn</Button>
                                        )
                                    }
                                    <Button onClick={() => {
                                        setCurrentMode('add');
                                        setShowAddModal(true);
                                    }} variant='success' className='rounded-0'> <i className="bi bi-plus-square me-2"></i> Thêm mới</Button>
                                    <Button variant='success' className='rounded-0'> <i className="bi bi-box-arrow-in-right me-2"></i> Import</Button>
                                    <Button variant='success' className='rounded-0'> <i className="bi bi-box-arrow-right me-2"></i> Xuất file</Button>
                                </div>
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <Table striped bordered hover responsive>
                                    <thead>
                                        <tr className='align-middle text-center'>
                                            <th className='text-center'>
                                                <input type="checkbox" value={selected} className={styles.checkbox} onChange={(e) => handleSelectAll(e.target.checked)} />
                                            </th>
                                            <th>Mã lô</th>
                                            <th>Vaccine</th>
                                            <th>Số lượng</th>
                                            <th>Nhập</th>
                                            <th>Hết hạn</th>
                                            <th>Kho</th>
                                            <th className='text-center'></th>
                                        </tr>
                                    </thead>
                                    <tbody className='align-middle'>
                                        {currentItems.map((batch, index) => (
                                            <tr key={batch.id} style={{ height: '70px' }}>
                                                <td className='text-center align-middle p-0'>
                                                    <input type="checkbox" className={styles.checkbox} onChange={(e) => {
                                                        if (e.target.checked) {
                                                            setSelected([...selected, batch.id]);
                                                            return;
                                                        }
                                                        setSelected(selected.filter((id) => id !== batch.id));
                                                    }} checked={selected.find(e => e === batch.id)} />
                                                </td>
                                                <td className='align-middle text-center p-0'>{batch.batchCode}</td>
                                                <td style={{
                                                    minWidth: '200px',
                                                    maxWidth: '200px',
                                                    wordWrap: 'break-word'
                                                }}>[{batch.vaccineCode}]{batch.vaccineName}</td>
                                                <td className='align-middle'>{batch.quantity}/{batch.batchSize}</td>
                                                <td className='align-middle'>{dayjs(batch.imported).format('DD/MM/YYYY HH:mm')}</td>
                                                <td className='align-middle'>{dayjs(batch.expiration).format('DD/MM/YYYY HH:mm')}</td>
                                                <td className='align-middle'>{batch.warehouseName}</td>
                                                <td className='text-center align-middle'>
                                                    <Button onClick={() => {
                                                        setTargetBatch({
                                                            batchId: batch.id,
                                                            batchCode: batch.batchCode,
                                                            batchSize: batch.batchSize,
                                                            quantity: batch.quantity,
                                                            vaccineId: batch.vaccineId,
                                                            vaccineCode: batch.vaccineCode,
                                                            vaccineName: batch.vaccineName,
                                                            imported: batch.imported,
                                                            expiration: batch.expiration,
                                                            warehouseId: batch.warehouseId,
                                                            warehouseName: batch.warehouseName
                                                        });
                                                        setShowAddModal(true);
                                                        setCurrentMode('edit');
                                                    }} variant='' className='rounded-0'>
                                                        <i className="bi bi-pencil-square"></i>
                                                    </Button>
                                                </td>
                                            </tr>
                                        )
                                        )}
                                    </tbody>
                                </Table>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='d-flex justify-content-end align-items-center gap-2'>
                                    <Button disabled={currentPage === 1} onClick={() => setCurrentPage(1)} className='p-0' variant=''><i className="bi bi-chevron-bar-left"></i></Button>
                                    <Button disabled={currentPage === 1} onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))} className='p-0' variant=''><i class="bi bi-chevron-left"></i></Button>
                                    <span>Hiển thị trang </span>
                                    <input value={currentPage} onChange={(e) => setCurrentPage(e.target.value)} type="number" min={1} step={1} style={{ width: '30px' }} className='form-control p-0 text-center' />
                                    <span>trong {totalPages}</span>
                                    <Button disabled={currentPage === totalPages} onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))} className='p-0' variant=''><i class="bi bi-chevron-right"></i></Button>
                                    <Button disabled={currentPage === totalPages} onClick={(e) => setCurrentPage(totalPages)} className='p-0' variant=''><i className="bi bi-chevron-bar-right"></i></Button>
                                </div>
                            </Col>
                        </Row>
                        {/* <Pagination className='mt-3 justify-content-end'>
                            {
                                [...Array(totalPages)].map((_, index) => (
                                    <Pagination.Item key={index + 1} active={index + 1 === currentPage} onClick={() => setCurrentPage(index + 1)}>
                                        {index + 1}
                                    </Pagination.Item>
                                ))
                            }
                        </Pagination> */}
                    </Col>
                </Row>
            </Container>
            <Modal show={showAddModal} onHide={handleCloseModal} size='xl'>
                <Modal.Header closeButton>
                    <Modal.Title>{currentMode == 'add' ? 'Thêm lô mới' : `Chỉnh sửa lô ${targetBatch.batchCode}`}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Container>
                        <Row className='mb-3'>
                            <Col className='p-0'>
                                <InputGroup>
                                    <InputGroup.Text className='rounded-0'>Mã lô</InputGroup.Text>
                                    <Form.Control value={targetBatch.batchCode} onChange={(e) => setTargetBatch({ ...targetBatch, batchCode: e.target.value })} className='rounded-0' type="text" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col className='p-0'>
                                <InputGroup>
                                    <InputGroup.Text className='rounded-0'>Loại Vaccine</InputGroup.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle className='rounded-0 border text-start text-wrap' variant='light' id="dropdown-basic">
                                            {targetBatch.vaccineName ? `[${targetBatch.vaccineCode}]${targetBatch.vaccineName}` : 'Chọn vaccine'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='rounded-0 p-0'>
                                            <Form.Control value={vaccineSearch} onChange={(e) => setVaccineSearch(e.target.value)} type='text' className='rounded-0' placeholder='Nhập tên/mã vaccine...' />
                                            <div style={{
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                            }}>
                                                {
                                                    vaccines.filter(
                                                        (vaccine) => vaccine.vaccineName.toLowerCase().includes(vaccineSearch.toLowerCase())
                                                            || vaccine.vaccineCode.toLowerCase().includes(vaccineSearch.toLowerCase())
                                                    ).map((vaccine) => (
                                                        <Dropdown.Item onClick={() => setTargetBatch({
                                                            ...targetBatch,
                                                            vaccineId: vaccine.vaccineId,
                                                            vaccineCode: vaccine.vaccineCode,
                                                            vaccineName: vaccine.vaccineName
                                                        })} key={vaccine.vaccineId}>[{vaccine.vaccineCode}]{vaccine.vaccineName}</Dropdown.Item>
                                                    ))
                                                }
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            {
                                currentMode == 'edit' && (
                                    <Col className='p-0 pe-3'>
                                        <InputGroup>
                                            <InputGroup.Text className='rounded-0'>Còn lại</InputGroup.Text>
                                            <Form.Control value={targetBatch.quantity} onChange={(e) => setTargetBatch({ ...targetBatch, quantity: e.target.value })} className='rounded-0' type="number" min={1} step={1} />
                                        </InputGroup>
                                    </Col>
                                )
                            }
                            <Col className='p-0'>
                                <InputGroup>
                                    <InputGroup.Text className='rounded-0'>Số lượng</InputGroup.Text>
                                    <Form.Control value={targetBatch.batchSize} onChange={(e) => setTargetBatch({ ...targetBatch, batchSize: e.target.value })} className='rounded-0' type="number" min={1} step={1} />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col className='p-0 pe-3'>
                                <InputGroup>
                                    <InputGroup.Text className='rounded-0'>Ngày nhập</InputGroup.Text>
                                    <Form.Control value={targetBatch.imported.split("T")[1]} onChange={(e) => {
                                        setTargetBatch({
                                            ...targetBatch,
                                            imported: targetBatch.imported.split('T')[0] + 'T' + e.target.value
                                        });
                                    }} className='rounded-0' type="time" />
                                    <Form.Control value={targetBatch.imported.split("T")[0]} onChange={(e) => {
                                        setTargetBatch({
                                            ...targetBatch,
                                            imported: e.target.value + 'T' + targetBatch.imported.split('T')[1]
                                        });
                                    }} className='rounded-0' type="date" />
                                </InputGroup>
                            </Col>
                            <Col className='p-0'>
                                <InputGroup>
                                    <InputGroup.Text className='rounded-0'>Ngày hết hạn</InputGroup.Text>
                                    <Form.Control value={targetBatch.expiration.split("T")[1]} onChange={(e) => {
                                        setTargetBatch({
                                            ...targetBatch,
                                            expiration: targetBatch.expiration.split('T')[0] + 'T' + e.target.value
                                        });
                                    }} className='rounded-0' type="time" />
                                    <Form.Control value={targetBatch.expiration.split("T")[0]} onChange={(e) => {
                                        setTargetBatch({
                                            ...targetBatch,
                                            expiration: e.target.value + 'T' + targetBatch.expiration.split('T')[1]
                                        });
                                    }} className='rounded-0' type="date" />
                                </InputGroup>
                            </Col>
                        </Row>
                        <Row className='mb-3'>
                            <Col className='p-0'>
                                <InputGroup>
                                    <InputGroup.Text className='rounded-0'>Kho</InputGroup.Text>
                                    <Dropdown>
                                        <Dropdown.Toggle className='rounded-0 border' variant='light' id="dropdown-basic">
                                            {targetBatch.warehouseName ? targetBatch.warehouseName : 'Chọn kho'}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu className='rounded-0 p-0'>
                                            <Form.Control value={warehouseSearch} onChange={(e) => setWarehouseSearch(e.target.value)} type='text' className='rounded-0' placeholder='Nhập tên kho...' />
                                            <div style={{
                                                maxHeight: '200px',
                                                overflowY: 'auto',
                                            }}>
                                                {
                                                    warehouses.filter(w => w.warehouseName.toLowerCase().includes(warehouseSearch.toLowerCase())).map((warehouse) => (
                                                        <Dropdown.Item onClick={() => {
                                                            setTargetBatch({
                                                                ...targetBatch,
                                                                warehouseId: warehouse.warehouseId,
                                                                warehouseName: warehouse.warehouseName
                                                            });
                                                        }} key={warehouse.warehouseId}>{warehouse.warehouseName}</Dropdown.Item>
                                                    ))
                                                }
                                            </div>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                </InputGroup>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary rounded-0" onClick={handleCloseModal}>
                        Hủy
                    </Button>
                    {
                        currentMode == 'add' ? (<Button variant="success rounded-0" onClick={() => {
                            try {
                                addBatch({
                                    batchCode: targetBatch.batchCode,
                                    batchSize: Number(targetBatch.batchSize),
                                    vaccineId: targetBatch.vaccineId,
                                    imported: targetBatch.imported,
                                    expiration: targetBatch.expiration,
                                    warehouseId: targetBatch.warehouseId,
                                });
                                handleCloseModal();
                            } catch (error) {
                                window.alert(error);
                            }
                        }}>
                            Tạo mới
                        </Button>) : (
                            <Button variant="info rounded-0" onClick={() => {
                                try {
                                    editBatch({
                                        batchId: targetBatch.batchId,
                                        batchCode: targetBatch.batchCode,
                                        quantity: Number(targetBatch.quantity),
                                        batchSize: Number(targetBatch.batchSize),
                                        vaccineId: targetBatch.vaccineId,
                                        imported: targetBatch.imported,
                                        expiration: targetBatch.expiration,
                                        warehouseId: targetBatch.warehouseId,
                                    });
                                    handleCloseModal();
                                } catch (error) {
                                    window.alert(error);
                                }
                            }}>
                                Lưu chỉnh sửa
                            </Button>
                        )
                    }
                </Modal.Footer>
            </Modal>
            <Modal show={deleteModal} onHide={() => setDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Xác nhận xoá</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Bạn có chắc chắn muốn xoá các lô đã chọn?</p>
                    <p>
                        {
                            selected.map((id) => {
                                const batch = batches.find((batch) => batch.id === id);
                                return <span key={id} className='badge bg-secondary me-2'>{batch.batchCode}</span>
                            })
                        }
                    </p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant='secondary rounded-0' onClick={() => setDeleteModal(false)}>Hủy</Button>
                    <Button variant='danger rounded-0' onClick={() => {
                        deleteBatches(selected);
                        setSelected([]);
                        setDeleteModal(false);
                    }}>Xoá</Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
