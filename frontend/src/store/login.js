import { createSlice } from "@reduxjs/toolkit";

const initialLoginState = {
  isLoggedIn: localStorage.length ? localStorage.getItem("isLoggedIn") : false,
  userInfo: localStorage.length
    ? {
        name: localStorage.getItem("name"),
        email: localStorage.getItem("email"),
        _id: localStorage.getItem("_id"),
        token: localStorage.getItem("token"),
      }
    : {},
};

const loginSlice = createSlice({
  name: "login",
  initialState: initialLoginState,
  reducers: {
    loginReducer(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
    logoutReducer(state) {
      state.isLoggedIn = !state.isLoggedIn;
    },
    currentUserInfo(state, action) {
      const user = {
        name: action.payload.name,
        email: action.payload.email,
        _id: action.payload._id,
        token: action.payload.token,
      };
      state.userInfo = user;
    },
    clearUserInfo(state) {
      state.userInfo = {};
    },
  },
});

export const loginAction = loginSlice.actions;

export default loginSlice.reducer;
