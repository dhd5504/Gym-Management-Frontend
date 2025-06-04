import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gridView: true,
  productDetailLoading: false,
  productsLoading: false,
  loginLoading: false,
  loginError: null, // Thêm state lưu lỗi login
  registerLoading: false,
  registerError: null, // Thêm state lưu lỗi register
  addPrductLoading: false,
  updateProductLoading: false,
};

const uiSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    toggleView(state) {
      state.gridView = !state.gridView;
    },

    loginLoading(state, action) {
      // Nhận payload true/false thay vì toggle
      state.loginLoading = action.payload;
    },
    setLoginError(state, action) {
      state.loginError = action.payload;
    },
    registerLoading(state, action) {
      state.registerLoading = action.payload;
    },
    setRegisterError(state, action) {
      state.registerError = action.payload;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;