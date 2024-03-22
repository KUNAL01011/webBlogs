import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { deleteBlog, getAllBlogs } from "./blogApi";

//That is the initial state of your data;
const initialState = {
  blogs: [],
  status: "",
};

// Requesting to fatch all data form backend using fatchAlltodo
export const getAllBlogsAsync = createAsyncThunk(
  "blogs/getAllBlogs",
  async () => {
    const response = await getAllBlogs();
    return response.data;
  }
);

export const deleteBlogAsync = createAsyncThunk(
  "blogs/deleteBlog",
  async (blog_id) => {
    const response = await deleteBlog(blog_id);
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
      })
      .addCase(deleteBlogAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteBlogAsync.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(deleteBlogAsync.fulfilled, (state, action) => {
        state.status = "idle";
        // Assuming that the action.payload contains the ID of the deleted blog
        const deletedBlogId = action.payload;
        console.log("printing the fucking data ", deletedBlogId)
        // Removing the deleted blog from the state's blogs array
        state.blogs = state.blogs.filter(blog => blog._id !== deletedBlogId._id);
      });
  },
});

export const getData = (state) => state.blog.blogs;
export default blogSlice.reducer;
