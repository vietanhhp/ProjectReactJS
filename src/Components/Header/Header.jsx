import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
Header.propTypes = {};

function Header(props) {
  const history = useHistory();
  const [searchValue, setSearchValue] = useState();
  const [user, setUser] = useState();
  const [isLogin, setLogin] = useState(localStorage.getItem("token"));
  console.log(isLogin);

  useEffect(() => {
    axios
      .get("http://34.126.102.192:3005/api/v1/user")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const productAddToCart = useSelector((state) => state.cart);
  let quantily = 0;
  productAddToCart &&
    productAddToCart.forEach((product, i) => {
      quantily = i + 1;
    });
  function handleClickSearch() {
    console.log(searchValue);
    if (searchValue) {
      history.push(`/loc/tim-kiem/${searchValue}`);
    }
  }
  function handleSearchInputChange(e) {
    const value = e.target.value;
    setSearchValue(value);
  }
  return (
    <header className="header">
      <div className="header-top-wapper">
        <div className="container">
          <div className="header-top">
            <div className="header-top-left">
              <div className="header-top-left__your-cart">
                Gian Hàng Của Bạn
              </div>
              <div className="header-top-left__connect">
                <div className="header-top-left__connect-title">Kết nối</div>
                <div className="header-top-left__connect-icon-wapper">
                  <a href className="header-top-left__connect-link">
                    <i className="header-top-left__connect-icon fab fa-facebook-f" />
                  </a>
                  <a href className="header-top-left__connect-link">
                    <i className="header-top-left__connect-icon fab fa-instagram" />
                  </a>
                </div>
              </div>
            </div>
            <div className="header-top-right">
              <ul className="header-top-right__list">
                {isLogin === null && (
                  <li className="header-top-right__item">
                    <Link to="/dang-ky" className="header-top-right__item-help">
                      <div className="header-top-right__link-text">Đăng ký</div>
                    </Link>
                    <Link
                      to="/dang-nhap"
                      className="header-top-right__item-help"
                    >
                      <div className="header-top-right__link-text">
                        Đăng nhập
                      </div>
                    </Link>
                  </li>
                )}
                {isLogin !== null && (
                  <li className="header-top-right__item">
                    <Link
                      to="/thong-tin-ca-nhan"
                      className="header-top-right__item-account"
                    >
                      <img
                        src={user?.avatarUrl}
                        className="header-top-right__item-accout--img"
                      />
                      <div className="header-top-right__link-text">
                        {user?.fullName}
                      </div>
                    </Link>
                  </li>
                )}
                <li className="header-top-right__item">
                  <a href className="header-top-right__item-help">
                    <i className="header-top-right__item-icon far fa-question-circle" />
                    <div className="header-top-right__link-text">Trợ giúp</div>
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="header-mid">
            <div className="col-lg-3 col-md-4 col-8">
              <Link to="/" className="header-mid-logo">
                <img
                  src="/img/9D3603E1-AD97-4035-9547-09D84446731F.png"
                  alt
                  className="header-mid-logo__img"
                />
              </Link>
            </div>
            <div className="cart-search-wapper col-lg-9 col-md-8 col-12">
              <div className="col-lg col-md col">
                <div className="header-mid-search">
                  <input
                    type="text"
                    className="header-mid-search__input"
                    placeholder="Tìm tên sản phẩm hoặc tên người đăng bán"
                    onChange={(search) => handleSearchInputChange(search)}
                  />
                  <button
                    className="header-mid-search__icon fas fa-search"
                    onClick={handleClickSearch}
                  ></button>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-2">
                <Link to="/gio-hang" className="header-mid-cart">
                  <i className="header-mid-cart__icon fas fa-shopping-cart" />
                  <div className="header-mid-cart__num">{quantily}</div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="home-main-header">
          <div className="home-main-header-menu hide-on-tablet-mobile">
            <ul className="home-main-header__list">
              <li className="home-main-header__item">
                <Link to="/gioi-thieu" className="home-main-header__link">
                  <div className="home-main-header__link-icon">
                    <img
                      src="/img/4A69C6C2-0022-473C-9935-1302DF3AF8D6.svg"
                      alt
                      className="home-main-header__link-img"
                    />
                  </div>
                  <div className="home-main-header__link-text">Giới thiệu</div>
                </Link>
              </li>
              <li className="home-main-header__item">
                <Link to="/tin-tuc" className="home-main-header__link">
                  <div className="home-main-header__link-icon">
                    <img
                      src="/img/527CEA7E-20FC-486E-9D71-240840B8E031.svg"
                      alt
                      className="home-main-header__link-img"
                    />
                  </div>
                  <div className="home-main-header__link-text">Tin tức</div>
                </Link>
              </li>
              <li className="home-main-header__item">
                <Link
                  to="/thong-tin-ca-nhan"
                  className="home-main-header__link"
                >
                  <div className="home-main-header__link-icon">
                    <img
                      src="/img/C55D3001-2F2F-4E67-AC39-D142F9C09680.svg"
                      alt
                      className="home-main-header__link-img"
                    />
                  </div>
                  <div className="home-main-header__link-text">
                    Thông tin cá nhân
                  </div>
                </Link>
              </li>
              <li className="home-main-header__item">
                <Link to="/lien-he" className="home-main-header__link">
                  <div className="home-main-header__link-icon">
                    <img
                      src="/img/8EB480D5-5EF9-4EBF-87FC-4B22BCEF9389.svg"
                      alt
                      className="home-main-header__link-img"
                    />
                  </div>
                  <div className="home-main-header__link-text">Liên hệ</div>
                </Link>
              </li>
              <li className="home-main-header__item">
                <Link to="/lich-su-mua-hang" className="home-main-header__link">
                  <div className="home-main-header__link-icon">
                    <img
                      src="/img/9DB55CC6-C4FF-4090-9D51-F1AD85E8F392.svg"
                      alt
                      className="home-main-header__link-img"
                    />
                  </div>
                  <div className="home-main-header__link-text">
                    Lịch sử mua hàng
                  </div>
                </Link>
              </li>
            </ul>
          </div>
          <label
            htmlFor="checkbox-mobile-menu"
            className="menu-mobile-icon__wapper"
          >
            <i className="menu-mobile-icon fas fa-bars" />
          </label>
        </div>
        <input
          type="checkbox"
          hidden
          name="checkbox-mobile-menu"
          id="checkbox-mobile-menu"
        />
        <div className="menu-mobile">
          <ul className="menu-mobile__list">
            <li className="home-main-header__item">
              <Link to="/gioi-thieu" className="home-main-header__link">
                <div className="home-main-header__link-icon">
                  <img
                    src="/img/4A69C6C2-0022-473C-9935-1302DF3AF8D6.svg"
                    alt
                    className="home-main-header__link-img"
                  />
                </div>
                <div className="home-main-header__link-text">Giới thiệu</div>
              </Link>
            </li>
            <li className="home-main-header__item">
              <Link to="/tin-tuc" className="home-main-header__link">
                <div className="home-main-header__link-icon">
                  <img
                    src="/img/527CEA7E-20FC-486E-9D71-240840B8E031.svg"
                    alt
                    className="home-main-header__link-img"
                  />
                </div>
                <div className="home-main-header__link-text">Tin tức</div>
              </Link>
            </li>
            <li className="home-main-header__item">
              <Link to="/thong-tin-ca-nhan" className="home-main-header__link">
                <div className="home-main-header__link-icon">
                  <img
                    src="/img/C55D3001-2F2F-4E67-AC39-D142F9C09680.svg"
                    alt
                    className="home-main-header__link-img"
                  />
                </div>
                <div className="home-main-header__link-text">
                  Thông tin cá nhân
                </div>
              </Link>
            </li>
            <li className="home-main-header__item">
              <Link to="/lien-he" className="home-main-header__link">
                <div className="home-main-header__link-icon">
                  <img
                    src="/img/8EB480D5-5EF9-4EBF-87FC-4B22BCEF9389.svg"
                    alt
                    className="home-main-header__link-img"
                  />
                </div>
                <div className="home-main-header__link-text">Liên hệ</div>
              </Link>
            </li>
            <li className="home-main-header__item">
              <Link to="/lich-su-mua-hang" className="home-main-header__link">
                <div className="home-main-header__link-icon">
                  <img
                    src="/img/9DB55CC6-C4FF-4090-9D51-F1AD85E8F392.svg"
                    alt
                    className="home-main-header__link-img"
                  />
                </div>
                <div className="home-main-header__link-text">
                  Lịch sử mua hàng
                </div>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
