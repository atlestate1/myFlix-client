import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Button, Col, Container, Row } from 'react-bootstrap';


export function ProfileView(props) {
    const [user, setUser] = useState(props.user);
    const [movies, setMovies] = useState(props.movies);
    const [favoriteMovies, setFavoriteMovies] = useState([]);
    const currentUser = localStorage.getItem('user');
    const token = localStorage.getItem('token');

    const getUser = () => {
        axios.get(`https://movieapi-database.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                setUser(response.data);
                setFavoriteMovies(response.data.FavoriteMovies)
            })
            .catch(error => console.error(error))
    }

    useEffect(() => {
        getUser();
    }, [])

    const updateUser = () => {
        let token = localStorage.getItem('token');
        let user = localStorage.getItem("user");
        axios.put(`https://movieapi-database.herokuapp.com/users/${user}`, {
            username: username,
            email: email, //Email is a variable which holds the email
            birthday: birthday,
            password: password
        },
            {
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).then((response) => {
                alert('Your profile has been updated');
                localStorage.setItem('user', response.data.username),
                    console.log(response.data)
            })
            .catch(e => {
                console.log('Error')
            });
    }



    const handleDelete = () => {
        axios.delete(`https://movieapi-database.herokuapp.com/users/${currentUser}`, {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(() => {
                alert(`The account ${user.username} was successfully deleted.`)
                localStorage.clear();
                window.open('/register', '_self');
            }).
            catch(error => console.error(error))
    }

    return (
        <Container id="profile-form">
            <Row><h4>Your profile</h4></Row>
            <Row>
                <Col className="label">Username:</Col>
                <Col className="value">{user.username}</Col>
            </Row>
            <Row className="mt-3">
                <Col className="label">Password:</Col>
                <Col className="value">******</Col>
            </Row>
            <Row className="mt-3">
                <Col className="label">Email:</Col>
                <Col className="value">{user.email}</Col>
            </Row>
            <Row className="mt-3">
                <Col className="label">Birthday:</Col>
                <Col className="value">{user.birthday}</Col>
            </Row>
            <Row className="mt-5"><h4>Your favorite movies</h4></Row>
            <Row className="mt-3">
                <favoriteMovies
                    movies={movies}
                    favoriteMovies={favoriteMovies}
                    currentUser={currentUser}
                    token={token} />
            </Row>
            <Button onClick={updateUser}>Update your profile</Button>
            <Button className="d-block mt-5" variant="danger" onClick={handleDelete}>Deactivate</Button>
        </Container>
    )
}