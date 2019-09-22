import { Link } from 'react-router-dom';
import React from 'react';

const Actions = props => {
  const movie = props.movie;
  const handleDelete = () => props.onDelete(movie.slug);

  if (props.canModify) {
    return (
      <div>
        <Link to={`/editor/${movie.slug}`} className='btn btn-outline-secondary btn-sm fa fa-edit mr-1' />
        <button className='btn btn-outline-danger btn-sm fa fa-trash' onClick={handleDelete} />
      </div>
    );
  }

  return (
    <span />
  );
};

export default Actions;
