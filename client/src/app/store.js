import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "../features/blogs/blogSlice";
import tokenReducer from "../features/blogs/tokenSlice";

export const store = configureStore({
  reducer: {
    blog:blogReducer,
    token:tokenReducer,
  },
});
