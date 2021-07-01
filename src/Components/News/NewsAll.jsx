import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';


import { Link } from "react-router-dom";
import Pagination from './Pagination';

NewsAll.propTypes = {

};

function NewsAll(props) {

    const [postList, setPostList] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [postPerPage, setPostPerPage] = useState(10);


    useEffect(() => {
        async function FetchData() {
            const requestUrl = 'https://jsonplaceholder.typicode.com/posts?';
            const response = await fetch(requestUrl);
            const data = await response.json();
            setPostList(data);
        }
        FetchData();
    }, [])

    const indexOfLastPost = currentPage * postPerPage;
    const indexOfFirst = indexOfLastPost - postPerPage;
    const currentPost = postList.slice(indexOfFirst, indexOfLastPost);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    function handleOnChangePage(pageNumber) {
        return setCurrentPage(pageNumber);
    }

    return (

        <div className="container">
            <div className="news">
                <div className="product-list-title">
                    TIN TỨC
                </div>
                <div className="news-body">
                    {currentPost && currentPost.map(post => (
                        <div className="news-item" key={post.id}>
                            <a href className="news-item-left">
                                <img src="img/A47B83F3-F679-418F-8E3E-B543D954A082.png" alt="" className="news-item-left__img" />
                            </a>
                            <div className="news-item-body">
                                <Link to={`/tin-tuc/${post.id}`} className="news-item-body__title">
                                    {post.title}
                                </Link>
                                <a href className="news-item-body__tags">
                                    {post.body}
                                </a>
                                <div className="news-item-body__time">
                                    20/02/2020, 16:58
                        </div>
                            </div>
                        </div>
                    ))}
                </div>
                <Pagination postPerPage={postPerPage} totalPosts={postList.length} totalPosts={postList.length} paginate={paginate} nowPage={currentPage} handleOnchangePage={handleOnChangePage}></Pagination>
            </div>
        </div>



    );
}

export default NewsAll;