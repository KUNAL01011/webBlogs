import axios from "axios";

// function that send data to backend to register user
export async function toggleBlogLike(userData) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/like/toggle/v/:blogId",
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
    "http://localhost:8000/api/v1/like/:blogId",
    otp,
    {
      withCredentials: true, // Include cookies with the request
    }
  );
  return response.data;
}

