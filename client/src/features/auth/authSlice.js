import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register, validation } from "./authApi";

//That is the initial state of your data;
const initialState = {
  user: {},
  status: "",
};

// Requesting to fatch all data form backend using fatchAlltodo
export const loginAsync = createAsyncThunk(
  "user/login",
  async (user) => {
    const response = await login(user);
    return response.data;
  }
);

export const registerAsync = createAsyncThunk(
  'user/register',
  async (data) => {
    const response = await register(data);
    return response.data;
  }
)

export const validationAsync = createAsyncThunk(
  'user/validation',
  async (otp) => {
    const response = await validation(otp);
    return response.data;
  }
)


// creating a slice for adding objects in blogs array
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.status = "idle";
      })
      .addCase(validationAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(validationAsync.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(validationAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.mesg = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = "loading";
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = "reject";
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = "idle";
        state.user = action.payload;
      });
  },
});

export const getUser = (state) => state.user.user;
export default authSlice.reducer;
