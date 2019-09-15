import MainView from './MainView';
import React from 'react';
import Categories from './Categories';
import { inject, observer } from 'mobx-react';

@inject('commonStore')
@observer
export default class Home extends React.Component {
    componentDidMount() {
        this.props.commonStore.loadCategories();
    }

    render() {
        const { categories } = this.props.commonStore;

        return (
            <div>
                <div className='container page'>
                    <div className='row'>
                        <MainView />

                        <div className='col-md-3 mt-3'>
                            <div className='sidebar'>
                                <p>Popular Categories</p>
                                <Categories categories={categories}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}