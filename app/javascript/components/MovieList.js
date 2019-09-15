import LoadingSpinner from './LoadingSpinner';
import MoviePreview from './MoviePreview';
import Pagination from './Pagination';

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

            <Pagination currentPage={props.currentPage} totalPagesCount={props.totalPagesCount} onSetPage={props.onSetPage}  />
        </div>
    );
};

export default MovieList;