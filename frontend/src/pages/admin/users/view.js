import React from "react"
import { NoData, Footer, Header, Sidebar } from "../../../components"
import DataTable from 'react-data-table-component'
import { Button, Card, Col, Form, InputGroup, Modal, Row } from "react-bootstrap"
import { isActiveStatus, PaginationOptions } from "../../../library/const"
import Switch from "react-switch"
import { icons } from '../../../library/const'

const View = (props) => {

    const { columnsCustomers, search, form, users, handleChange, modals, errors, handleSave, setModals } = props,
        filteredCustomers = (users?.users || []).filter(({ name, username }) => {
            const lowerCaseSearch = search.toLowerCase()
            return ((name && name.toLowerCase().includes(lowerCaseSearch)) || (username && username.toLowerCase().includes(lowerCaseSearch)))
        }).reverse()

    return (
        <>
            <Header />
            <Sidebar />
            <main id="main" className="main">
                <div className="pagetitle">
                    <h1><i className="fas fa-users-cog"></i>&nbsp;&nbsp;User List</h1>
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
                                                placeholder="Search by name or username..." />
                                        </InputGroup>
                                    </Col>
                                    <Col>
                                        <Button variant="info" type="button" size="lg" onClick={() => setModals({ ...modals, users: true, icon: icons.userPlus, title: "Add User" })}>
                                            <i className={icons.userPlus}></i>&nbsp;&nbsp;New User
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

            {/* Modal view, add or edit user */}
            <Modal backdrop="static" keyboard={false} show={modals.users} onHide={() => setModals({ ...modals, users: false })}>
                <Modal.Header closeButton>
                    <Modal.Title><i className={modals.icon}></i>&nbsp;&nbsp;{modals.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        {   // Add or edit user
                            !modals.view &&
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={errors.name && "required-label"}>Name&nbsp;<span className="required-label">*</span></Form.Label>
                                        <Form.Control className={errors.name && "required-input"} type="text" size="lg" placeholder="Type the name..."
                                            value={form.name} name="name" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label className={errors.username && "required-label"}>Username&nbsp;<span className="required-label">*</span></Form.Label>
                                        <Form.Control className={errors.username && "required-input"} type="text" size="lg" placeholder="Type the user..."
                                            disabled={form.uid} value={form.username} name="username" onChange={handleChange} />
                                    </Form.Group>
                                </Col>
                                {
                                    !form.uid &&
                                    <Col md={6}>
                                        <Form.Group className="mb-3">
                                            <Form.Label className={errors.password && "required-label"}>Password&nbsp;<span className="required-label">*</span></Form.Label>
                                            <Form.Control type="password" className={errors.password && "required-input"} size="lg" placeholder="Type the password..."
                                                value={form.password} name="password" onChange={handleChange} />
                                            <small className="small-label">Must have 6 characters minimum</small>
                                        </Form.Group>
                                    </Col>
                                }
                                {form.uid &&
                                    <Col md={3}>
                                        <Form.Group >
                                            <Form.Label className="mb-3">Status</Form.Label>
                                            <span className="switch"><Switch onChange={(e) => handleChange(e, "isActive")} checked={form.isActive} /></span>
                                        </Form.Group>
                                    </Col>}
                            </Row>
                        } { // View user
                            modals.view &&
                            <Row>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Name</Form.Label>
                                        <span className="view-span">{form.name}</span>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Username</Form.Label>
                                        <span className="view-span">{form.username}</span>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Status</Form.Label>
                                        <span className={"view-span " + isActiveStatus[Number(form.isActive)].color}>{isActiveStatus[Number(form.isActive)].text}</span>
                                    </Form.Group>
                                </Col>
                                <Col md={6}>
                                    <Form.Group className="mb-3">
                                        <Form.Label>Created</Form.Label>
                                        <span className="view-span">{form.created}</span>
                                    </Form.Group>
                                </Col>
                            </Row>
                        }
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" size="lg" onClick={() => setModals({ ...modals, users: false })}>
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