import React from 'react';
import PropTypes from 'prop-types';

Footer.propTypes = {

};

function Footer(props) {
    return (
        <footer className="footer">
            <div className="container">
                <div className="footer-top">
                    <div className="col-lg-4 col-md-12 col-12 gutter">
                        <a href className="footer-top__title">
                            <img src="/img/9D3603E1-AD97-4035-9547-09D84446731F.png" alt className="footer-top__img" />
                        </a>
                        <div className="chili-about-us">
                            <a href className="chili-about-us__wapper">
                                <i className="chili-about-us-icon fas fa-info" />
                                <div className="chili-about-us__text">
                                    Giới thiệu về Chili
                  </div>
                            </a>
                            <a href className="chili-about-us__wapper">
                                <i className="chili-about-us-icon far fa-clipboard" />
                                <div className="chili-about-us__text">
                                    Điều khoản Chili
                  </div>
                            </a>
                            <a href className="chili-about-us__wapper">
                                <i className="chili-about-us-icon fas fa-lock" />
                                <div className="chili-about-us__text">
                                    Chính sách bảo mật
                  </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 gutter">
                        <div className="footer-top__title">
                            THEO DÕI CHÚNG TÔI TRÊN
              </div>
                        <div className="chili-connect">
                            <a href className="chili-about-us__wapper">
                                <i className="chili-about-us-icon fab fa-facebook-f" />
                                <div className="chili-about-us__text">
                                    Facebook
                  </div>
                            </a>
                            <a href className="chili-about-us__wapper">
                                <i className="chili-about-us-icon fab fa-instagram" />
                                <div className="chili-about-us__text">
                                    Instagram
                  </div>
                            </a>
                            <a href className="chili-about-us__wapper">
                                <i className="chili-about-us-icon fab fa-twitter" />
                                <div className="chili-about-us__text">
                                    Twitter
                  </div>
                            </a>
                        </div>
                    </div>
                    <div className="col-lg-4 col-md-12 col-12 gutter">
                        <div className="footer-top__title">
                            THÔNG TIN LIÊN HỆ
              </div>
                        <div className="chili-contact">
                            <div href className="chili-contact__wapper">
                                <img src="/img/2C627BBD-D910-485F-A9B1-A919725CBC10.svg" alt className="chili-contact__img" />
                                <div className="chili-contact__text">
                                    Số 275 Lạch Tray, Ngô Quyền, Hải Phòng.
                  </div>
                            </div>
                            <div href className="chili-contact__wapper">
                                <img src="/img/03B7A3F5-BF53-4328-A8B4-95F1963ADAD2.svg" alt className="chili-contact__img" />
                                <div className="chili-contact__text">
                                    0912.888.999
                  </div>
                            </div>
                            <div href className="chili-contact__wapper">
                                <img src="/img/FC65BE2B-CE0D-4999-BB2D-FC0F7FF0F66A.svg" alt className="chili-contact__img" />
                                <div className="chili-contact__text">
                                    chilishop@gmail.com
                  </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>


    );
}

export default Footer;