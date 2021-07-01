import React from "react";
import PropTypes from "prop-types";

ToastAddToCart.propTypes = {
  imgSrc: PropTypes.string,
  nameProduct: PropTypes.string,
  countProduct: PropTypes.number,
};
ToastAddToCart.defaultProp = {
  imgSrc: "",
  nameProduct: "",
  countProduct: 0,
};
function ToastAddToCart(props) {
  const { imgSrc, countProduct, nameProduct } = props;

  return (
    <div className="toast-wapper">
      <img src={imgSrc} className="toast-img" />
      <div className="toast-text">
        Thêm {countProduct} sản phẩm {nameProduct}
      </div>
    </div>
  );
}

export default ToastAddToCart;
