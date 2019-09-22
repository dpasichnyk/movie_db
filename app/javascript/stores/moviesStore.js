import { observable, action, computed } from 'mobx';
import agent from '../agent';

export class MoviesStore {

    @observable isLoading = false;
    @observable moviesRegistry = observable.map();
    @observable currentPage = 1;
    @observable totalPagesCount = 1;
    @observable searchQuery = "";

    @computed get movies() {
        return Object.values(this.moviesRegistry.toJSON());
    };

    clear() {
        this.moviesRegistry.clear();
        this.totalPagesCount = 1;
        this.currentPage = 1;
    }

    getMovie(slug) {
        return this.moviesRegistry.get(slug);
    }

    $req() {
        return agent.Movies.all(this.currentPage, this.searchQuery);
    }

    @action createMovie(movie) {
        return agent.Movies.create(movie)
            .then(( movie ) => {
                this.moviesRegistry.set(movie.slug, movie);
                return movie;
            })
    }

    @action createRating(slug, value) {
        return agent.Ratings.create(slug, value)
            .then(() => this.loadMovie(slug))
            .catch(action(err => {
                if (err.status === 409) {
                    this.loadMovies();
                }
            }))
            .finally(action(() => { this.isLoading = false; }));
    }

    @action deleteMovie(slug) {
        this.moviesRegistry.delete(slug);
        return agent.Movies.del(slug)
            .catch(action(err => { this.loadMovies(); throw err; }));
    }

    @action loadMovie(slug) {
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
            .then(action(({ movies, moviesCount, pages, page }) => {
                this.moviesRegistry.clear();
                movies.forEach(movie => this.moviesRegistry.set(movie.slug, movie));
                this.currentPage = page;
                this.totalPagesCount = pages;
            }))
            .finally(action(() => { this.isLoading = false; }));
    }

    @action setSearchQuery(query) {
        this.clear();
        this.searchQuery = query;
    }

    @action setPage(page) {
        this.currentPage = page;
    }

    @action updateMovie(data) {
        return agent.Movies.update(data)
            .then(movie => {
                this.moviesRegistry.set(movie.slug, movie);
                return movie;
            })
    }
}

export default new MoviesStore();