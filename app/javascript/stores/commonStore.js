import { observable, action, computed, reaction } from 'mobx';
import agent from '../agent';

class CommonStore {

    @observable appName = 'Movie DB';
    @observable appLoaded = false;

    @observable categoriesRegistry = observable.map();
    @observable isLoadingCategories = false;

    @observable token = window.localStorage.getItem('jwt');

    constructor() {
        reaction(
            () => this.token,
            token => {
                if (token) {
                    window.localStorage.setItem('jwt', token);
                } else {
                    window.localStorage.removeItem('jwt');
                }
            }
        );
    }

    @computed get categories() {
        return Object.values(this.categoriesRegistry.toJSON());
    };

    @action loadCategories() {
        this.isLoadingCategories = true;
        return agent.Categories.getAll()
            .then(action(({ categories }) => {
                this.categoriesRegistry.clear();
                categories.forEach(category => this.categoriesRegistry.set(category.slug, category));
            }))
            .finally(action(() => { this.isLoadingCategories = false; }))
    }

    @action setToken(token) {
        this.token = token;
    }

    @action setAppLoaded() {
        this.appLoaded = true;
    }
}

export default new CommonStore();