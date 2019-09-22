import { observable, action, computed } from 'mobx';

import moviesStore from './moviesStore';

class EditorStore {

    @observable inProgress = false;
    @observable errors = undefined;
    @observable movieSlug = undefined;

    @observable title = '';
    @observable text = '';

    @observable categoriesRegistry = [];

    @computed get categoryIds() {
        return this.categoriesRegistry.map(c => { return(c.value) })
    }

    @action setMovieSlug(movieSlug) {
        if (this.movieSlug !== movieSlug) {
            this.reset();
            this.movieSlug = movieSlug;
        }
    }

    @action loadInitialData() {
        if (!this.movieSlug) return Promise.resolve();

        this.inProgress = true;

        return moviesStore.loadMovie(this.movieSlug, {acceptCached: true})
            .then(action((movie) => {
                if (!movie) throw new Error('Can\'t load original movie');

                this.title = movie.title;
                this.text = movie.text;

                this.categoriesRegistry = movie.categories.map(c => {
                    return({ value: c.id, label: c.name })}
                );
            }))
            .finally(action(() => {
                this.inProgress = false;
            }));
    }

    @action reset() {
        this.title = '';
        this.text = '';
        this.categoriesRegistry = [];
    }

    @action setTitle(title) {
        this.title = title;
    }

    @action setText(text) {
        this.text = text;
    }

    @action setCategories(categories) {
        this.categoriesRegistry = categories
    }

    @action submit() {
        this.inProgress = true;
        this.errors = undefined;

        const movie = {
            title: this.title,
            text: this.text,
            categoryIds: this.categoryIds,
            slug: this.movieSlug,
        };

        return (this.movieSlug ? moviesStore.updateMovie(movie) : moviesStore.createMovie(movie))
            .catch(action((err) => {
                this.errors = err.response && err.response.body && err.response.body.errors;
                throw err;
            }))
            .finally(action(() => {
                this.inProgress = false;
            }));
    }
}

export default new EditorStore();
