import { observable, action } from 'mobx';
import agent from '../agent';

class UserStore {

  @observable currentUser;
  @observable loadingUser;
  @observable updatingUser;

  @action forgetUser() {
    this.currentUser = undefined;
  }

  @action setUser(user) {
    this.currentUser = user;
    this.loadingUser = false;
  }

  @action pullUser() {
    this.loadingUser = true;

    return agent.Auth.current()
        .then(action(({ user }) => { this.currentUser = user; }))
        .finally(action(() => { this.loadingUser = false; }))
  }
}

export default new UserStore();
