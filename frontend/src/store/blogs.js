import { createSlice } from "@reduxjs/toolkit";

const initalBlogs = { blogs: [] };

const blogSlice = createSlice({
  name: "blogs",
  initialState: initalBlogs,
  reducers: {
    editBlogreducer(state, action) {},
  },
});

export const blogActions = blogSlice.actions;

export default blogSlice.reducer;
