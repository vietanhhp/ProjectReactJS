import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { removeProduct } from "../productSlice";
import { useHistory, Link } from "react-router-dom";

Cart.propTypes = {};

function Cart(props) {
  const dispatch = useDispatch();
  const history = useHistory();
  const productAddToCart = useSelector((state) => state.cart);
  const [count, setCount] = useState(1);

  function handleRemoveProduct(productId, size, color) {
    const removeProductInfo = { productId, size, color };
    console.log(removeProductInfo);

    console.log(productId);
    const action = removeProduct(removeProductInfo);
    console.log(productId);

    dispatch(action);
  }
  function handleCount(counts) {
    setCount(counts);
    console.log(count);
  }
  let quantily = 0;
  let totalPrice = 0;
  productAddToCart &&
    productAddToCart.forEach((product, i) => {
      quantily += productAddToCart[i][0]?.count;
      const price =
        productAddToCart[i][0]?.count *
        productAddToCart[i][1]?.promotionalPrice;
      totalPrice += price;
    });
  function handleCountChange(e) {}
  function handlePayment() {
    history.push("/thanh-toan");
  }
  return (
    <div>
      <div className="container">
        <div className="cart">
          <div className="product-list-title">GIỎ HÀNG</div>
          {productAddToCart.length == 0 && (
            <h1 style={{ textAlign: "center" }}>Chưa có sản phẩm nào</h1>
          )}
          {productAddToCart &&
            productAddToCart.map((product, i) => (
              <div className="cart-item" key={productAddToCart[i][1]?.code}>
                <div className="col-lg-5 col-md-12 col-12 gutter">
                  <div className="cart-item-body">
                    <a href className="cart-item-wapper__img">
                      <img
                        src={
                          productAddToCart[i][1]?.details[
                            productAddToCart[i][0]?.idColor
                          ]?.image
                        }
                        alt=""
                        className="cart-item__img"
                      />
                    </a>
                    <div className="cart-item-body__wapper">
                      <Link
                        to={`/san-pham/${productAddToCart[i][1]?.code}`}
                        className="cart-item-body__title"
                      >
                        {productAddToCart[i][1]?.name}
                      </Link>
                      <div className="cart-item-body__text">
                        Color: {productAddToCart[i][0]?.color}
                      </div>
                      <div className="cart-item-body__text">
                        Size: {productAddToCart[i][0]?.size}
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg col-md-12 col cart-body-wapper gutter-z">
                  <div className="col-lg-3 col-md-3 col-4 gutter">
                    <div className="cart-item-price text-center">
                      <div className="cart-item-title">Đơn giá</div>
                      <div className="cart-item-price-body">
                        <div className="cart-item-price-body__new">
                          {productAddToCart[i][1]?.promotionalPrice}đ
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-4 gutter">
                    <div className="cart-item-amount text-center">
                      <div className="cart-item-title">Số lượng</div>
                      <div className="cart-item-amount-body">
                        <button
                          className="cart-item-amount-body__button"
                          onClick={() =>
                            handleCount(productAddToCart[i][0]?.count - 1)
                          }
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="cart-item-amount-body__input"
                          disabled
                          value={productAddToCart[i][0]?.count}
                          onChange={() => handleCountChange()}
                        />
                        <button
                          className="cart-item-amount-body__button"
                          onClick={() =>
                            handleCount(productAddToCart[i][0]?.count + 1)
                          }
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-4 gutter">
                    <div className="cart-item-pay text-center">
                      <div className="cart-item-title">Thành tiền</div>
                      <div className="cart-item-pay-body">
                        {Math.ceil(
                          productAddToCart[i][0]?.count *
                            productAddToCart[i][1]?.promotionalPrice
                        )}
                        đ
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-3 col-md-3 col-3 gutter hide-on-mobile">
                    <div className="cart-item-action text-center">
                      <div className="cart-item-title">Thao tác</div>
                      <div className="cart-item-action-body">
                        <button
                          className="cart-item-action-body__button"
                          onClick={() =>
                            handleRemoveProduct(
                              productAddToCart[i][1]?.code,
                              productAddToCart[i][0]?.size,
                              productAddToCart[i][0]?.color
                            )
                          }
                        >
                          Xoá
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="cart-item-action__delete">
                  <button
                    onClick={() =>
                      handleRemoveProduct(
                        productAddToCart[i][1]?.code,
                        productAddToCart[i][0]?.size,
                        productAddToCart[i][0]?.color
                      )
                    }
                  >
                    <i className="cart-item-action__delete-icon fas fa-times" />
                  </button>
                </div>
              </div>
            ))}
          {productAddToCart.length != 0 && (
            <div className="cart-total">
              <div className="cart-total-price">
                <div className="cart-total-title">
                  Tổng tiền hàng ({quantily} sản phẩm):
                </div>
                <div className="cart-total-num">{totalPrice}đ</div>
              </div>
              <button className="cart-total-button" onClick={handlePayment}>
                MUA HÀNG
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Cart;
