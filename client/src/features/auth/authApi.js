import axios from "axios";

// function that send data to backend to register user
export async function registerUser(userData) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/user/register",
    userData,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

// for otp validation 
export async function activateUser(otp) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/user/activate",
    otp,
    {
      withCredentials: true, // Include cookies with the request
    }
  );
  return response.data;
}

//fatching all blogs from the backend
export async function loginUser(data) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/user/login",
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
}


// ================= SECURED ROUTES ===========

//logout
export async function logoutUser(){
  const response = await axios.post(`http://localhost:8000/api/v1/user/logout`,
  {
    withCredentials: true
  }
  );
  return response.data;

}

//changing the password
export async function changePassword(){
  const response = await axios.post(`http://localhost:8000/api/v1/user/change-password`,
  {
    withCredentials: true
  }
  );
  return response.data;

}

//fetching the user by his username
export async function updateUserDetail(userData){
  const response = await axios.patch(`http://localhost:8000/api/v1/user/update-account`,userData,
  {
    withCredentials: true
  }
  );
  return response.data;

}

//fatching all blogs from the backend
export async function getUser() {
  const response = await axios.get(
    "http://localhost:8000/api/v1/user/get_user",
    {
      withCredentials: true,
    }
  );
  return response.data;
}

//fetching the user by his username
export async function getUserByUsername(username){
  const response = await axios.get(`http://localhost:8000/api/v1/user/get_user/:${username}`,
  {
    withCredentials: true
  }
  );
  return response.data;

}


//fetching the user by his username
export async function updateUserAvatar(userData){
  const response = await axios.patch(`http://localhost:8000/api/v1/user/get_user/avatar`,userData,
  {
    withCredentials: true
  }
  );
  return response.data;

}