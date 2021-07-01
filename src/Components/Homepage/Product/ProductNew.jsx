import React from 'react';
import PropTypes from 'prop-types';
import {
    Link
} from "react-router-dom";

Productnew.propTypes = {
    products: PropTypes.array,
    onClickProduct: PropTypes.func,
};
Productnew.defaultProp = {
    products: [],
    onClickProduct: null,
}

function Productnew(props) {
    const { products, onClickProduct } = props;

    function handleOnClickProductId(productId) {
        if (onClickProduct) {
            onClickProduct(productId);
        }
    }



    return (
        <div>
            <div className="container">
                <div className="product-list-wapper row gutter-m">
                    {products && products.map(product => (
                        <div className="col-2-4 col-md-4 col-6  gutter">
                            <div className="product-list-content-item" id={product.code} onClick={() => handleOnClickProductId(product.id)}>
                                <div className="product-list-content-item__top text-center">
                                    <img src={product.images[1]} alt="" className="product-list-content-item__top--img" />
                                </div>
                                <div className="product-list-content-item__bottom">
                                    <Link to={`/san-pham/${product.code}`} className="product-list-content-item__bottom-title">
                                        {product.name}
                                    </Link>
                                    <div className="product-list-content-item__bottom-price">
                                        <div className="product-list-content-item__bottom-price-wapper">
                                            <div className="product-list-content-item__bottom-price-old">{product.price}đ</div>
                                            <div className="product-list-content-item__bottom-price-new">{product.promotionalPrice}đ</div>
                                        </div>
                                        <img src="img/872111B6-AB7D-41DE-809B-295915DDCA46.svg" alt="" className="product-list-content-item__shipping" />
                                    </div>
                                </div>
                                <div className="product-list-content-item__bottom-rate">
                                    <div className="product-list-content-item__bottom-rate--star">
                                        <i className="product-list-content-item__bottom-rate--star-icon fas fa-star rated" />
                                        <i className="product-list-content-item__bottom-rate--star-icon fas fa-star rated" />
                                        <i className="product-list-content-item__bottom-rate--star-icon fas fa-star rated" />
                                        <i className="product-list-content-item__bottom-rate--star-icon fas fa-star rated" />
                                        <i className="product-list-content-item__bottom-rate--star-icon fas fa-star rated" />
                                    </div>
                                    <div className="product-list-content-item__bottom-rate--sold">
                                        Đã bán {product.sold}
                                    </div>
                                </div>
                                <div className="product-list-content-item__bottom-city">
                                    Tp. Hồ Chí Minh
                                </div>
                            </div>
                        </div>

                    ))}
                </div>
            </div>
        </div>

    );
}

export default Productnew;