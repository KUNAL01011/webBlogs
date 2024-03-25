import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { login, register, validation,getUser } from "./authApi";

//That is the initial state of your data;
const initialState = {
  user: {},
  message:"",
  status: false,
};

// Requesting to fatch all data form backend using fatchAlltodo
export const loginAsync = createAsyncThunk("user/login", async (user) => {
  const response = await login(user);
  console.log(response.data.user);
  return response.data.user;
});

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  const response = await getUser();
  return response.data;
});

export const registerAsync = createAsyncThunk("user/register", async (data) => {
  const response = await register(data);
  return response.data;
});

export const validationAsync = createAsyncThunk(
  "user/validation",
  async (otp) => {
    const response = await validation(otp);
    return response.data;
  }
);

// creating a slice for adding objects in blogs array
export const authSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = false;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload;
      })
      .addCase(registerAsync.pending, (state) => {
        state.status = false;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.status = true;
      })
      .addCase(validationAsync.pending, (state) => {
        state.status = false;
      })
      .addCase(validationAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(validationAsync.fulfilled, (state, action) => {
        state.status = true;
        state.mesg = action.payload;
      })
      .addCase(loginAsync.pending, (state) => {
        state.status = false;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload;
      });
  },
});

export default authSlice.reducer;
