import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllBlogs } from "./blogApi";

//That is the initial state of your data;
const initialState = {
  blogs: [],
  status:'',
};

// Requesting to fatch all data form backend using fatchAlltodo
export const getAllBlogsAsync = createAsyncThunk(
  "blogs/getAllBlogs",
  async () => {
    const response = await getAllBlogs();
    return response.data;
  }
);


// creating a slice for adding objects in blogs array 
export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllBlogsAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllBlogsAsync.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(getAllBlogsAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.blogs = action.payload;
      });
  },
});

export const getData = (state) => state.blogs;
export default blogSlice.reducer;
