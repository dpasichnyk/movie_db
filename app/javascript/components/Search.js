import React from 'react';

const Search = props => {

    const onSearch = ev => {
        props.onSearch(ev.target.value);
    };

    return (
        <div className='input-group mb-3'>
            <div className='input-group-prepend'>
                <span className='input-group-text'>
                     <i className='fa fa-search'/>
                   </span>
            </div>

            <input
                type="text"
                className='form-control'
                placeholder='Find movies, TV shows and more'
                aria-label='Search'
                onChange={onSearch}
            />
        </div>
    );
};

export default Search;