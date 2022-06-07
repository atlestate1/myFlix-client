import React, { useState } from 'react';
import PropTypes from 'prop-types';
import MainView from "../main-view/main-view";
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Form, FormGroup, Button, Row, Col, Container } from 'react-bootstrap';

export function LoginView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [submitClick, setSubmitClick] = useState(false)

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(props.username, password);
        /* Send a request to the server for authentication */
        /* then call props.onLoggedIn(username) */
        props.onLoggedIn(username);
        setSubmitClick(true)
    };

    const handleRegister = (e) => {
        e.preventDefault()
        props.onRegister(false)
    }

    if (submitClick) {
        return (
            <MainView></MainView>
        )
    }
    return (
        <Form>
            <Form.Group controlId="formUsername">
                <Form.Label>Username:</Form.Label>
                <Form.Control type="text" onChange={e => setUsername(e.target.value)} />
            </Form.Group>

            <Form.Group controlId="formPassword">
                <Form.Label>Password:</Form.Label>
                <Form.Control type="password" onChange={e => setPassword(e.target.value)} />
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Submit
            </Button>
        </Form>
    );
}

LoginView.propTypes = {
    user: PropTypes.shape({
        username: PropTypes.string.isRequired,
        password: PropTypes.string.isRequired,
    }),
    onLoggedIn: PropTypes.func.isRequired,
    onRegister: PropTypes.func.isRequired
};