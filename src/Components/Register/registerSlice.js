import { createSlice } from "@reduxjs/toolkit";
const userData = {};
const register = createSlice({
  name: "register",
  initialState: userData,
  reducers: {
    getUserData: (state, action) => {
      return (state = action.payload);
    },
  },
});
const { reducer, actions } = register;
export const { getUserData } = actions;
export default reducer;
