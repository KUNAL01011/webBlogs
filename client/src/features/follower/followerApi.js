import axios from "axios";

// function that send data to backend to register user
export async function getUserFollowersStatus(userData) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/follower/c/:user_id",
    userData,
    {
      withCredentials: true,
    }
  );
  return response.data;
}


// for otp validation 
export async function togglefollow(otp) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/follower/c/:user_id",
    otp,
    {
      withCredentials: true, // Include cookies with the request
    }
  );
  return response.data;
}
