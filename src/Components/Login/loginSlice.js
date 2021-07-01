import { createSlice } from "@reduxjs/toolkit";
const token = "";
const login = createSlice({
  name: "login",
  initialState: token,
  reducers: {
    getLoginToken: (state, action) => {
      return (state = action.payload);
    },
  },
});
const { reducer, actions } = login;
export const { getLoginToken } = actions;
export default reducer;
