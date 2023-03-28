import React from "react"
import "./style.css"
import { footer } from '../../library/const'
import { Button, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'

const View = (props) => {

    const { form, errors, handleChange, handleSignIn } = props

    return (
        <>
            <section className="vh-100" id="sign-in">
                <Container className="py-5 h-100">
                    <Row className="d-flex align-items-center justify-content-center h-100">
                        <Col md={5} lg={5} xl={5} sm={12}>
                            <div className="card mb-3">
                                <div className="card-body">
                                    <div className="logo-sign-in">
                                        <img src={require('../../assets/img/logo700x160.png')} width={312} className="img-fluid" alt="MofetaPOS Logo" />
                                    </div>
                                    <p className="title-sign-in">Log in to your account</p>
                                    <Form>
                                        <Form.Group className="mb-3">
                                            <Form.Label className={errors.username && "required-label"}>Username</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text className={errors.username && "required-input"}><i className="fas fa-user"></i></InputGroup.Text>
                                                <Form.Control className={errors.username && "required-input"} type="text" size="lg" placeholder="Type your username..."
                                                    value={form.username} name="username" onChange={handleChange} />
                                            </InputGroup>
                                        </Form.Group>

                                        <Form.Group className="mb-3">
                                            <Form.Label className={errors.password && "required-label"}>Password</Form.Label>
                                            <InputGroup className="mb-3">
                                                <InputGroup.Text className={errors.password && "required-input"}><i className="fas fa-lock"></i></InputGroup.Text>
                                                <Form.Control className={errors.password && "required-input"} type="text" size="lg" placeholder="Type your password..."
                                                    value={form.password} name="password" onChange={handleChange} />
                                            </InputGroup>
                                        </Form.Group>
                                        <div className="d-grid gap-2">
                                            <Button variant="success" size="lg" type="button" onClick={handleSignIn}>
                                                <i className="fas fa-sign-in-alt"></i>&nbsp;&nbsp;Log In
                                            </Button>
                                        </div>
                                    </Form>
                                    <p className="footer-sign-in">{footer}</p>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </section>
        </>
    );
}

export default View;