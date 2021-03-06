import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addProduct, editProduct } from "../productSlice";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ToastAddToCart from "../../../CustomToast/ToastAddToCart";
import ToastAddToCartError from "../../../CustomToast/ToastAddToCartError";

toast.configure();
function ProductDetail(props) {
  const { productId } = useParams();

  const dispatch = useDispatch();
  const history = useHistory();
  const productCart = useSelector((state) => state.cart);

  const [products, setProducts] = useState([]);
  const [listSizes, setListSizes] = useState([]);
  const [countProduct, setCountProduct] = useState(1);
  const [inventory, setInventory] = useState([]);
  const [productAddToCart, setProductAddToCart] = useState({
    color: "",
    size: "",
    count: 1,
    idColor: 0,
  });

  useEffect(() => {
    async function FetchData() {
      const requestUrl = `http://34.126.102.192:3005/api/v1/product-detail/${productId}`;
      const response = await fetch(requestUrl);
      const responseJSON = await response.json();
      setProducts(responseJSON);
      setListSizes(responseJSON.product?.details[0]?.sizes);
      setInventory(responseJSON.product?.details[0]?.sizes[0]?.inventory);
      setProductAddToCart({
        ...productAddToCart,
        color: responseJSON.product?.details[0]?.color,
        size: responseJSON.product?.details[0]?.sizes[0].size,
        count: 1,
      });
    }
    FetchData();
  }, []);
  const product = products?.product;
  // const a = product?.details[0].sizes;
  // setListSizes(a)
  console.log(productAddToCart);

  function handleChooseColor(colorID) {
    setListSizes(product?.details[colorID]?.sizes);
    setInventory(product?.details[colorID]?.sizes[0].inventory);

    setProductAddToCart({
      ...productAddToCart,
      color: product?.details[colorID]?.color,
      size: product?.details[0]?.sizes[0].size,
      idColor: colorID,
    });
    console.log(productAddToCart);

    const buttonActiveSize = document.querySelector(
      ".product-detail-item-body__size-button.active"
    );
    buttonActiveSize.classList.remove("active");

    const listButtonSize = document.querySelectorAll(
      ".product-detail-item-body__size-button"
    );
    if (listButtonSize[colorID].classList.contains("active") === true) {
      listButtonSize[colorID].classList.remove("active");
    } else {
      listButtonSize[colorID].classList.add("active");
    }

    const buttonFirst = document.querySelector(
      ".product-detail-item-body__color-button:first-child"
    );

    const buttonActiveColor = document.querySelector(
      ".product-detail-item-body__color-button.active"
    );
    // listButtonSize[colorID].classList.add("active");
    buttonActiveColor.classList.remove("active");

    buttonFirst.classList.add("active");
  }
  function handleChooseSize(size) {
    setInventory(listSizes[size]?.inventory);
    console.log(size);
    setProductAddToCart({
      ...productAddToCart,
      size: listSizes[size].size,
    });
    const buttonActiveColor = document.querySelector(
      ".product-detail-item-body__color-button.active"
    );
    const listButtonColor = document.querySelectorAll(
      ".product-detail-item-body__color-button"
    );
    buttonActiveColor.classList.remove("active");
    if (listButtonColor[size].classList.contains("active") === true) {
      listButtonColor[size].classList.remove("active");
    } else {
      listButtonColor[size].classList.add("active");
    }
  }
  const rateSale = Math.ceil(product?.price / product?.promotionalPrice);

  function handleAddToCart(product) {
    if (inventory !== 0) {
      const foundProduct = productCart.find(
        (x, i) =>
          productCart[i][1].code === product.code &&
          productCart[i][0].color === productAddToCart.color &&
          productCart[i][0].size === productAddToCart.size
      );
      if (!foundProduct) {
        toast(
          <ToastAddToCart
            imgSrc={product?.images[0]}
            nameProduct={product?.name}
            countProduct={countProduct}
          />
        );
        const listProductAddToCart = [productAddToCart, product];
        const action = addProduct(listProductAddToCart);
        console.log(listProductAddToCart);
        console.log(product);
        console.log({ action });

        dispatch(action);
      } else {
        const newCountProduct = foundProduct[0].count + countProduct;
        toast.success(
          `Th??m ${countProduct} s???n ph???m ${product.name} th??nh c??ng `
        );
        const listProductAddToCart = [newCountProduct, product];
        const action = editProduct(listProductAddToCart);
        console.log({ action });
        console.log(newCountProduct);
        console.log(foundProduct[0].count);
        dispatch(action);
      }
    } else {
      toast.warning(
        <ToastAddToCartError
          imgSrc={product?.images[0]}
          nameProduct={product?.name}
        />
      );
    }
  }
  function handleBuyNow(product) {
    if (inventory !== 0) {
      const foundProduct = productCart.find(
        (x, i) =>
          productCart[i][1].code === product.code &&
          productCart[i][0].color === productAddToCart.color &&
          productCart[i][0].size === productAddToCart.size
      );
      if (!foundProduct) {
        const listProductAddToCart = [productAddToCart, product];
        const action = addProduct(listProductAddToCart);
        console.log(product);
        console.log({ action });

        dispatch(action);
        history.push("/gio-hang");
      } else {
        history.push("/gio-hang");
      }
    } else {
      toast.warning(
        <ToastAddToCartError
          imgSrc={product?.images[0]}
          nameProduct={product?.name}
        />
      );
    }
  }
  function handleCountProducts(count) {
    setCountProduct(count);
    setProductAddToCart({
      ...productAddToCart,
      count: count,
    });
  }
  return (
    <div className="">
      <div className="container">
        <div className="title-link-wapper">
          <a href className="title-link">
            <div className="title-link-text">Chili</div>
            <div className="title-link-icon">&gt;</div>
          </a>
          <a href className="title-link">
            <div className="title-link-text">Qu???n ??o nam</div>
            <div className="title-link-icon">&gt;</div>
          </a>
          <a href className="title-link">
            <div className="title-link-text">??o Thun - S?? Mi</div>
            <div className="title-link-icon">&gt;</div>
          </a>
          <a href className="title-link"></a>
        </div>
      </div>
      <div>
        <div className="container">
          <div className="product-detail">
            <div className="product-detail-item">
              <div className="col-lg-5 col-md-5 col-12">
                <img
                  src={product?.images[0]}
                  className="product-slide__view-img"
                ></img>
              </div>
              <div className="col-lg col-md col">
                <div className="product-detail-item-body">
                  <a href className="product-detail-item-body__title">
                    {product?.name}
                  </a>
                  <div className="product-detail-item-body__rate">
                    <div className="product-detail-item-body__rate-star">
                      <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                      <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                      <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                      <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                      <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                    </div>
                    <div className="product-detail-item-body__rate-wapper">
                      <div className="product-detail-item-body__rate-cmt">
                        <span style={{ color: "#5c5c5c" }}>99</span>
                        ????nh gi??
                      </div>
                      <div className="product-detail-item-body__rate-sold">
                        <span style={{ color: "#5c5c5c" }}>150</span>
                        ???? b??n
                      </div>
                    </div>
                  </div>
                  <div className="product-detail-item-body__price">
                    <div className="product-detail-item-body__price-old">
                      {product?.price}??
                    </div>
                    <div className="product-detail-item-body__price-new">
                      {product?.promotionalPrice}??
                    </div>
                    <div className="product-detail-item-body__price-sale">
                      -{rateSale}%
                    </div>
                  </div>
                  <div className="product-detail-item-body__transport">
                    <div className="product-detail-item-body__transport-title">
                      Ph?? v???n chuy???n:
                    </div>
                    <div className="product-detail-item-body__transport-content">
                      <div className="product-detail-item-body__transport-content-1">
                        <img
                          src="/img/872111B6-AB7D-41DE-809B-295915DDCA46.svg"
                          alt=""
                          className="product-detail-item-body__transport-img"
                        />
                        <div className="product-detail-item-body__transport-content--text">
                          <div style={{ color: "var(--text-color-1)" }}>
                            Mi???n ph?? v???n chuy???n
                          </div>
                          <div>
                            Mi???n ph?? v???n chuy???n khi ?????t gi?? tr??? t???i thi???u
                          </div>
                        </div>
                      </div>
                      <div className="product-detail-item-body__transport-content-1">
                        <img
                          src="/img/872111B6-AB7D-41DE-809B-295915DDCA46.svg"
                          alt=""
                          className="product-detail-item-body__transport-img"
                        />
                        <div className="product-detail-item-body__transport-content--text-wapper">
                          <div className="product-detail-item-body__transport-content--text-1">
                            <div>V???n chuy???n t???i</div>
                            <div
                              style={{
                                color: "var(--text-color-1)",
                                paddingLeft: "6px",
                              }}
                            >
                              Qu???n L?? Ch??n, H???i Ph??ng
                            </div>
                          </div>
                          <div className="product-detail-item-body__transport-content--text-1">
                            <div>Ph?? v???n chuy???n</div>
                            <div
                              style={{
                                color: "var(--text-color-1)",
                                paddingLeft: "6px",
                              }}
                            >
                              7.500?? - 11.500??
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="product-detail-item-body__size">
                    <div className="product-detail-item-body__transport-title">
                      M??u:
                    </div>
                    <div className="product-detail-item-body__size-list">
                      {product?.details.map((color, i) => (
                        <button
                          key={i}
                          className={
                            i === 0
                              ? "product-detail-item-body__size-button active"
                              : "product-detail-item-body__size-button"
                          }
                          id={i}
                          onClick={() => handleChooseColor(i)}
                        >
                          {product?.details[i].color}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="product-detail-item-body__size">
                    <div className="product-detail-item-body__transport-title">
                      Size ??o:
                    </div>
                    <div className="product-detail-item-body__size-list">
                      {listSizes &&
                        listSizes.map((size, i) => (
                          <button
                            key={i}
                            className={
                              i === 0
                                ? "product-detail-item-body__color-button active"
                                : "product-detail-item-body__color-button"
                            }
                            id={i}
                            onClick={() => handleChooseSize(i)}
                          >
                            {size.size}
                          </button>
                        ))}
                    </div>
                  </div>
                  <div className="product-detail-item-body__size">
                    <div className="product-detail-item-body__transport-title">
                      Kho:
                    </div>
                    <div className="product-detail-item-body__size-list">
                      <button className="product-detail-item-body__inventory-button">
                        {inventory}
                      </button>
                    </div>
                  </div>
                  <div className="product-detail-item-body__num">
                    <div className="product-detail-item-body__transport-title">
                      S??? l?????ng:
                    </div>
                    <div className="cart-item-amount text-center">
                      <div className="cart-item-amount-body">
                        <button
                          disabled={countProduct <= 1}
                          className="cart-item-amount-body__button"
                          onClick={() => handleCountProducts(countProduct - 1)}
                        >
                          -
                        </button>
                        <input
                          type="text"
                          className="cart-item-amount-body__input"
                          value={countProduct}
                        />
                        <button
                          disabled={countProduct == inventory}
                          className="cart-item-amount-body__button"
                          onClick={() => handleCountProducts(countProduct + 1)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="product-detail-item-body__button">
                    <button
                      className="product-detail-item-body__button-cart"
                      onClick={() => handleAddToCart(product)}
                    >
                      <i className="product-detail-item-body__button-cart__icon fas fa-shopping-cart" />
                      Th??m v??o gi??? h??ng
                    </button>
                    <button
                      className="product-detail-item-body__button-buy"
                      onClick={() => handleBuyNow(product)}
                    >
                      Mua ngay
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="product-detail-info">
            <div className="product-detail-info__title">M?? t??? s???n ph???m</div>
            <div className="product-detail-info__content"></div>
          </div>
        </div>
      </div>
      <div className="container">
        <div className="product-detail-vote">
          <div className="product-detail-info__title">????nh gi?? s???n ph???m</div>
          <div className="product-detail-vote-choose">
            <div className="col-lg-4 col-md-6 col-6 gutter-z">
              <div className="product-detail-vote-choose__left text-center">
                <div className="product-detail-vote-choose__left-title">
                  4.8/5
                </div>
                <div className="product-detail-vote-choose__left-rate">
                  <div className="product-detail-item-body__rate-star">
                    <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                    <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                    <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                    <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                    <i className="product-detail-item-body__rate-star-icon fas fa-star rated" />
                  </div>
                </div>
                <div className="product-detail-vote-choose__left-text">
                  5k ????nh Gi??
                </div>
              </div>
            </div>
            <div className="col-lg-8 col-md-12 col-12 gutter-z text-center">
              <div className="product-detail-vote-choose__list">
                <button className="product-detail-vote-choose__list-button product-detail-vote-choose__list-button-active">
                  T???t C???
                </button>
                <button className="product-detail-vote-choose__list-button">
                  5
                  <i className="product-detail-vote-choose__star-icon fas fa-star rated" />
                  (3k)
                </button>
                <button className="product-detail-vote-choose__list-button">
                  4
                  <i className="product-detail-vote-choose__star-icon fas fa-star rated" />
                  (3k)
                </button>
                <button className="product-detail-vote-choose__list-button">
                  3
                  <i className="product-detail-vote-choose__star-icon fas fa-star rated" />
                  (3k)
                </button>
                <button className="product-detail-vote-choose__list-button">
                  2
                  <i className="product-detail-vote-choose__star-icon fas fa-star rated" />
                  (3k)
                </button>
                <button className="product-detail-vote-choose__list-button">
                  1
                  <i className="product-detail-vote-choose__star-icon fas fa-star rated" />
                  (3k)
                </button>
                <button className="product-detail-vote-choose__list-button">
                  B??nh Lu???n (2.5k)
                </button>
                <button className="product-detail-vote-choose__list-button">
                  ????nh Gi?? C???a B???n (2.5k)
                </button>
              </div>
            </div>
          </div>
          <div className="product-detail-review">
            <div className="product-detail-review-item">
              <div className="product-detail-review-item__left">
                <img
                  src="/img/36CF001D-D227-4027-8429-8D90B0CA2295.png"
                  alt=""
                  className="product-detail-review-item__img"
                />
              </div>
              <div className="product-detail-review-item__body">
                <div className="product-detail-review-item__body-title">
                  L?? Ng???c Minh Ch??u
                </div>
                <div className="product-detail-review-item__body-rate">
                  <div className="product-detail-review-item__body-rate-star">
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                  </div>
                </div>
                <div className="product-detail-review-item__body-text">
                  Ch????t thoa??ng ma??t, kha?? ????n, gia?? ca?? phu?? h????p, ship nhanh
                </div>
                <div className="product-detail-review-item__body-time">
                  <span>20-02-2020</span>
                  <span>16:33</span>
                </div>
              </div>
            </div>
            <div className="product-detail-review-item">
              <div className="product-detail-review-item__left">
                <img
                  src="/img/36CF001D-D227-4027-8429-8D90B0CA2295.png"
                  alt=""
                  className="product-detail-review-item__img"
                />
              </div>
              <div className="product-detail-review-item__body">
                <div className="product-detail-review-item__body-title">
                  L?? Ng???c Minh Ch??u
                </div>
                <div className="product-detail-review-item__body-rate">
                  <div className="product-detail-review-item__body-rate-star">
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                    <i className="product-detail-review-item__body-rate-star-icon fas fa-star rated" />
                  </div>
                </div>
                <div className="product-detail-review-item__body-text">
                  V???i r???t m??t, m???n, kh?? nh??n. Ki???u d??ng ???n. Giao h??ng h??i l??u.
                  Nh??ng k sao. S???n ph???m r???t ????ng mua.
                </div>
                <div className="product-detail-review-item__body-time">
                  <span>20-02-2020</span>
                  <span>16:33</span>
                </div>
              </div>
            </div>
          </div>
          <div className="product-detail-same">
            <div className="product-list-title">S???N PH???M C??NG LO???I</div>
            <div className="product-detail-same-wapper">
              <div className="product-detail-same-item-wapper">
                <div className="col-lg-3 col-md-3 col-md-6">
                  <div className="product-detail-same-item">
                    <div className="product-detail-same-item__title">
                      CHILI SHOP
                    </div>
                    <a href className="product-detail-same-item__top">
                      <img
                        src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png"
                        alt=""
                        className="product-detail-same-item__img"
                      />
                    </a>
                    <div className="product-detail-same-item__body">
                      <a href className="product-detail-same-item__body-title">
                        ??o S?? Mi Nam Tr???ng 2020
                      </a>
                      <div className="product-detail-same-item__body-price">
                        <div className="product-detail-same-item__body-price-old">
                          450.000??
                        </div>
                        <div className="product-detail-same-item__body-price-new">
                          450.000??
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
                          ???? b??n 99
                        </div>
                      </div>
                      <div className="product-detail-same-item__city">
                        Tp. H??? Ch?? Minh
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-md-6">
                  <div className="product-detail-same-item">
                    <div className="product-detail-same-item__title">
                      CHILI SHOP
                    </div>
                    <a href className="product-detail-same-item__top">
                      <img
                        src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png"
                        alt=""
                        className="product-detail-same-item__img"
                      />
                    </a>
                    <div className="product-detail-same-item__body">
                      <a href className="product-detail-same-item__body-title">
                        ??o S?? Mi Nam Tr???ng 2020
                      </a>
                      <div className="product-detail-same-item__body-price">
                        <div className="product-detail-same-item__body-price-old">
                          450.000??
                        </div>
                        <div className="product-detail-same-item__body-price-new">
                          450.000??
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
                          ???? b??n 99
                        </div>
                      </div>
                      <div className="product-detail-same-item__city">
                        Tp. H??? Ch?? Minh
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-md-6">
                  <div className="product-detail-same-item">
                    <div className="product-detail-same-item__title">
                      CHILI SHOP
                    </div>
                    <a href className="product-detail-same-item__top">
                      <img
                        src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png"
                        alt=""
                        className="product-detail-same-item__img"
                      />
                    </a>
                    <div className="product-detail-same-item__body">
                      <a href className="product-detail-same-item__body-title">
                        ??o S?? Mi Nam Tr???ng 2020
                      </a>
                      <div className="product-detail-same-item__body-price">
                        <div className="product-detail-same-item__body-price-old">
                          450.000??
                        </div>
                        <div className="product-detail-same-item__body-price-new">
                          450.000??
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
                          ???? b??n 99
                        </div>
                      </div>
                      <div className="product-detail-same-item__city">
                        Tp. H??? Ch?? Minh
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-md-6">
                  <div className="product-detail-same-item">
                    <div className="product-detail-same-item__title">
                      CHILI SHOP
                    </div>
                    <a href className="product-detail-same-item__top">
                      <img
                        src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png"
                        alt=""
                        className="product-detail-same-item__img"
                      />
                    </a>
                    <div className="product-detail-same-item__body">
                      <a href className="product-detail-same-item__body-title">
                        ??o S?? Mi Nam Tr???ng 2020
                      </a>
                      <div className="product-detail-same-item__body-price">
                        <div className="product-detail-same-item__body-price-old">
                          450.000??
                        </div>
                        <div className="product-detail-same-item__body-price-new">
                          450.000??
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
                          ???? b??n 99
                        </div>
                      </div>
                      <div className="product-detail-same-item__city">
                        Tp. H??? Ch?? Minh
                      </div>
                    </div>
                    <div className="product-detail-same-item__sale">
                      Sale 30%
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-md-6">
                  <div className="product-detail-same-item">
                    <div className="product-detail-same-item__title">
                      CHILI SHOP
                    </div>
                    <a href className="product-detail-same-item__top">
                      <img
                        src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png"
                        alt=""
                        className="product-detail-same-item__img"
                      />
                    </a>
                    <div className="product-detail-same-item__body">
                      <a href className="product-detail-same-item__body-title">
                        ??o S?? Mi Nam Tr???ng 2020
                      </a>
                      <div className="product-detail-same-item__body-price">
                        <div className="product-detail-same-item__body-price-old">
                          450.000??
                        </div>
                        <div className="product-detail-same-item__body-price-new">
                          450.000??
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
                          ???? b??n 99
                        </div>
                      </div>
                      <div className="product-detail-same-item__city">
                        Tp. H??? Ch?? Minh
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-md-6">
                  <div className="product-detail-same-item">
                    <div className="product-detail-same-item__title">
                      CHILI SHOP
                    </div>
                    <a href className="product-detail-same-item__top">
                      <img
                        src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png"
                        alt=""
                        className="product-detail-same-item__img"
                      />
                    </a>
                    <div className="product-detail-same-item__body">
                      <a href className="product-detail-same-item__body-title">
                        ??o S?? Mi Nam Tr???ng 2020
                      </a>
                      <div className="product-detail-same-item__body-price">
                        <div className="product-detail-same-item__body-price-old">
                          450.000??
                        </div>
                        <div className="product-detail-same-item__body-price-new">
                          450.000??
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
                          ???? b??n 99
                        </div>
                      </div>
                      <div className="product-detail-same-item__city">
                        Tp. H??? Ch?? Minh
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-md-6">
                  <div className="product-detail-same-item">
                    <div className="product-detail-same-item__title">
                      CHILI SHOP
                    </div>
                    <a href className="product-detail-same-item__top">
                      <img
                        src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png"
                        alt=""
                        className="product-detail-same-item__img"
                      />
                    </a>
                    <div className="product-detail-same-item__body">
                      <a href className="product-detail-same-item__body-title">
                        ??o S?? Mi Nam Tr???ng 2020
                      </a>
                      <div className="product-detail-same-item__body-price">
                        <div className="product-detail-same-item__body-price-old">
                          450.000??
                        </div>
                        <div className="product-detail-same-item__body-price-new">
                          450.000??
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
                          ???? b??n 99
                        </div>
                      </div>
                      <div className="product-detail-same-item__city">
                        Tp. H??? Ch?? Minh
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-3 col-md-3 col-md-6">
                  <div className="product-detail-same-item">
                    <div className="product-detail-same-item__title">
                      CHILI SHOP
                    </div>
                    <a href className="product-detail-same-item__top">
                      <img
                        src="/img/7F5EF206-2997-45DE-A8AC-6CCE2BA0774C.png"
                        alt=""
                        className="product-detail-same-item__img"
                      />
                    </a>
                    <div className="product-detail-same-item__body">
                      <a href className="product-detail-same-item__body-title">
                        ??o S?? Mi Nam Tr???ng 2020
                      </a>
                      <div className="product-detail-same-item__body-price">
                        <div className="product-detail-same-item__body-price-old">
                          450.000??
                        </div>
                        <div className="product-detail-same-item__body-price-new">
                          450.000??
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
                          ???? b??n 99
                        </div>
                      </div>
                      <div className="product-detail-same-item__city">
                        Tp. H??? Ch?? Minh
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <ul className="col-12 product-highlight__button-list">
                <li className="product-highlight__button-item ">
                  <a href className="product-highlight__button-link">
                    &lt;
                  </a>
                </li>
                <li className="product-highlight__button-item">
                  <a
                    href
                    className="product-highlight__button-link product-highlight__button-item-active"
                  >
                    1
                  </a>
                </li>
                <li className="product-highlight__button-item">
                  <a href className="product-highlight__button-link">
                    2
                  </a>
                </li>
                <li className="product-highlight__button-item">
                  <a href className="product-highlight__button-link">
                    3
                  </a>
                </li>
                <li className="product-highlight__button-item">
                  <a href className="product-highlight__button-link">
                    4
                  </a>
                </li>
                <li className="product-highlight__button-item">
                  <a href className="product-highlight__button-link">
                    5
                  </a>
                </li>
                <li className="product-highlight__button-item">
                  <a href className="product-highlight__button-link">
                    6
                  </a>
                </li>
                <li className="product-highlight__button-item">
                  <a href className="product-highlight__button-link">
                    ...
                  </a>
                </li>
                <li className="product-highlight__button-item">
                  <a href className="product-highlight__button-link">
                    &gt;
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetail;
