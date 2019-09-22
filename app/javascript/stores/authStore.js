import { observable, action } from 'mobx';
import agent from '../agent';
import userStore from './userStore';
import commonStore from './commonStore';

class AuthStore {
  @observable inProgress = false;
  @observable errors = undefined;

  @observable values = {
    email: '',
    firstName: '',
    lastName: '',
    password: '',
  };

  @action setEmail(email) {
      this.values.email = email;
  }

  @action setFirstName(firstName) {
      this.values.firstName = firstName;
    }

  @action setLastName(lastName) {
      this.values.lastName = lastName;
  }

  @action setPassword(password) {
    this.values.password = password;
  }

  @action reset() {
    this.values.email = '';
    this.values.firstName = '';
    this.values.lastName = '';
    this.values.password = '';
  }

  @action login() {
    this.inProgress = true;
    this.errors = undefined;

    return agent.Auth.login(this.values.email, this.values.password)
      .then(({ user }) => userStore.setUser(user))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action register() {
    this.inProgress = true;
    this.errors = undefined;

    return agent.Auth.register(this.values.firstName, this.values.lastName, this.values.email, this.values.password)
      .then(({ user }) => userStore.setUser(user))
      .catch(action((err) => {
        this.errors = err.response && err.response.body && err.response.body.errors;
        throw err;
      }))
      .finally(action(() => { this.inProgress = false; }));
  }

  @action logout() {
    commonStore.setToken(undefined);
    userStore.forgetUser();
    return Promise.resolve();
  }
}

export default new AuthStore();
