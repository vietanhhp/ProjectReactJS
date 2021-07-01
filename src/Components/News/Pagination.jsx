import React from 'react';
import PropTypes from 'prop-types';

Pagination.propTypes = {

};

function Pagination({ postPerPage, totalPosts, paginate, nowPage, handleOnchangePage }) {
    const pageNumber = [];
    const totalPage = Math.ceil(totalPosts / postPerPage);
    for (let i = 1; i <= totalPage; i++) {
        pageNumber.push(i);
    }
    return (
        <div>
            <ul className="col-12 product-highlight__button-list">
                <li className="product-highlight__button-item ">
                    <button disabled={nowPage <= 1} className="product-highlight__button-link" onClick={() => handleOnchangePage(nowPage - 1)}>
                        &lt;
                    </button>
                </li>
                {pageNumber.map(number => (
                    <li className="product-highlight__button-item" key={number}>
                        <button onClick={() => paginate(number)} className="product-highlight__button-link product-highlight__button-item-active">
                            {number}
                        </button>
                    </li>
                ))}
                <li className="product-highlight__button-item ">
                    <button disabled={nowPage == totalPage} className="product-highlight__button-link" onClick={() => handleOnchangePage(nowPage + 1)}>
                        &gt;
                    </button>
                </li>
            </ul>
        </div>
    );
}

export default Pagination;