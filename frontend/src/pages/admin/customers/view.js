import React from "react"
import { NoData, Header, Sidebar } from '../../../components'
import DataTable from 'react-data-table-component'
import { Button, Card, Col, Form, InputGroup, Modal, Row, Table } from "react-bootstrap"
import { isActiveStatus, PaginationOptions, statusFormat } from '../../../library/const'
import Switch from "react-switch"
import { NumericFormat, PatternFormat } from 'react-number-format'
import { icons } from '../../../library/const'
import { currency, momentTimeZone, numFormat, padStart } from "../../../library/format"

const View = (props) => {

    const { columnsCustomers, columnsInv, search, form, custList, handleChange, modals, errors, handleSave, setModals } = props,
        filteredCustomers = custList.filter(({ name, phone, email }) => {
            const lowerCaseSearch = search.toLowerCase()
            return ((name && name.toLowerCase().includes(lowerCaseSearch)) ||
                (phone && phone.toLowerCase().includes(lowerCaseSearch))) ||
                (email && email.toLowerCase().includes(lowerCaseSearch))
        })

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1><i className={icons.userTag}></i>&nbsp;&nbsp;Customers List</h1>
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
                                                placeholder="Search by name, phone or email..." />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <Button variant="info" type="button" size="lg" onClick={() => setModals({ ...modals, customer: true, icon: icons.userPlus, title: "Add Customer" })}>
                                            <i className={icons.userPlus}></i>&nbsp;&nbsp;New Customer
                                        </Button>
                                    </Col>
                                </Row>
                            </Form>
                            <div className="table-responsive">
                                <DataTable
                                    columns={columnsCustomers}
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
            <Modal backdrop="static" size="lg" keyboard={false} show={modals.customer} onHide={() => setModals({ ...modals, customer: false })}>
                <Modal.Header closeButton>
                    <Modal.Title><i className={modals.icon}></i>&nbsp;&nbsp;{modals.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {   // Add or edit customer
                            !modals.view && !modals.invoice &&
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={errors.name && "required-label"}>Name&nbsp;<span className="required-label">*</span></Form.Label>
                                        <Form.Control type="text" size="lg" placeholder="Type the name..." className={errors.name && "required-input"}
                                            value={form.name} name="name" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={errors.phone && "required-label"}>Phone&nbsp;<span className="required-label">*</span></Form.Label>
                                        <PatternFormat className={"form-control form-control-lg " + (errors.phone && "required-input")} format="(###) ###-####"
                                            value={form.phone} name="phone" onChange={handleChange} placeholder="(###) ###-####" />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={errors.email && "required-label"}>Email&nbsp;<span className="required-label">*</span></Form.Label>
                                        <Form.Control type="text" size="lg" placeholder="Type the email..." className={errors.email && "required-input"}
                                            value={form.email} name="email" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={errors.address1 && "required-label"}>Address 1&nbsp;<span className="required-label">*</span></Form.Label>
                                        <Form.Control type="text" size="lg" placeholder="Type the address 1..." className={errors.address1 && "required-input"}
                                            value={form.address1} name="address1" onChange={handleChange} />
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={errors.address2 && "required-label"}>Address 2&nbsp;<span className="required-label">*</span></Form.Label>
                                        <Form.Control type="text" size="lg" placeholder="Type the address 2..." className={errors.address2 && "required-input"}
                                            value={form.address2} name="address2" onChange={handleChange} />
                                    </Form.Group>
                                    <Row>
                                        <Col md={5}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className={errors.city && "required-label"}>City&nbsp;<span className="required-label">*</span></Form.Label>
                                                <Form.Control type="text" size="lg" placeholder="Type the city..." className={errors.city && "required-input"}
                                                    value={form.city} name="city" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className={errors.state && "required-label"}>State&nbsp;<span className="required-label">*</span></Form.Label>
                                                <Form.Control type="text" size="lg" placeholder="Type the state..." className={errors.state && "required-input"}
                                                    value={form.state} name="state" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label className={errors.zip && "required-label"}>Zip&nbsp;<span className="required-label">*</span></Form.Label>
                                                <NumericFormat className={"form-control form-control-lg " + (errors.zip && "required-input")}
                                                    placeholder="#####" value={form.zip} name="zip" onChange={handleChange} />
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                {form.cusId && !modals.invoice &&
                                    <Col md={3}>
                                        <Form.Group >
                                            <Form.Label className="mb-3">Status</Form.Label>
                                            <span className="switch"><Switch onChange={(e) => handleChange(e, "isActive")} checked={form.isActive} /></span>
                                        </Form.Group>
                                    </Col>}
                            </Row>
                        } { // View customer
                            modals.view && !modals.invoice &&
                            <Row>
                                <Col md={4}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name&nbsp;<span className="required-label">*</span></Form.Label>
                                        <span className="view-span">{modals.data?.name}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Phone&nbsp;<span className="required-label">*</span></Form.Label>
                                        <span className="view-span">{modals.data?.phone}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Email&nbsp;<span className="required-label">*</span></Form.Label>
                                        <span className="view-span">{modals.data?.email}</span>
                                    </Form.Group>
                                </Col>
                                <Col md={8}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address 1&nbsp;<span className="required-label">*</span></Form.Label>
                                        <span className="view-span">{modals.data?.address1}</span>
                                    </Form.Group>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Address 2</Form.Label>
                                        <span className="view-span">{modals.data?.address2 || "-"}</span>
                                    </Form.Group>
                                    <Row>
                                        <Col md={5}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>City&nbsp;<span className="required-label">*</span></Form.Label>
                                                <span className="view-span">{modals.data?.city}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col md={4}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>State&nbsp;<span className="required-label">*</span></Form.Label>
                                                <span className="view-span">{modals.data?.state}</span>
                                            </Form.Group>
                                        </Col>
                                        <Col md={3}>
                                            <Form.Group className="mb-3">
                                                <Form.Label>Zip&nbsp;<span className="required-label">*</span></Form.Label>
                                                <span className="view-span">{modals.data?.zip}</span>
                                            </Form.Group>
                                        </Col>
                                    </Row>
                                </Col>
                                <Row>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Status</Form.Label>
                                            <span className={"view-span " + isActiveStatus[Number(form.isActive)].color}>{isActiveStatus[Number(form.isActive)].text}</span>
                                        </Form.Group>
                                    </Col>
                                    <Col md={3}>
                                        <Form.Group className="mb-3">
                                            <Form.Label>Created</Form.Label>
                                            <span className="view-span">{form.created}</span>
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Col md={12}>
                                    <h5 className="head-table-modal mt-3">Invoices</h5>
                                    <div className="table-responsive">
                                        <DataTable
                                            columns={columnsInv}
                                            data={modals.data?.invoices || []}
                                            pagination
                                            striped
                                            noDataComponent={<NoData />}
                                            paginationComponentOptions={PaginationOptions}
                                        />
                                    </div>
                                </Col>
                            </Row>
                        }{ // View Invoice
                            !modals.view && modals.invoice &&
                            <div id="md-invoice">
                                <Row>
                                    <Col md={7}>
                                        <Button variant="danger" onClick={() => setModals({ ...modals, invoice: false, view: true })}>
                                            <i className={icons.arrowAltLeft}></i>&nbsp;&nbsp;Back
                                        </Button>
                                    </Col>
                                    <Col md={7}>
                                        <div className="cust-info">
                                            <p><strong>{modals.data?.name}</strong></p>
                                            <p>{modals.data?.phone}</p>
                                            <p>{`${modals.data?.address1}, ${modals.data?.address2}, ${modals.data?.city}, ${modals.data?.state}, ${modals.data?.zip}`}</p>
                                        </div>
                                    </Col>
                                    <Col md={5}>
                                        <div className="cust-info">
                                            <p><strong>Invoice #:</strong>&nbsp;&nbsp;{padStart(modals.data?.inv?.invId)}</p>
                                            <p><strong>Invoice Date:</strong>&nbsp;&nbsp;{momentTimeZone(modals.data?.inv?.createdAt, "MM/DD/YYYY")}</p>
                                            <p><strong>Invoice Time:</strong>&nbsp;&nbsp;{momentTimeZone(modals.data?.inv?.createdAt, "hh:mm A")}</p>
                                            <p><strong>Status:</strong>&nbsp;&nbsp;<span className={statusFormat[modals.data?.inv?.status].color}>{statusFormat[modals.data?.inv?.status].text}</span></p>
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
                                                        modals.data?.inv?.items &&
                                                        modals.data?.inv?.items.map((r, k) => {
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
                                                    <p>{modals.data?.inv?.note || "-"}</p>
                                                </div>
                                            </Col>
                                            <Col md={5}>
                                                <div className="cust-info">
                                                    <p><strong>Sub Total:</strong>&nbsp;&nbsp;{currency(modals.data?.inv?.subTotal, "$ ")}</p>
                                                    <p><strong>18% ITBIS:</strong>&nbsp;&nbsp;{currency(modals.data?.inv?.itbis, "$ ")}</p>
                                                    <p><strong>Grand Total:</strong>&nbsp;&nbsp;{currency(modals.data?.inv?.total, "$ ")}</p>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Row>
                            </div>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={() => setModals({ ...modals, customer: false })}>
                        <i className={icons.times}></i>&nbsp;&nbsp;Close
                    </Button>
                    {!modals.view && !modals.invoice &&
                        <Button variant="success" size="lg" type="button" onClick={handleSave}>
                            <i className={icons.save}></i>&nbsp;&nbsp;Save
                        </Button>}
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default View