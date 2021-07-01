import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { Input, FormFeedback, FormGroup, Label } from "reactstrap";
import { useSelector } from "react-redux";

const phoneRegex = RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
const validationSchema = yup.object().shape({
  fullName: yup.string().required("Bạn phải nhập tên").default(),
  phoneNumber: yup
    .string()
    .matches(phoneRegex, "Nhập đúng số điện thoại")
    .required("Bạn phải nhập điện thoại")
    .default(),
});
function UserEdit(props) {
  const [user, setUser] = useState({});
  const history = useHistory();
  const [imageFile, setImageFile] = useState();
  const [file, setFile] = useState("");
  const [hideSaveBtn, setHideSaveBtn] = useState(false);

  useEffect(() => {
    axios
      .get("http://34.126.102.192:3005/api/v1/user")
      .then((res) => {
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  function handleOnChangeInputEdit(e) {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  }
  function handleOnChangeImg(e) {
    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setFile(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
    setImageFile(e.target.files[0]);
    setHideSaveBtn(true);
  }
  function handleSubmitImg() {
    setHideSaveBtn(false);
    let bodyFormData = new FormData();
    bodyFormData.append("file", imageFile);
    axios({
      url: "http://34.126.102.192:3005/api/v1/file",
      method: "POST",
      data: bodyFormData,
    })
      .then((res) => {
        setUser({
          ...user,
          avatarUrl: `http://34.126.102.192:3005${res.data.fileUrl}`,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }
  function handleOnSumitForm(data) {
    axios
      .put("http://34.126.102.192:3005/api/v1/user", user)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/thong-tin-ca-nhan");
    window.location.reload();
  }
  return (
    <div className="container">
      <div className="login-title">Sửa thông tin</div>
      <div className="login">
        <div className="col-lg-6 col-md-8 col-12">
          <div className="img-edit-wapper">
            <img
              src={!file ? user?.avatarUrl : file}
              alt=""
              className="personal-info-left__img"
            />
            <Input
              type="file"
              id="avatarUrl"
              name="avatarUrl"
              accept="image/*"
              onChange={handleOnChangeImg}
              className="input-file-img"
            />
            {hideSaveBtn === false ? (
              <Label
                htmlFor="avatarUrl"
                style={{ paddingTop: "12px", cursor: "pointer" }}
              >
                <i class="fas fa-camera"></i>
                Thay ảnh
              </Label>
            ) : (
              <button
                type="submit"
                className="login-button"
                onClick={handleSubmitImg}
                style={{ marginTop: "12px", width: "200px" }}
              >
                Lưu
              </button>
            )}
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit(handleOnSumitForm)}>
        <div className="login">
          <div className="col-lg-6 col-md-8 col-12">
            <div className="login-id">
              <FormGroup>
                <Input
                  {...register("fullName")}
                  invalid={errors.fullName}
                  type="text"
                  value={user.fullName}
                  onChange={handleOnChangeInputEdit}
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
                  value={user.phoneNumber}
                  onChange={handleOnChangeInputEdit}
                />

                {errors.phoneNumber && (
                  <FormFeedback>{errors.phoneNumber?.message}</FormFeedback>
                )}
              </FormGroup>
            </div>
            <button
              type="submit"
              className="login-button"
              onClick={handleSubmit(handleOnSumitForm)}
            >
              Xác nhận
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default UserEdit;
