import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import MovieEditor from './MovieEditor';
import Header from './Header';
import Home from './Home';
import Login from './Login';
import Movie from './Movie';
import Register from './Register';

@inject( 'commonStore', 'errorStore', 'userStore')
@withRouter
@observer
export default class App extends React.Component {

    constructor(props) {
        super(props);

        if (!this.props.commonStore.token) {
            this.props.commonStore.setAppLoaded();
        }
    }

    componentDidMount() {
        if (this.props.commonStore.token) {
            this.props.userStore.pullUser()
                .finally(() => this.props.commonStore.setAppLoaded());
        }
    }

    render() {
        if (this.props.commonStore.appLoaded) {
            return (
                <div>
                    <Header/>
                    <Switch>
                        <Route path='/editor/:slug?' component={MovieEditor} />
                        <Route path='/login' component={Login} />
                        <Route path='/register' component={Register} />
                        <Route path='/movie/:id' component={Movie}/>
                        <Route path='/' component={Home}/>
                    </Switch>
                </div>
            );
        }
        return (
            <Header />
        );
    }
}