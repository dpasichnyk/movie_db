import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './App';
import promiseFinally from 'promise.prototype.finally';

import authStore from '../stores/authStore';
import commonStore from '../stores/commonStore';
import errorStore from '../stores/errorStore';
import moviesStore from '../stores/moviesStore';
import userStore from '../stores/userStore';

const stores = { authStore, commonStore, errorStore, moviesStore, userStore };

promiseFinally.shim();

export default class EntryPoint extends React.Component {
    render() {
        return (
            <Provider {...stores}>
                <HashRouter>
                    <App/>
                </HashRouter>
            </Provider>
        )
    }
}