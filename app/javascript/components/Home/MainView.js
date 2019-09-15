import MovieList from '../MovieList';
import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('moviesStore')
@observer
export default class MainView extends React.Component {

    componentDidMount() {
        this.props.moviesStore.loadMovies();
    }

    render() {
        const { movies, isLoading } = this.props.moviesStore;

        return (
            <div className='col-md-9'>
                <div>
                    <ul>
                        Movie filters here
                    </ul>
                </div>

                <MovieList movies={movies} loading={isLoading} />
            </div>
        );
    }
};