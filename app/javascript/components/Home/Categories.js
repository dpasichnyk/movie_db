import React from 'react';
import { Link } from 'react-router-dom';
import LoadingSpinner from '../LoadingSpinner';

const Categories = props => {
    const categories = props.categories;

    if (categories) {
        return (
            <ul className='nav flex-column'>
                {
                    categories.map(category => {
                        return (
                            <li className="nav-item" key={category.slug}>
                                <Link to={{ pathname: '/' }} key={category.id}>
                                    {category.name}
                                </Link>
                            </li>
                        );
                    })
                }
            </ul>
        );
    } else {
        return (
            <LoadingSpinner />
        );
    }
};

export default Categories;