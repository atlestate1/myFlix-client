import React from 'react';
import axios from 'axios';

import { BrowserRouter as Router, Route } from "react-router-dom";

import { RegistrationView } from '../registration-view/registration-view';
import { LoginView } from '../login-view/login-view';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [],
            selectedMovie: null,
            user: null,
            registered: true
        };
        this.onLoggedIn = this.onLoggedIn.bind(this)
        this.onRegister = this.onRegister.bind(this)
    }

    componentDidMount() {
        let accessToken = localStorage.getItem('token');
        if (accessToken !== null) {
            this.setState({
                user: localStorage.getItem('user')
            });
            this.getMovies(accessToken);
        }
    }

    /*When a user successfully logs in, this function updates the user property in state to that
    particular */

    getMovies(token) {
        axios.get('https://movieapi-database.herokuapp.com/movies', {
            headers: { Authorization: `Bearer ${token}` }
        })
            .then(response => {
                // Assign the result to the state
                this.setState({
                    movies: response.data
                });
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    onLoggedIn(authData) {
        console.log(authData);
        this.setState({
            user: authData.user.Username
        });

        localStorage.setItem('token', authData.token);
        localStorage.setItem('user', authData.user.Username);
        this.getMovies(authData.token);
    }

    onLoggedOut() {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        this.setState({
            user: null
        });
    }

    onRegister(registered) {
        this.setState({
            registered: registered
        });
    }

    render() {
        const { movies, user } = this.state;

        /*If there is no user, the LoginView is rendered. If there is a user logged in, the user details
        are passed as a prop to the LoginView.*/

        if (!registered) return <RegistrationView onRegister={this.onRegister} />;

        if (!user) return <LoginView onLoggedIn={this.onLoggedIn} onRegister={this.onRegister} />;

        if (movies.length === 0) return <div className="main-view" />;
        <button onClick={() => { this.onLoggedOut() }}>Logout</button>

        return (
            <Router>
                <Row className="main-view justify-content-md-center">
                    <Route exact path="/" render={() => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return movies.map(m => (
                            <Col md={4} key={m._id}>
                                <MovieCard movie={m} />
                            </Col>
                        ))
                    }} />
                    <Route path="/register" render={() => {
                        if (user) return <Redirect to="/" />
                        return <Col>
                            <RegistrationView />
                        </Col>
                    }} />
                    <Route path="/movies/:movieId" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <MovieView movie={movies.find(m => m._id === match.params.id)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/directors/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <DirectorView director={movies.find(m => m.Director.Name === match.params.name)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path="/genres/:name" render={({ match, history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <GenreView genre={movies.find(m => m.Genre.Name === match.params.name)} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                    <Route path={`/users/${user}`} render={({ history }) => {
                        if (!user) return <Col>
                            <LoginView onLoggedIn={user => this.onLoggedIn(user)} />
                        </Col>
                        if (movies.length === 0) return <div className="main-view" />;
                        return <Col md={8}>
                            <ProfileView movies={movies} user={user} onBackClick={() => history.goBack()} />
                        </Col>
                    }} />
                </Row>
            </Router>

        );
    }
}
MainView.propTypes = {}; 