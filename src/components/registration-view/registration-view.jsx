import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(username, password, birthday, email);
        props.onRegister(true);
    };

    return (
        <Container>
            <Row>
                <Col>
                    <CardGroup>
                        <Card>
                            <Card.Body>
                                <Form>
                                    <Form.Group controlId="formUsername">
                                        <Form.Label>Username:</Form.Label>
                                        <Form.Control type="text" onChange={e => setUsername(e.target.value)}
                                            required
                                            placeholder="Username" />
                                    </Form.Group>
                                    <Form.Group controlId="formPassword">
                                        <Form.Label>Password:</Form.Label>
                                        <Form.Control type="password" onChange={e => setPassword(e.target.value)}
                                            required minLength="8"
                                            placeholder="Password must be at least 8 characters" />
                                    </Form.Group>
                                    <Form.Group controlId="formEmail">
                                        <Form.Label>Email:</Form.Label>
                                        <Form.Control type="email" onChange={e => setEmail(e.target.value)}
                                            required
                                            placeholder="your@email.com" />
                                    </Form.Group>
                                    <Form.Group controlId="formBirthday">
                                        <Form.Label>Birthday:</Form.Label>
                                        <Form.Control type="birthday" onChange={e => setBirthday(e.target.value)}
                                            required
                                            placeholder="Birthday" />
                                    </Form.Group><br></br>
                                    <Button variant="primary" type="submit" onClick={handleSubmit}>
                                        Submit
                                    </Button>
                                </Form>
                            </Card.Body>
                        </Card>
                    </CardGroup>
                </Col>
            </Row>
        </Container>

    );
}

RegistrationView.propTypes = {
    onRegister: PropTypes.func.isRequired,
};