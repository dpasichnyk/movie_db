import React from 'react';
import { Link } from 'react-router-dom';
import { inject, observer } from 'mobx-react';
import Rating from 'react-rating';

@inject('moviesStore', 'userStore')
@observer
export default class MoviePreview extends React.Component {

    onRatingChange = (slug, value) => {
        this.props.moviesStore.createRating(slug, value)
    };

    render() {
        const { movie } = this.props;

        return (
            <div className='card mb-3 movie-preview'>
                <div className='card-header'>
                    <div className='row'>
                        <div className='col col-md-8'>
                            <Link to={`/movie/${movie.slug}`} className='preview-link'>
                                <h5>{movie.title}</h5>
                            </Link>
                        </div>

                        <div className='col col-md-4'>
                            <div className='well well-sm pull-right'>
                                <Rating
                                    initialRating={movie.rating_value}
                                    onChange={this.onRatingChange.bind(this, movie.slug)}
                                    readonly={!this.props.userStore.currentUser}
                                    emptySymbol='fa fa-star-o regular'
                                    fullSymbol='fa fa-star solid'
                                />
                                <pre>{new Date(movie.created_at).toDateString()}, by <b>{movie.user.name}</b></pre>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='card-body'>
                    <p className='card-text'>{movie.text.substr(0, 100) + '...'}</p>
                </div>
            </div>

        );
    }
}