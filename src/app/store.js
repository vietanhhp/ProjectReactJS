import { configureStore } from "@reduxjs/toolkit";

import cartReducers from "../Components/Homepage/Product/productSlice";
import loginReducers from "../Components/Login/loginSlice";
// import userReducers from "../Components/User/userSlice";

const rootReducer = {
  cart: cartReducers,
  login: loginReducers,
  // user: userReducers,
};

const store = configureStore({
  reducer: rootReducer,
});

export default store;
