import { createSlice } from "@reduxjs/toolkit";

const products = [];
const cart = createSlice({
  name: "cart",
  initialState: products,
  reducers: {
    addProduct: (state, action) => {
      state.push(action.payload);
    },
    removeProduct: (state, action) => {
      const removeProduct = action.payload;
      console.log(removeProduct);
      return state.filter(
        (product, i) =>
          state[i][1].code !== removeProduct.productId ||
          state[i][0].size !== removeProduct.size ||
          state[i][0].color !== removeProduct.color
      );
    },
    editProduct: (state, action) => {
      const newProduct = action.payload;
      console.log(newProduct);
      const newProductIndex = state.findIndex(
        (product, i) => state[i][1].code === newProduct[1].code
      );
      if (newProductIndex >= 0) {
        state[newProductIndex][0].count = newProduct[0];
      }
    },
    deleteProduct: (state, action) => {
      return products;
    },
  },
});
const { reducer, actions } = cart;
export const {
  addProduct,
  removeProduct,
  deleteProduct,
  editProduct,
} = actions;
export default reducer;
