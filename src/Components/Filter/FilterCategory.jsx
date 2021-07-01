import React, { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Pagination from "../Homepage/Pagination";

FilterCategory.propTypes = {};
FilterCategory.defaultProp = {};

function FilterCategory(props) {
  const { categoryCode } = useParams();
  const [data, setData] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(5);

  useEffect(() => {
    async function FetchData() {
      const requestUrl = `http://34.126.102.192:3005/api/v1/products?page=${currentPage}&limit=${postPerPage}&categoryCode=${categoryCode}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      setData(responseJSON);
    }
    FetchData();
  }, [currentPage]);

  const productList = data?.lstProducts;

  function handleOnChangePage(newPage) {
    setCurrentPage(newPage);
  }

  function paginate(pageNumber) {
    setCurrentPage(pageNumber);
  }

  return (
    <div>
      <div className="container">
        <div className="seacrch-key">
          <div className="seacrch-key-title">
            <img
              src="/img/A59B4547-6CE8-487A-82B8-BD0592C86CBC.svg"
              alt=""
              className="seacrch-key-title__icon"
            />
            <div className="seacrch-key-title__text">
              Kết quả hiện thị cho từ khoá: “ <span className="key"></span> “
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
                <select
                  className="menu-body-content-select"
                  id="menu-body-content-select"
                >
                  <option value selected disabled hidden>
                    Giá
                  </option>
                  <option value="low">low</option>
                  <option value="htl">high to low</option>
                  <option value="lth">low to hight</option>
                </select>
              </div>
            </div>
            <div className="seacrch-key-content-body">
              {productList &&
                productList.map((product) => (
                  <div className="col-2-4 col-md-4 col-6 gutter">
                    <div className="product-detail-same-item">
                      <div className="product-detail-same-item__title">
                        CHILI SHOP
                      </div>
                      <Link
                        to={`/san-pham/${product.code}`}
                        href
                        className="product-detail-same-item__top"
                      >
                        <img
                          src={product.images[1]}
                          alt=""
                          className="product-detail-same-item__img"
                        />
                      </Link>
                      <div className="product-detail-same-item__body">
                        <Link
                          to={`/san-pham/${product.code}`}
                          className="product-detail-same-item__body-title"
                        >
                          {product.name}
                        </Link>
                        <div className="product-detail-same-item__body-price">
                          <div className="product-detail-same-item__body-price-old">
                            {product.price}đ
                          </div>
                          <div className="product-detail-same-item__body-price-new">
                            {product.promotionalPrice}đ
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
                            Đã bán {product.sold}
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

export default FilterCategory;
