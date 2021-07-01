import React from "react";
import PropTypes from "prop-types";

Pagination.propTypes = {
  page: PropTypes.number,
  limit: PropTypes.number,
  total: PropTypes.number,
  onChangePage: PropTypes.func,
  paginate: PropTypes.func,
};
Pagination.defaultProps = {
  page: "",
  limit: "",
  total: "",
  onChangePage: null,
  paginate: null,
};

function Pagination(props) {
  const { page, limit, total, onChangePage, paginate } = props;
  const totalPage = Math.ceil(total / limit);
  function handleOnPageChange(newPage) {
    if (onChangePage) {
      onChangePage(newPage);
    }
  }
  const pageNumber = [];
  for (let i = 1; i <= totalPage; i++) {
    pageNumber.push(i);
  }

  return (
    <div>
      <ul className="col-12 product-highlight__button-list">
        <li className="product-highlight__button-item">
          <button
            disabled={page <= 1}
            className="product-highlight__button-link"
            onClick={() => handleOnPageChange(page - 1)}
          >
            &lt;
          </button>
        </li>
        {pageNumber.map((number) => (
          <li className="product-highlight__button-item">
            <button
              className={
                number === 1
                  ? "product-highlight__button-link product-highlight__button-item-active"
                  : "product-highlight__button-link"
              }
              onClick={() => paginate(number)}
            >
              {number}
            </button>
          </li>
        ))}
        <li className="product-highlight__button-item ">
          <button
            disabled={page == totalPage}
            className="product-highlight__button-link"
            onClick={() => handleOnPageChange(page + 1)}
          >
            &gt;
          </button>
        </li>
      </ul>
    </div>
  );
}

export default Pagination;
