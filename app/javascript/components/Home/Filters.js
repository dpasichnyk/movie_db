import React from 'react';
import { inject } from "mobx-react";

import Categories from "./Categories";
import Ratings from "./Ratings";

@inject('moviesStore')
class Filters extends React.Component {

    handleCategoryClick = (category, event) => {
        event.preventDefault();
        this.props.moviesStore.addCategory(category);
        this.props.moviesStore.loadMovies();
    };

    handleRatingClick = (rating, event) => {
        event.preventDefault();
        this.props.moviesStore.addRating(rating);
        this.props.moviesStore.loadMovies();
    };

    render() {
        return(
            <div className='col-md-3 mt-3'>
                <div className='sidebar'>
                    <div className='mb-3'>
                        <p>Ratings</p>
                        <Ratings ratings={this.props.ratings} onRatingClick={this.handleRatingClick} />
                    </div>
                    <p>Categories</p>
                    <Categories categories={this.props.categories} onCategoryClick={this.handleCategoryClick}/>
                </div>
            </div>
        )
    }
}

export default Filters;