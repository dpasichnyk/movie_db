import React from 'react';
import { inject, observer } from 'mobx-react';

@inject('moviesStore')
@observer
export default class Movie extends React.Component {

  componentDidMount() {
    const slug = this.props.match.params.id;
    this.props.moviesStore.loadMovie(slug, { acceptCached: true });
  }

  render() {
    const slug = this.props.match.params.id;
    const movie = this.props.moviesStore.getMovie(slug);

    if (!movie) return(<h2>Can't load movie</h2>);

    return (
        <div className='movie-page'>
          <div className='container'>
            <h1>{movie.title}</h1>
          </div>

          <div className='container'>
            <div className='row'>
              <div className='col-xs-12'>
                {
                  movie.categories.map(category => {
                    return (
                        <span className='badge badge-pill badge-primary' key={category.slug}>
                        <u>{category.name}</u>
                      </span>
                    );
                  })
                }
              </div>
            </div>
          </div>
        </div>
    );
  }
}
