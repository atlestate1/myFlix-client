import React from 'react';
import { MovieCard } from '../movie-card/movie-card';
import { MovieView } from '../movie-view/movie-view';

export class MainView extends React.Component {

    constructor() {
        super();
        this.state = {
            movies: [
                {
                    _id: 1, Title: 'Inception', Description: 'An action film about a thief who has the ability to enter peoples dreams and steal their secrets from their subconscious.',
                    Genre: 'Action', Director: 'Christopher Nolan', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMjExMjkwNTQ0Nl5BMl5BanBnXkFtZTcwNTY0OTk1Mw@@._V1_.jpg'
                },
                {
                    _id: 2, Title: 'The Shawshank Redemption', Description: 'A film about a man wrongfully convicted of killing his wife and her lover and his tough time in prison.',
                    Genre: 'Drama', Director: 'Frank Darabont', ImagePath: 'https://m.media-amazon.com/images/I/519NBNHX5BL._SY445_.jpg'
                },
                {
                    _id: 3, Title: 'Gladiatior', Description: 'The story of a once-powerful general forced to become a common gladiator.',
                    Genre: 'Action', Director: 'Ridley Scott', ImagePath: 'https://m.media-amazon.com/images/M/MV5BMDliMmNhNDEtODUyOS00MjNlLTgxODEtN2U3NzIxMGVkZTA1L2ltYWdlXkEyXkFqcGdeQXVyNjU0OTQ0OTY@._V1_.jpg'
                }
            ],
            selectedMovie: null
        };
    }

    setSelectedMovie(newSelectedMovie) {
        this.setState({
            selectedMovie: newSelectedMovie
        });
    }

    render() {
        const { movies, selectedMovie } = this.state;


        if (movies.length === 0) return <div className="main-view">The list is empty!</div>;

        return (
            <div className="main-view">
                {selectedMovie
                    ? <MovieView movie={selectedMovie} onBackClick={newSelectedMovie => { this.setSelectedMovie(newSelectedMovie); }} />
                    : movies.map(movie => (
                        <MovieCard key={movie._id} movie={movie} onMovieClick={(movie) => { this.setSelectedMovie(movie) }} />
                    ))
                }
            </div>
        );
    }

}