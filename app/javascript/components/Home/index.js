import MainView from './MainView';
import React from 'react';
import Filters from './Filters';
import { inject, observer } from 'mobx-react';

@inject('commonStore')
@observer
export default class Home extends React.Component {
    componentDidMount() {
        this.props.commonStore.loadCategories();
        this.props.commonStore.loadRatings();
    }

    render() {
        const { categories, ratings } = this.props.commonStore;

        return (
            <div>
                <div className='container page'>
                    <div className='row'>
                        <Filters categories={categories} ratings={ratings} />
                        <MainView />
                    </div>
                </div>
            </div>
        );
    }
}