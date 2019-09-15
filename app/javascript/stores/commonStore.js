import { observable, action, computed } from 'mobx';
import agent from '../agent';

class CommonStore {

    @observable appName = 'Movie DB';
    @observable appLoaded = false;

    @observable categoriesRegistry = observable.map();
    @observable isLoadingCategories = false;

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

    @action setAppLoaded() {
        this.appLoaded = true;
    }
}

export default new CommonStore();