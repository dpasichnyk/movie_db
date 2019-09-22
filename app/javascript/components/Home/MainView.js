import MovieList from '../MovieList';
import Search from '../Search';

import React from 'react';
import { inject, observer } from 'mobx-react';
import { debounce } from 'lodash';
import { Link } from 'react-router-dom';

@inject('moviesStore')
@observer
export default class MainView extends React.Component {

    componentDidMount() {
        this.props.moviesStore.loadMovies();
    }

    handleCategoryRemove = (category, event) => {
        event.preventDefault();
        this.props.moviesStore.removeCategory(category);
        this.props.moviesStore.loadMovies();
    };

    handleRatingRemove = (rating, event) => {
        event.preventDefault();
        this.props.moviesStore.removeRating(rating);
        this.props.moviesStore.loadMovies(rating)
    };

    handleSetPage = page => {
        this.props.moviesStore.setPage(page);
        this.props.moviesStore.loadMovies();
    };

    handleSearch = debounce((searchQuery) => {
        this.props.moviesStore.setSearchQuery(searchQuery);
        this.props.moviesStore.loadMovies();
    }, 1000);

    render() {
        const { movies, isLoading, currentPage, totalPagesCount, selectedCategories, selectedRatings } = this.props.moviesStore;

        return (
            <div className='col-md-9 mt-3'>
                <div className='row'>
                    <Search onSearch={this.handleSearch}/>
                </div>

                <div className='row'>
                    <div className='col-md-10'>
                        <div className='row'>
                            {
                                selectedRatings.map(rating => {
                                    return (
                                        <div className="badge badge-light" key={rating.flooredRating}>
                                            <Link to="#" onClick={this.handleRatingRemove.bind(this, rating)}>
                                                {rating.flooredRating} Stars
                                                <i className="fa fa-close" />
                                            </Link>
                                        </div>
                                    );
                                })
                            }
                        </div>
                        <div className='row'>
                            {
                                selectedCategories.map(category => {
                                    return (
                                        <div className="badge badge-light" key={category.slug}>
                                            <Link to="#" onClick={this.handleCategoryRemove.bind(this, category)}>
                                                {category.name}<i className="fa fa-close"/>
                                            </Link>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                    <div className='col-md-2'>
                        <span className='pull-right'>
                            <Link to='/editor' className='btn btn-outline-primary btn-sm fa fa-plus mb-1' />
                        </span>
                    </div>
                </div>

                <div className='row'>
                    <MovieList
                        movies={movies}
                        loading={isLoading}
                        totalPagesCount={totalPagesCount}
                        currentPage={currentPage}
                        onSetPage={this.handleSetPage}
                    />
                </div>
            </div>
        );
    }
};