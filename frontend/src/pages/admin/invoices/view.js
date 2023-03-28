import React from "react"
import './style.css'
import { NoData, Footer, Header, Sidebar } from '../../../components'
import DataTable from 'react-data-table-component'
import { Button, Card, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap"
import { PaginationOptions, statusFormat } from '../../../library/const'
import { NumericFormat } from 'react-number-format'
import { icons } from '../../../library/const'
import Select from 'react-select'
import { currency, momentTimeZone, numFormat, padStart } from "../../../library/format"

const View = (props) => {

    const { columnsInvoices, columnsItems, search, form, invoices, handleChange, modals, options, handleSave, setModals, items, handleItems, errors } = props,
        filteredCustomers = (invoices?.list || []).filter(({ cusId, status, invId, createdAt }) => {
            const lowerCaseSearch = search.toLowerCase()
            return (
                (cusId?.name && cusId?.name.toLowerCase().includes(lowerCaseSearch)) ||
                (status && status.toLowerCase().includes(lowerCaseSearch))) ||
                (invId && padStart(invId).includes(lowerCaseSearch)) ||
                (createdAt && momentTimeZone(createdAt, "MM/DD/YYYY").includes(lowerCaseSearch))
        })

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1><i className={icons.invoiceDollar}></i>&nbsp;&nbsp;Invoices List</h1>
                </div>
                <section className="section">
                    <Card className="head-title-card">
                        <Card.Body>
                            <Form className="mb-3">
                                <Row>
                                    <Col>
                                        <InputGroup>
                                            <InputGroup.Text><i className={icons.search}></i></InputGroup.Text>
                                            <Form.Control type="text" size="lg" name="search" value={search} onChange={handleChange}
                                                placeholder="Search by invoice date, invoice number, customer name or status..." />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <Button variant="info" type="button" size="lg" onClick={() => setModals({ ...modals, invoice: true, icon: icons.userPlus, title: "Add Invoice" })}>
                                            <i className={icons.userPlus}></i>&nbsp;&nbsp;New Invoice
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <div className="table-responsive">
                                <DataTable
                                    columns={columnsInvoices}
                                    data={filteredCustomers}
                                    pagination
                                    striped
                                    noDataComponent={<NoData />}
                                    paginationComponentOptions={PaginationOptions}
                                />
                            </div>
                        </Card.Body>
                    </Card>
                </section>
            </main>

            {/* Modal view, add or edit customer */}
            <Modal backdrop="static" id="md-invoice" size="lg" keyboard={false} show={modals.invoice} onHide={() => setModals({ ...modals, invoice: false })}>
                <Modal.Header closeButton>
                    <Modal.Title><i className={modals.icon}></i>&nbsp;&nbsp;{modals.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {   // Add or edit customer
                            !modals.view &&
                            <>
                                <Row>
                                    <Col md={6}>
                                        <Form.Group>
                                            <Form.Label className={errors.customer && "required-label"}>Customer&nbsp;<span className="required-label">*</span></Form.Label>
                                            <Select options={options.customers} placeholder="Select Customer..." name="customer" value={form.customer} onChange={(e) => handleChange(e, "customer")} />
                                        </Form.Group>
                                        {
                                            form.customer &&
                                            <div className="cust-info">
                                                <p>{form.customer?.name || ""}</p>
                                                <p>{form.customer?.phone || ""}</p>
                                                <p>{`${form.customer?.address1}, ${form.customer?.address2}, ${form.customer?.city}, ${form.customer?.state}, ${form.customer?.zip}`}</p>
                                            </div>
                                        }
                                    </Col>
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Notes</Form.Label>
                                            <Form.Control as="textarea" rows={(form.invId) ? 3 : 6} value={form.note} name="note" onChange={handleChange} />
                                        </Form.Group>
                                        {form.invId &&
                                            <Form.Group>
                                                <Form.Label>Status</Form.Label>
                                                <Select options={options.status} placeholder="Select Status..." name="status" value={form.status} onChange={(e) => handleChange(e, "status")} />
                                            </Form.Group>
                                        }
                                    </Col>
                                </Row>
                                <h5 className="head-table-modal">Items</h5>
                                <Row>
                                    <Col md={5}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className={errors.description && "required-label"}>Description&nbsp;<span className="required-label">*</span></Form.Label>
                                            <Form.Control type="text" size="lg" placeholder="Type the description..." className={errors.description && "required-input"}
                                                value={form.description} name="description" onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className={errors.qty && "required-label"}>Qty&nbsp;<span className="required-label">*</span></Form.Label>
                                            <NumericFormat thousandSeparator="," className={"form-control form-control-lg " + (errors.qty && "required-input")}
                                                placeholder="00.00" value={form.qty} name="qty" onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={2}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className={errors.price && "required-label"}>Price&nbsp;<span className="required-label">*</span></Form.Label>
                                            <NumericFormat thousandSeparator="," className={"form-control form-control-lg " + (errors.price && "required-input")}
                                                placeholder="00.00" value={form.price} name="price" onChange={handleChange} />
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Button variant="success" className="mt-4" size="lg" onClick={() => handleItems("add")}>
                                            <i className={icons.plus}></i>&nbsp;&nbsp;Add Item
                                        </Button>
                                    </Col>
                                    <Col md={12}>
                                        <div className="table-responsive">
                                            <DataTable
                                                columns={columnsItems}
                                                data={items}
                                                pagination
                                                striped
                                                noDataComponent={<NoData />}
                                                paginationPerPage={5}
                                                paginationRowsPerPageOptions={[5, 10, 15]}
                                                paginationComponentOptions={PaginationOptions}
                                            />
                                        </div>
                                    </Col>
                                </Row>
                                <h5 className="head-table-modal"></h5>
                                <Row>
                                    <Col>
                                        <Form.Group className="mb-3 center-text">
                                            <Form.Label>Sub Total</Form.Label>
                                            <span className="view-span">{currency(form.subTotal, "$ ")}</span>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3 center-text">
                                            <Form.Label>18% ITBIS</Form.Label>
                                            <span className="view-span">{currency(form.itbis, "$ ")}</span>
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group className="mb-3 center-text">
                                            <Form.Label>Total</Form.Label>
                                            <span className="view-span">{currency(form.total, "$ ")}</span>
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </>
                        } { // See customer
                            modals.view &&
                            <>
                                <Row>
                                    <Col md={7}>
                                        <div className="cust-info">
                                            <p><strong>{modals.data.cusId?.name}</strong></p>
                                            <p>{modals.data.cusId?.phone}</p>
                                            <p>{`${modals.data.cusId?.address1}, ${modals.data.cusId?.address2}, ${modals.data.cusId?.city}, ${modals.data.cusId?.state}, ${modals.data.cusId?.zip}`}</p>
                                        </div>
                                    </Col>
                                    <Col md={5}>
                                        <div className="cust-info">
                                            <p><strong>Invoice #:</strong>&nbsp;&nbsp;{padStart(modals.data?.invId)}</p>
                                            <p><strong>Invoice Date:</strong>&nbsp;&nbsp;{momentTimeZone(modals.data?.createdAt, "MM/DD/YYYY")}</p>
                                            <p><strong>Invoice Time:</strong>&nbsp;&nbsp;{momentTimeZone(modals.data?.createdAt, "hh:mm A")}</p>
                                            <p><strong>Status:</strong>&nbsp;&nbsp;<span className={statusFormat[modals.data?.status].color}>{statusFormat[modals.data?.status].text}</span></p>
                                        </div>
                                    </Col>
                                </Row>
                                <h5 className="head-table-modal mt-3">Items</h5>
                                <Row>
                                    <Col md={12}>
                                        <div className="table-responsive">
                                            <Table striped size="sm">
                                                <thead>
                                                    <tr>
                                                        <th width="45%">Item Description</th>
                                                        <th width="15%">QTY</th>
                                                        <th width="20%">Price</th>
                                                        <th width="20%">Total</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {
                                                        modals.data?.items &&
                                                        modals.data?.items.map((r, k) => {
                                                            return (<tr key={k}>
                                                                <td>{r.description}</td>
                                                                <td>{numFormat(r.qty)}</td>
                                                                <td>{currency(r.price, "$ ")}</td>
                                                                <td>{currency(r.total, "$ ")}</td>
                                                            </tr>)
                                                        })
                                                    }
                                                </tbody>
                                            </Table>
                                        </div>
                                        <Row>
                                            <Col md={7}>
                                                <div className="cust-info">
                                                    <p><strong>Note:</strong></p>
                                                    <p>{modals.data?.note || "-"}</p>
                                                </div>
                                            </Col>
                                            <Col md={5}>
                                                <div className="cust-info">
                                                    <p><strong>Sub Total:</strong>&nbsp;&nbsp;{currency(modals.data?.subTotal, "$ ")}</p>
                                                    <p><strong>18% ITBIS:</strong>&nbsp;&nbsp;{currency(modals.data?.itbis, "$ ")}</p>
                                                    <p><strong>Grand Total:</strong>&nbsp;&nbsp;{currency(modals.data?.total, "$ ")}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={() => setModals({ ...modals, invoice: false })}>
                        <i className={icons.times}></i>&nbsp;&nbsp;Close
                    </Button>
                    {!modals.view &&
                        <Button variant="success" size="lg" type="button" onClick={handleSave}>
                            <i className={icons.save}></i>&nbsp;&nbsp;Save
                        </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default View