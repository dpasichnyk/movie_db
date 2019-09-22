import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

const Ratings = props => {
    const ratings = props.ratings;

    if (ratings) {
        return (
            <ul className='nav flex-column'>
                {
                    ratings.map(rating => {
                        return (
                            <li className="nav-item" key={rating.flooredRating}>
                                <Link to="#" onClick={props.onRatingClick.bind(this, rating)}>
                                    {rating.flooredRating} Stars ({rating.moviesCount})
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    } else {
        return (
            <LoadingSpinner />
        );
    }
};

export default Ratings;