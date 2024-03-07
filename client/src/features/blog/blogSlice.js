import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fatchAllTodo } from "./blogApi";

//That is the initial state of your data;
const initialState = {
  blogs: [
    {
      id: 1,
      heading: "react redux",
      content: {
        data: "redux is a state management tool",
      },
    },
  ],
};

// Requesting to fatch all data form backend using fatchAlltodo
export const fatchAllTodoAsync = createAsyncThunk(
  "blogs/fetchAllTodo",
  async () => {
    const response = await fatchAllTodo();
    return response.data;
  }
);

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fatchAllTodoAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fatchAllTodoAsync.rejected, (state) => {
        state.status = "reject";
        
      })
      .addCase(fatchAllTodoAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.value += action.payload;
      });
  },
});

// export const { } = blogSlice.actions;
export default blogSlice.reducer;
