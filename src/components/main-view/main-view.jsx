import React from 'react';
import axios from 'axios';

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
        axios.get('https://movieapi-database.herokuapp.com/movies')
            .then(response => {
                this.setState({
                    movies: response.data
                });
            })
            .catch(error => {
                console.log(error);
            });
    }


    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    /*When a user successfully logs in, this function updates the user property in state to that
    particular */

    onLoggedIn(user) {
        this.setState({
            user: user
        });
    }

    onRegister(registered) {
        this.setState({
            registered: registered
        });
    }

    render() {
        const { movies, selectedMovie, user, registered } = this.state;

        /*If there is no user, the LoginView is rendered. If there is a user logged in, the user details
        are passed as a prop to the LoginView.*/

        if (!registered) return <RegistrationView onRegister={this.onRegister} />;

        if (!user) return <LoginView onLoggedIn={this.onLoggedIn} onRegister={this.onRegister} />;

        if (movies.length === 0) return <div className="main-view" />;

        return (
            <Row className="main-view justify-content-md-left">
                {selectedMovie
                    ? (
                        <Col md={8}>
                            <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    )
                    : movies.map(movie => (
                        <Col md={3}>
                            <MovieCard key={movie._id} movie={movie} onMovieClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                        </Col>
                    ))
                }
            </Row>
        );

    }
}

MainView.propTypes = {}; 