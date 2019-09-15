import MovieList from '../MovieList';
import React from 'react';
import { inject, observer } from 'mobx-react';

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

    render() {
        const { movies, isLoading, currentPage, totalPagesCount } = this.props.moviesStore;

        return (
            <div className='col-md-9'>
                <div>
                    <ul>
                        Movie filters here
                    </ul>
                </div>

                <MovieList
                    movies={movies}
                    loading={isLoading}
                    totalPagesCount={totalPagesCount}
                    currentPage={currentPage}
                    onSetPage={this.handleSetPage} />
            </div>
        );
    }
};