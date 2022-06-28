import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Card, CardGroup, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';
import { Link } from 'react-router-dom';

export function RegistrationView(props) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [birthday, setBirthday] = useState('');
    const [email, setEmail] = useState('');
    const [usernameErr, setUsernameErr] = useState('');
    const [passwordErr, setPasswordErr] = useState('');
    const [birthdayErr, setBirthdayErr] = useState('');
    const [emailErr, setEmailErr] = useState('');

    const validate = () => {
        let isReq = true;
        if (!username) {
            setUsernameErr('Username Required');
            isReq = false;
        } else if (username.length < 2) {
            setUsernameErr('Username must be 2 characters long');
            isReq = false;
        }
        if (!password) {
            setPasswordErr('Password Required');
            isReq = false;
        } else if (password.length < 6) {
            setPassword('Password must be 6 characters long');
            isReq = false;
        }
        if (!email) {
            setEmailErr("Add Email");
            isReq = false;
        } else if (email.indexOf("@") === -1) {
            setEmail("Email must be a valid email address");
            isReq = false;
        }

        return isReq;
    };

    const handleRegister = (e) => {
        e.preventDefault();
        const isReq = validate();
        if (isReq) {
            /* Send request to the server for authentication */
            axios.post('https://movieapi-database.herokuapp.com/users', {
                username: username,
                password: password,
                email: email,
                birthday: birthday

            })
                .then(response => {
                    const data = response.data;
                    console.log(data);
                    window.open('/', '_self'); //the second argument '_self is necessary so that the page will open in the current tab //
                    alert("You have successfully registered!")
                    props.onLoggedIn(data);
                })
                .catch(e => {
                    console.log('error registering user')
                });
        }
    };

    return (
        <Row>
            <Col>
                <CardGroup>
                    <Card>
                        <Card.Body>
                            <Form onSubmit={handleRegister}>
                                <Form.Group controlId="formUsername">
                                    <Form.Label>Username:</Form.Label>
                                    <Form.Control type="text" placeholder="Enter username" value={username} onChange={e => setUsername(e.target.value)} />
                                    {/* code added here to display validation error */}
                                    {usernameErr && <p>{usernameErr}</p>}
                                </Form.Group>
                                <Form.Group controlId="formPassword">
                                    <Form.Label>Password:</Form.Label>
                                    <Form.Control type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                                    {/* code added here to display validation error */}
                                    {passwordErr && <p>{passwordErr}</p>}
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
                                <Button variant="primary" type="submit">Submit</Button>
                                <Link to="/">
                                    <Button variant="primary">Back</Button>
                                </Link>
                            </Form>
                        </Card.Body>
                    </Card>
                </CardGroup>
            </Col>
        </Row>

    );
};