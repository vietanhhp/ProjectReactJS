import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';

Seach.propTypes = {

};

function Seach(props) {
    const { searchTerm } = useParams();
    const [postList, setPostList] = useState();
    const [searchList, setSearchList] = useState();

    useEffect(() => {
        async function FetchData() {
            try {
                const requestUrl = 'https://jsonplaceholder.typicode.com/posts?';
                const reponse = await fetch(requestUrl);
                const data = await reponse.json();
                setPostList(data);
            } catch (error) {
                console.log(error);
            }
        }
        FetchData();
    }, [searchList])

    useEffect(() => {
        setSearchList(
            postList && postList.filter(post => {
                return post.title.toLowerCase().includes(searchTerm.toLowerCase());
            })
        )
    }, [postList])

    return (
        <div>
            <div className="container">
                <div className="seacrch-key">
                    <div className="seacrch-key-title">
                        <img src="/img/A59B4547-6CE8-487A-82B8-BD0592C86CBC.svg" alt="" className="seacrch-key-title__icon" />
                        <div className="seacrch-key-title__text">
                            Kết quả hiện thị cho từ khoá: “ <span className="key"> {searchTerm} </span> “
                        </div>
                    </div>
                    <div className="seacrch-key-content">
                        <div className="menu-body-content-header">
                            <div className="menu-body-content-header__filter">
                                <div className="menu-body-content-header__title hide-on-tablet-mobile">
                                    Sắp xếp theo
                                </div>
                                <div className="menu-body-content-header__button-list">
                                    <button className="menu-body-content-header__button selected">
                                        Tất Cả
                                    </button>
                                    <button className="menu-body-content-header__button">
                                        Mới Nhất
                                    </button>
                                    <button className="menu-body-content-header__button">
                                        Bán Chạy
                                 </button>
                                </div>
                                <select className="menu-body-content-select" id="menu-body-content-select">
                                    <option value selected disabled hidden>Giá</option>
                                    <option value="low">low</option>
                                    <option value="htl">high to low</option>
                                    <option value="lth">low to hight</option>
                                </select>
                            </div>
                            <div className="menu-body-content-header__arrow hide-on-tablet-mobile">
                                <div className="page-select">
                                    <span className="page-selected">1</span> / <span>50</span>
                                </div>
                                <div className="menu-body-content-header__arrow-button-list">
                                    <button className="menu-body-content-header__arrow-button menu-body-content-header__arrow-button-selected">
                                        <i className="menu-body-content-header__arrow-icon fas fa-chevron-left" />
                                    </button>
                                    <button className="menu-body-content-header__arrow-button">
                                        <i className="menu-body-content-header__arrow-icon fas fa-chevron-right" />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="seacrch-key-content-body">
                            {searchList && searchList.map(post => (
                                <div className="col-2-4 col-md-4 col-6 gutter">
                                    <div className="product-detail-same-item">
                                        <div className="product-detail-same-item__title">
                                            CHILI SHOP
                                    </div>
                                        <a href className="product-detail-same-item__top">
                                            <img src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png" alt="" className="product-detail-same-item__img" />
                                        </a>
                                        <div className="product-detail-same-item__body">
                                            <a href className="product-detail-same-item__body-title">
                                                {post.title}
                                            </a>
                                            <div className="product-detail-same-item__body-price">
                                                <div className="product-detail-same-item__body-price-old">
                                                    450.000đ
                                        </div>
                                                <div className="product-detail-same-item__body-price-new">
                                                    450.000đ
                                        </div>
                                            </div>
                                            <div className="product-detail-same-item__rate">
                                                <div className="product-detail-same-item__rate-star">
                                                    <i className="product-detail-same-item__rate-star-icon fas fa-star rated" />
                                                    <i className="product-detail-same-item__rate-star-icon fas fa-star rated" />
                                                    <i className="product-detail-same-item__rate-star-icon fas fa-star rated" />
                                                    <i className="product-detail-same-item__rate-star-icon fas fa-star rated" />
                                                    <i className="product-detail-same-item__rate-star-icon fas fa-star rated" />
                                                </div>
                                                <div className="product-detail-same-item__rate-text">
                                                    Đã bán 99
                                            </div>
                                            </div>
                                            <div className="product-detail-same-item__city">
                                                Tp. Hồ Chí Minh
                                        </div>
                                        </div>
                                        <div className="product-detail-same-item__sale">
                                            Sale 30%
                                    </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Seach;