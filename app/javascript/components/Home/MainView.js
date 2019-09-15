import MovieList from '../MovieList';
import Search from '../Search';

import React from 'react';
import { inject, observer } from 'mobx-react';
import { debounce } from 'lodash';

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