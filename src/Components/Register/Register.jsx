import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input, FormFeedback, FormGroup, Label } from "reactstrap";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("Bạn phải nhập đúng Email")
    .required("Bạn phải nhập email"),
  fullName: yup.string().required("Bạn phải nhập tên"),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Nhập đúng số điện thoại")
    .required("Bạn phải nhập điện thoại"),
});

function Register(props) {
  const history = useHistory();

  const {
    register,
    handleSubmit,
    watch,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const [checkEmail, setCheckEmail] = useState(true);

  function handleOnSumitForm(data) {
    console.log(data);
    axios
      .post("http://34.126.102.192:3005/api/v1/auth/register", data)
      .then((res) => {
        if (res.data.code === 0) {
          history.push("/dang-nhap");
        } else if (res.data.code === -1) {
          setCheckEmail(false);
          console.log(checkEmail);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <div className="container">
      <form onSubmit={handleSubmit(handleOnSumitForm)}>
        <div className="login">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="login-title">ĐĂNG KÝ</div>
            <div className="login-id">
              <FormGroup>
                <Input
                  {...register("email")}
                  invalid={errors.email}
                  type="email"
                  placeholder="Email"
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
            <div className="login-id">
              <FormGroup>
                <Input
                  {...register("fullName")}
                  invalid={errors.fullName}
                  type="text"
                  placeholder="Họ và tên"
                />

                {errors.fullName && (
                  <FormFeedback>{errors.fullName?.message}</FormFeedback>
                )}
              </FormGroup>
            </div>
            <div className="login-id">
              <FormGroup>
                <Input
                  {...register("phoneNumber")}
                  invalid={errors.phoneNumber}
                  type="text"
                  placeholder="Số điện thoại"
                />

                {errors.phoneNumber && (
                  <FormFeedback>{errors.phoneNumber?.message}</FormFeedback>
                )}
              </FormGroup>
            </div>
            <div className="login-id">
              <FormGroup>
                <label for="terms">
                  <input
                    {...register("terms")}
                    type="checkbox"
                    invalid={errors.terms}
                    name="terms"
                    id="terms"
                  />
                  Chính sách và điều khoản
                  {/* <Input
                    {...register("terms")}
                    type="checkbox"
                    name="terms"
                    id="terms"
                  />
                  {errors.terms && (
                    <FormFeedback>{errors.terms?.message}</FormFeedback>
                  )} */}
                  {errors.terms && (
                    <div
                      className="invalid-feedback"
                      style={{ display: "block" }}
                    >
                      {errors.terms?.message}
                    </div>
                  )}
                </label>
              </FormGroup>
            </div>

            {checkEmail == false && (
              <p style={{ color: "red", textAlign: "center" }}>
                Email đã đăng ký !
              </p>
            )}
            <button
              type="submit"
              className="login-button"
              onClick={handleSubmit(handleOnSumitForm)}
            >
              Đăng ký
            </button>
            <div className="login-register">
              Đã có tài khoản?
              <Link to="/dang-nhap" className="login-register-link">
                Đăng nhập
              </Link>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Register;
