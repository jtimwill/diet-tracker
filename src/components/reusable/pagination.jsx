import React from 'react';
import PropTypes from 'prop-types';
import { pageNumbers } from '../../utilities/paginationUtility';

const Pagination = ({ page_size, item_count, current_page, onPageChange }) => {
  const pg_num_array = pageNumbers(page_size, item_count);

  return (
    <div className="d-flex justify-content-center">
      {(page_size < item_count) &&
        <nav className="custom-pagination-margin">
          <ul className="pagination">
            <li
              className={current_page === 1 ? "page-item disabled" : "page-item"}
              onClick={() => onPageChange(current_page - 1, page_size)}
              >
              <div className="page-link"><span>&laquo;</span></div>
            </li>
            {pg_num_array.map(page_number => (
              <li
                className={current_page === page_number ?
                  "page-item active" : "page-item" }
                key={page_number}
                onClick={() => onPageChange(page_number, page_size)}
              >
                <div className="page-link" to="">{page_number}</div>
              </li>
            ))}
            <li
              className ={current_page === pg_num_array.length ?
                "page-item disabled" : "page-item" }
              onClick={() => onPageChange(current_page + 1, page_size)}
              >
              <div className="page-link"><span>&raquo;</span></div>
            </li>
          </ul>
        </nav>}
    </div>
  );
};

Pagination.propTypes = {
  page_size: PropTypes.number.isRequired,
  item_count: PropTypes.number.isRequired,
  current_page: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Pagination;
