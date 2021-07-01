import React, { useState, useEffect } from "react";
import axios from "axios";
import PropTypes from "prop-types";
import { useHistory, Link } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input, FormFeedback, FormGroup } from "reactstrap";

ChangePass.propTypes = {
  onSubmit: PropTypes.func,
};

ChangePass.defaultProps = {
  onSubmit: null,
};
const formChangePass = yup.object().shape({
  oldPassword: yup
    .string()
    .min(6, "Mật khẩu tối thiểu là 6 ký tự")
    .max(20)
    .required("Bạn phải nhập mật khẩu"),
  newPassword: yup
    .string()
    .min(6, "Mật khẩu tối thiểu là 6 ký tự")
    .max(20)
    .required("Bạn phải nhập mật khẩu"),
});

function ChangePass(props) {
  const { onSubmit } = props;
  const history = useHistory();
  const [samePass, setSamePass] = useState(false);
  const [wrongPass, setWrongPass] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { isSubmitting, isSubmitted, errors },
  } = useForm({
    resolver: yupResolver(formChangePass),
  });

  function handleOnSumitForm(data) {
    console.log(data);
    axios
      .put("http://34.126.102.192:3005/api/v1/user/change-pass", data)
      .then((res) => {
        console.log(res);
        if (res.data.code === 0) {
          history.push("/thong-tin-ca-nhan");
        }
        if (res.data.code === -1) {
          setSamePass(true);
          setWrongPass(false);
        }
        if (res.data.code === -101) {
          setWrongPass(true);
          setSamePass(false);
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
                    {...register("oldPassword")}
                    invalid={errors.password}
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  />

                  {errors.oldPassword && (
                    <FormFeedback>{errors.oldPassword?.message}</FormFeedback>
                  )}
                </FormGroup>
              </div>
              <div className="login-id">
                <FormGroup>
                  <Input
                    {...register("newPassword")}
                    invalid={errors.newPassword}
                    type="password"
                    placeholder="Nhập mật khẩu mới"
                  />

                  {errors.newPassword && (
                    <FormFeedback>{errors.newPassword?.message}</FormFeedback>
                  )}
                </FormGroup>
              </div>
              {samePass === true && (
                <p style={{ color: "red", textAlign: "center" }}>
                  Trùng mật khẩu
                </p>
              )}
              {wrongPass === true && (
                <p style={{ color: "red", textAlign: "center" }}>
                  Sai mật khẩu
                </p>
              )}
              <button
                className="login-button"
                onClick={handleSubmit(handleOnSumitForm)}
              >
                Xác nhận
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ChangePass;
