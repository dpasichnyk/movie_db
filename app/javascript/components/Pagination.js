import React from 'react';

const Pagination = props => {
  const range = [];

  for (let i = 0; i < props.totalPagesCount; ++i) {
    range.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {
          range.map(v => {
            const currentIndex = v + 1;
            const isCurrent = (currentIndex === props.currentPage);

            const onClick = ev => {
              ev.preventDefault();
              props.onSetPage(currentIndex);
            };

            return (
              <li
                className={ isCurrent ? 'page-item active' : 'page-item' }
                onClick={onClick}
                key={v.toString()}
              >

                <a className="page-link" href="">{currentIndex}</a>
              </li>
            );
          })
        }

      </ul>
    </nav>
  );
};

export default Pagination;
