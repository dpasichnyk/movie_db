import React from 'react';
import { inject, observer } from 'mobx-react';

import Actions from "./Actions";

@inject('moviesStore', 'userStore')
@observer
export default class Movie extends React.Component {

    componentDidMount() {
        const slug = this.props.match.params.id;
        this.props.moviesStore.loadMovie(slug, {acceptCached: true});
    }

    handleDeleteMovie = slug => {
        this.props.moviesStore.deleteMovie(slug)
            .then(() => this.props.history.replace('/'));
    };

    render() {
        const { currentUser } = this.props.userStore;
        const slug = this.props.match.params.id;
        const movie = this.props.moviesStore.getMovie(slug);

        if (!movie) return (<h2>Can't load movie</h2>);

        const canModify = currentUser && currentUser.id === movie.user.id;

        return (
            <div className='movie-page'>
                <div className='container'>
                    <h1>{movie.title}</h1>
                    <Actions canModify={canModify} movie={movie} onDelete={this.handleDeleteMovie} />
                </div>
            </div>
        );
    }
}
