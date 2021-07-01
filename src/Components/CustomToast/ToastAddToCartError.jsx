import React from "react";
import PropTypes from "prop-types";

ToastAddToCartError.propTypes = {
  imgSrc: PropTypes.string,
  nameProduct: PropTypes.string,
};
ToastAddToCartError.defaultProp = {
  imgSrc: "",
  nameProduct: "",
};
function ToastAddToCartError(props) {
  const { imgSrc, countProduct, nameProduct } = props;

  return (
    <div className="toast-wapper">
      <img src={imgSrc} className="toast-img" />
      <div className="toast-text">Sản phẩm {nameProduct} đã hết hàng</div>
    </div>
  );
}

export default ToastAddToCartError;
