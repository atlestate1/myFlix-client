import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainView from "../main-view/main-view";
import { Form, Button, Row, Col, Container, Card, CardGroup } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import axios from 'axios';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitClick, setSubmitClick] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('https://movieapi-database.herokuapp.com/login', {
            username: username,
            password: password
        })
            .then(response => {
                const data = response.data;
                props.onLoggedIn(data);
            })
            .catch(e => {
                console.log('no such user')
            });
    };

    return (
        <Row>
            <Col>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Card.Title>Welcome To MyFlix Premier Movie App!</Card.Title>
                            <Form onSubmit={handleSubmit}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" onChange={e => setUsername(e.target.value)}
                                        placeholder="Username" />
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" onChange={e => setPassword(e.target.value)}
                                        placeholder="Password" />
                                </Form.Group><br></br>

                                <Button variant="primary" type="submit">Submit</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>
    );
};