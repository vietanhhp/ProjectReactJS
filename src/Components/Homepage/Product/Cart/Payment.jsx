import React from "react";
import { useSelector } from "react-redux";
import { deleteProduct } from "../productSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

function Payment(props) {
  const dispatch = useDispatch();
  const history = useHistory();

  const productAddToCart = useSelector((state) => state.cart);
  console.log(productAddToCart);
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
  function handleOrder() {
    const orderList = [productAddToCart, totalPrice];
    const orderListJson = JSON.stringify(orderList);
    localStorage.setItem("orderList", orderListJson);
    const action = deleteProduct(productAddToCart);
    dispatch(action);

    history.push("/");
  }
  return (
    <div>
      <div className="container">
        <div className="payment">
          <div className="product-list-title">THANH TOÁN</div>
          <div className="payment-address">
            <div className="payment-address-content">
              <div className="payment-address-content__title">
                Địa chỉ nhận hàng
              </div>
              <div className="payment-address-content__text">
                275 Lạch Tray, Phường Lạch Tray, Quận Ngô Quyền, TP. Hải Phòng
              </div>
            </div>
            <button className="payment-address-button">Thay đổi</button>
          </div>
          <div className="payment-item">
            <div className="payment-item-title">Sản phẩm</div>
            {productAddToCart &&
              productAddToCart.map((product, i) => (
                <div
                  className="payment-item-wapper"
                  key={productAddToCart[i][1]?.code}
                >
                  <div className="payment-item-content">
                    <a href style={{ display: "block" }}>
                      <img
                        src={
                          productAddToCart[i][1]?.details[
                            productAddToCart[i][0]?.idColor
                          ]?.image
                        }
                        alt=""
                        className="payment-item-img"
                      />
                    </a>
                    <div className="payment-item-content-body">
                      <a href className="cart-item-body__title">
                        {productAddToCart[i][1]?.name}
                      </a>
                      <div className="cart-item-body__text">
                        Color: {productAddToCart[i][0]?.color}
                      </div>
                      <div className="cart-item-body__text">
                        Size: {productAddToCart[i][0]?.size}
                      </div>
                    </div>
                  </div>
                  <div className="payment-item-info">
                    <div className="payment-item-info-wapper">
                      <div className="payment-item-info-title">Đơn giá</div>
                      <div className="payment-item-info-text">
                        {productAddToCart[i][1]?.promotionalPrice}đ
                      </div>
                    </div>
                    <div className="payment-item-info-wapper">
                      <div className="payment-item-info-title">Số lượng</div>
                      <div className="payment-item-info-text">
                        {productAddToCart[i][0]?.count}
                      </div>
                    </div>
                    <div className="payment-item-info-wapper">
                      <div className="payment-item-info-title">Thành tiền</div>
                      <div className="payment-item-info-total">
                        {Math.ceil(
                          productAddToCart[i][0]?.count *
                            productAddToCart[i][1]?.promotionalPrice
                        )}
                        đ
                      </div>
                    </div>
                  </div>
                </div>
              ))}

            <div className="payment-detail">
              <div className="payment-detail-content">
                <div className="payment-detail-content-item">
                  <div className="payment-item-title">Chi tiết thanh toán</div>
                  <div className="payment-detail-content-wapper">
                    <div className="payment-detail-content-title">
                      Mã đơn hàng:
                    </div>
                    <div className="payment-detail-content-text">CL001002</div>
                  </div>
                  <div className="payment-detail-content-wapper">
                    <div className="payment-detail-content-title">
                      Phí vận chuyển:
                    </div>
                    <div className="payment-detail-content-text">40.000đ</div>
                  </div>
                  <div className="payment-detail-content-wapper">
                    <div className="payment-detail-content-title">
                      Tổng tiền thanh toán:
                    </div>
                    <div className="payment-detail-content-price">
                      {totalPrice}đ
                    </div>
                  </div>
                  <span>( Thanh toán khi nhận hàng )</span>
                  <div className="payment-detail-order text-center">
                    <button
                      className="payment-detail-button"
                      onClick={handleOrder}
                    >
                      ĐẶT HÀNG
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
