import { observable, action, computed } from 'mobx';
import agent from '../agent';

export class MoviesStore {

    @observable isLoading = false;
    @observable moviesRegistry = observable.map();

    @computed get movies() {
        return Object.values(this.moviesRegistry.toJSON());
    };

    clear() {
        this.moviesRegistry.clear();
    }

    getMovie(slug) {
        return this.moviesRegistry.get(slug);
    }

    $req() {
        return agent.Movies.all();
    }

    @action loadMovie(slug, { acceptCached = false } = {}) {
        const movie = this.getMovie(slug);
        if (movie) return Promise.resolve(movie);

        this.isLoading = true;
        return agent.Movies.get(slug)
            .then(action(( movie ) => {
                this.moviesRegistry.set(movie.slug, movie);
                return movie;
            }))
            .finally(action(() => { this.isLoading = false; }));
    }

    @action loadMovies() {
        this.isLoading = true;

        return this.$req()
            .then(action(({ movies, moviesCount }) => {
                this.moviesRegistry.clear();
                movies.forEach(movie => this.moviesRegistry.set(movie.slug, movie));
            }))
            .finally(action(() => { this.isLoading = false; }));
    }
}

export default new MoviesStore();