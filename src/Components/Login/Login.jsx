import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getLoginToken } from "./loginSlice";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input, FormFeedback, FormGroup } from "reactstrap";

Login.propTypes = {
  onSubmit: PropTypes.func,
};

Login.defaultProps = {
  onSubmit: null,
};
const formLogin = yup.object().shape({
  email: yup
    .string()
    .email("Bạn phải nhập đúng Email")
    .required("Bạn phải nhập email"),
  password: yup
    .string()
    .min(6, "Mật khẩu tối thiểu là 6 ký tự")
    .max(20)
    .required("Bạn phải nhập mật khẩu"),
});

function Login(props) {
  const { onSubmit } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({
    resolver: yupResolver(formLogin),
  });
  const [checkLogin, setCheckLogin] = useState(true);
  function handleOnSumitForm(data) {
    axios
      .post("http://34.126.102.192:3005/api/v1/auth/login", data)
      .then((res) => {
        localStorage.setItem("token", res.data.accessToken);
        if (res.data.accessToken !== undefined) {
          const action = getLoginToken(res.data.accessToken);
          console.log({ action });
          dispatch(action);
        }
        console.log(res);

        if (res.data.code === 0) {
          history.push("/");
          window.location.reload();
        } else if (res.data.code === -101) {
          setCheckLogin(false);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  return (
    <div>
      <form onSubmit={handleSubmit(handleOnSumitForm)}>
        <div className="container">
          <div className="login">
            <div className="col-lg-6 col-md-8 col-12">
              <div className="login-title">ĐĂNG NHẬP</div>
              <div className="login-id">
                <FormGroup>
                  <Input
                    {...register("email")}
                    invalid={errors.email}
                    type="email"
                    placeholder="Nhập email"
                  />

                  {errors.email && (
                    <FormFeedback>{errors.email?.message}</FormFeedback>
                  )}
                </FormGroup>
              </div>
              <div className="login-id">
                {/* <Label for="password">Password</Label> */}
                <FormGroup>
                  <Input
                    {...register("password")}
                    invalid={errors.password}
                    type="password"
                    placeholder="Password"
                  />

                  {errors.password && (
                    <FormFeedback>{errors.password?.message}</FormFeedback>
                  )}
                </FormGroup>
              </div>
              {checkLogin == false && (
                <p style={{ color: "red", textAlign: "center" }}>
                  Sai email hoặc mật khẩu !
                </p>
              )}
              <button
                className="login-button"
                onClick={handleSubmit(handleOnSumitForm)}
              >
                Đăng nhập
              </button>
              <a href className="login-forgot-pass">
                Quên mật khẩu?
              </a>
              <div className="login-with">
                Hoặc đăng nhập bằng
                <a href className="login-with-link">
                  <i className="login-with-icon-f fab fa-facebook-f" />
                </a>
                <a href className="login-with-link">
                  <i className="login-with-icon-g fab fa-google-plus-g" />
                </a>
              </div>
              <div className="login-register">
                Không có tài khoản?
                <Link to="/dang-ky" className="login-register-link">
                  Đăng ký
                </Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
