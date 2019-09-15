import React from 'react';
import { HashRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import App from './App';
import promiseFinally from 'promise.prototype.finally';

import moviesStore from '../stores/moviesStore';
import commonStore from '../stores/commonStore';

const stores = { moviesStore, commonStore };

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