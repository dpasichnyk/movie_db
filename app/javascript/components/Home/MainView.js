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

    handleSetPage = page => {
        this.props.moviesStore.setPage(page);
        this.props.moviesStore.loadMovies();
    };

    handleSearch = debounce((searchQuery) => {
        this.props.moviesStore.setSearchQuery(searchQuery);
        this.props.moviesStore.loadMovies();
    }, 1000);

    render() {
        const { movies, isLoading, currentPage, totalPagesCount } = this.props.moviesStore;

        return (
            <div className='col-md-9 mt-3'>
                <Search onSearch={this.handleSearch} />

                <div className='row'>
                    <div className='col-md-8'>

                    </div>
                    <div className='col-md-4'>
                        <span className='pull-right'>
                            <Link to='/editor' className='btn btn-outline-primary btn-sm fa fa-plus mb-1' />
                        </span>
                    </div>
                </div>

                <MovieList
                    movies={movies}
                    loading={isLoading}
                    totalPagesCount={totalPagesCount}
                    currentPage={currentPage}
                    onSetPage={this.handleSetPage}
                />
            </div>
        );
    }
};