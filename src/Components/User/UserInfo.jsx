import PropTypes from "prop-types";
import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

UserInfo.propTypes = {
  users: PropTypes.object,
};

function UserInfo(props) {
  const history = useHistory();

  const [user, setUser] = useState();

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

  function handleOnClickEdit(user) {
    history.push("/thong-tin-ca-nhan/sua-thong-tin");
  }
  function handleLogout() {
    localStorage.removeItem("token");
    history.push("/");
    window.location.reload();
  }
  function handlePassChange() {
    history.push("/doi-mat-khau");
  }
  return (
    <div>
      <div className="container">
        <div>
          <div className="personal-info-content">
            <div className="col-lg-4 col-md-6 col-12">
              <div className="personal-info-left">
                <img
                  src={user?.avatarUrl}
                  alt=""
                  className="personal-info-left__img"
                />
              </div>
            </div>
            <div className="col-lg-6 col-md-6 col-12">
              <div className="personal-info-body">
                <div className="personal-info-body__name">{user?.fullName}</div>
                <div className="personal-info-body__edit-button--wapper">
                  <button
                    className="personal-info-body__edit"
                    onClick={() => handleOnClickEdit(user)}
                  >
                    <i className="personal-info-body__edit-icon fas fa-pencil-alt" />
                    Sửa Hồ Sơ
                  </button>
                </div>
                <div className="personal-info-body__wapper">
                  <span className="personal-info-body__title">Giới tính: </span>
                </div>
                <div className="personal-info-body__wapper">
                  <div className="personal-info-body__title">Email:</div>
                  <div> {user?.email}</div>
                </div>
                <div className="personal-info-body__wapper">
                  <div className="personal-info-body__title">
                    Số điện thoại:
                  </div>
                  <div>{user?.phoneNumber}</div>
                </div>
                <div className="personal-info-body__wapper">
                  <span className="personal-info-body__title">Địa chỉ: </span>
                </div>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  className="login-button"
                  onClick={handlePassChange}
                  style={{ width: "50%", marginTop: "30px" }}
                >
                  Đổi mật khẩu
                </button>
              </div>
              <div style={{ textAlign: "center" }}>
                <button
                  className="login-button"
                  onClick={handleLogout}
                  style={{ width: "50%", marginTop: "30px" }}
                >
                  Đăng xuất
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserInfo;
