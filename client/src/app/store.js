import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../features/auth/authSlice';
import blogReducer from '../features/blogs/blogSlice'


export const store = configureStore({
  reducer: {
    user:userReducer,
    blog:blogReducer
  },
});
