import Header from './Header';
import React from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';
import { inject, observer } from 'mobx-react';

import Home from './Home';
import Movie from './Movie';

@inject( 'commonStore')
@withRouter
@observer
export default class App extends React.Component {

    componentDidMount() {
        this.props.commonStore.setAppLoaded();
    }

    render() {
        if (this.props.commonStore.appLoaded) {
            return (
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/movie/:id" component={Movie}/>
                        <Route path="/" component={Home}/>
                    </Switch>
                </div>
            );
        }
        return (
            <Header />
        );
    }
}