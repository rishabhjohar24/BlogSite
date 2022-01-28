import { configureStore } from "@reduxjs/toolkit";

import loginReducer from "./login";
import blogsReducer from "./blogs";

const store = configureStore({
  reducer: { login: loginReducer, blogs: blogsReducer },
});

export default store;
