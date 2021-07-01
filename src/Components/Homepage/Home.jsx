import React from "react";
import PropTypes from "prop-types";
import ProductNew from "./Product/ProductNew";
import { useState, useEffect } from "react";
import Pagination from "./Pagination";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

Home.propTypes = {};

Home.defaultProp = {};
function Home(props) {
  const [data, setData] = useState([]);
  const [productListCategory, setProductListCategory] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  useEffect(() => {
    async function FetchData() {
      const requestUrl = `http://34.126.102.192:3005/api/v1/products?page=${currentPage}&limit=${postPerPage}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      setData(responseJSON);
    }
    FetchData();
  }, [currentPage]);
  const productList = data?.lstProducts;
  const productListCategorys = productListCategory?.lstCategories;
  function handleOnChangePage(newPage) {
    return setCurrentPage(newPage);
  }
  function paginate(pageNumber) {
    const buttonActivePage = document.querySelector(
      ".product-highlight__button-link.product-highlight__button-item-active"
    );
    buttonActivePage.classList.remove("product-highlight__button-item-active");

    const listButtonPage = document.querySelectorAll(
      ".product-highlight__button-link"
    );
    if (
      listButtonPage[pageNumber].classList.contains(
        "product-highlight__button-item-active"
      ) === true
    ) {
      listButtonPage[pageNumber].classList.remove(
        "product-highlight__button-item-active"
      );
    } else {
      listButtonPage[pageNumber].classList.add(
        "product-highlight__button-item-active"
      );
    }
    return setCurrentPage(pageNumber);
  }
  useEffect(() => {
    async function FetchData() {
      const requestUrl = "http://34.126.102.192:3005/api/v1/categories";
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      setProductListCategory(responseJSON);
    }
    FetchData();
  }, []);
  // productList?.lstProducts[0]?.category?.code;

  return (
    <div className="main">
      <div className="container">
        <div className="home-main-header-panel">
          <div className="col-lg-8 col-md-12 col-12">
            <div className="home-main-header-panel__slide">
              <div
                id="myCarousel"
                className="carousel slide border"
                data-ride="carousel"
              >
                <ol className="carousel-indicators">
                  <li
                    data-target="#myCarousel"
                    data-slide-to={0}
                    className="active"
                  >
                    1
                  </li>
                  <li data-target="#myCarousel" data-slide-to={1}>
                    2
                  </li>
                  <li data-target="#myCarousel" data-slide-to={2}>
                    3
                  </li>
                </ol>
                <div className="carousel-inner">
                  <div className="carousel-item active">
                    <a href className="home-main-header-panel__left">
                      <img
                        src="img/3E902EAC-5891-40EA-9277-85CF718350BA.png"
                        alt
                        className="home-main-header-panel__left-img"
                      />
                    </a>
                  </div>
                  <div className="carousel-item">
                    <a href className="home-main-header-panel__left">
                      <img
                        src="img/3E902EAC-5891-40EA-9277-85CF718350BA.png"
                        alt
                        className="home-main-header-panel__left-img"
                      />
                    </a>
                  </div>
                  <div className="carousel-item">
                    <a href className="home-main-header-panel__left">
                      <img
                        src="img/3E902EAC-5891-40EA-9277-85CF718350BA.png"
                        alt
                        className="home-main-header-panel__left-img"
                      />
                    </a>
                  </div>
                </div>
                <a
                  className="carousel-control-prev"
                  hidden
                  href="#myCarousel"
                  role="button"
                  data-slide="prev"
                >
                  <span
                    className="carousel-control-prev-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Previous</span>
                </a>
                <a
                  className="carousel-control-next"
                  hidden
                  href="#myCarousel"
                  role="button"
                  data-slide="next"
                >
                  <span
                    className="carousel-control-next-icon"
                    aria-hidden="true"
                  />
                  <span className="sr-only">Next</span>
                </a>
              </div>
            </div>
          </div>
          <div className="col-lg-4 col-md-12 col-12">
            <div className="home-main-header-panel__right">
              <a href className="home-main-header-panel__right-top">
                <img
                  src="img/14710FCD-1A56-4B89-9B6A-5E6C9E7DB7B8.png"
                  alt
                  className="home-main-header-panel__right-top--img"
                />
              </a>
              <a href className="home-main-header-panel__right-bottom">
                <img
                  src="img/54A2145B-1D39-4798-AC6D-8E35E13DFF01.png"
                  alt
                  className="home-main-header-panel__right-top--img"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="product-list">
          <div className="product-list-title">DANH MỤC SẢN PHẨM</div>
          <div className="product-list-content">
            <ul className="product-list-content__list-1">
              {productListCategorys &&
                productListCategorys.map((category) => (
                  <li
                    className="product-list-content__item"
                    key={category.code}
                  >
                    <Link
                      to={`/loc/${category.code}`}
                      className="product-list-content__link"
                    >
                      <div className="product-list-content__link-wapper">
                        <img
                          src="img/69_440346.jpg"
                          alt
                          className="product-list-content__link-img"
                        />
                      </div>
                      <div className="product-list-content__link-text">
                        {category.name}
                      </div>
                    </Link>
                  </li>
                ))}
            </ul>
          </div>
        </div>
      </div>
      <ProductNew products={productList}></ProductNew>
      <Pagination
        limit={postPerPage}
        page={currentPage}
        total={data?.total}
        onChangePage={handleOnChangePage}
        paginate={paginate}
      ></Pagination>
    </div>
  );
}

export default Home;
