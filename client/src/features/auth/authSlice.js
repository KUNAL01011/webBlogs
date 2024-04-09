import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser, activateUser,getUser,updateUserDetail, getUserByUsername } from "./authApi";

//That is the initial state of your data;
const initialState = {
  user: {},
  authorProfile:{},
  status: false,
};

// Requesting to fatch all data form backend using fatchAlltodo
export const loginAsync = createAsyncThunk("user/login", async (user) => {
  const response = await loginUser(user);
  console.log(response.data.user);
  return response.data.user;
});

export const getUserAsync = createAsyncThunk("user/getUser", async () => {
  const response = await getUser();
  return response.data;
});
export const getUserByUsernameAsync = createAsyncThunk("user/getUserByUsername", async (username) => {
  const response = await getUserByUsername(username);
  return response.data;
});

export const registerAsync = createAsyncThunk("user/register", async (data) => {
  const response = await registerUser(data);
  return response.data;
});

export const activateUserAsync = createAsyncThunk(
  "user/validation",
  async (otp) => {
    const response = await activateUser(otp);
    return response.data;
  }
);

export const updateUserDetailAsync = createAsyncThunk(
  "user/updateUserDetail",
  async (userData) => {
    const response = await updateUserDetail(userData);
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
      .addCase(getUserAsync.pending, (state) => { // to get the current user data
        state.status = false;
      })
      .addCase(getUserAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload[0];
      })
      .addCase(getUserByUsernameAsync.pending, (state) => { // to get the current user data
        state.status = false;
      })
      .addCase(getUserByUsernameAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(getUserByUsernameAsync.fulfilled, (state, action) => {
        state.status = true;
        state.authorProfile = action.payload[0];
      })
      .addCase(registerAsync.pending, (state) => { //for registring the user 
        state.status = false;
      })
      .addCase(registerAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(registerAsync.fulfilled, (state) => {
        state.status = true;
      })
      .addCase(activateUserAsync.pending, (state) => { // for activate the user
        state.status = false;
      })
      .addCase(activateUserAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(activateUserAsync.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload.data;
      })
      .addCase(loginAsync.pending, (state) => { // for login route 
        state.status = false;
      })
      .addCase(loginAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(loginAsync.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload.data;
      })
      .addCase(updateUserDetailAsync.pending, (state) => { // for update the user detail 
        state.status = false;
      })
      .addCase(updateUserDetailAsync.rejected, (state) => {
        state.status = false;
      })
      .addCase(updateUserDetailAsync.fulfilled, (state, action) => {
        state.status = true;
        state.user = action.payload.data;
      });
  },
});

export default authSlice.reducer;
