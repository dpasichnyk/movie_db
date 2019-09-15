import MoviePreview from './MoviePreview';
import LoadingSpinner from './LoadingSpinner';
import React from 'react';

const MovieList = props => {
    if (props.loading && props.movies.length === 0) {
        return (
            <LoadingSpinner />
        );
    }

    if (props.movies.size === 0) {
        return (
            <div>
                No movies here, yet.
            </div>
        );
    }

    return (
        <div>
            {
                props.movies.map(movie => {
                    return (
                        <MoviePreview movie={movie} key={movie.slug}/>
                    );
                })
            }
        </div>
    );
};

export default MovieList;