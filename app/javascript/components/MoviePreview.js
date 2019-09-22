import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Rating from 'react-rating';

import Actions from './Movie/Actions'

@inject('moviesStore', 'userStore')
@withRouter
@observer
export default class MoviePreview extends React.Component {

    handleRatingChange = (slug, value) => {
        this.props.moviesStore.createRating(slug, value)
    };

    handleDeleteMovie = slug => {
        this.props.moviesStore.deleteMovie(slug)
            .then(() => this.props.history.replace('/'));
    };

    render() {
        const { currentUser } = this.props.userStore;
        const { movie } = this.props;

        const canModify = currentUser && currentUser.id === movie.user.id;

        return (
            <div className='card mb-3 movie-preview'>
                <div className='card-header'>
                    <div className='row'>
                        <div className='col col-md-8'>
                            <Link to={`/movie/${movie.slug}`} className='preview-link'>
                                <h5>{movie.title}</h5>
                            </Link>

                            <span className='small font-italic'>{new Date(movie.createdAt).toDateString()}, by <b>{movie.user.name}</b></span>
                        </div>

                        <div className='col col-md-4'>
                            <div className='pull-right'>
                                <Rating
                                    initialRating={movie.ratingValue}
                                    onChange={this.handleRatingChange.bind(this, movie.slug)}
                                    readonly={!this.props.userStore.currentUser}
                                    emptySymbol='fa fa-star-o regular'
                                    fullSymbol='fa fa-star solid'
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card-body'>
                    <p className='card-text'>{movie.text.substr(0, 100) + '...'}</p>

                    <div className='pull-right'>
                        <Actions
                            canModify={canModify}
                            movie={movie}
                            onDelete={this.handleDeleteMovie.bind(this)}
                        />
                    </div>
                </div>
            </div>

        );
    }
}