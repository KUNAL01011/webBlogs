import axios from "axios";

export async function register() {
  const response = await axios.post(
    "http://localhost:8000/api/v1/user/register"
  );
  if (!response) {
    console.error("We don't get data form this api ");
  }
  return response.data;
}

export async function validation(data) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/user/activate-user",
    data,
    {
      withCredentials: true, // Include cookies with the request
    }
  );
  if (!response) {
    console.error("we don't get data from this api");
  }
  return response.data;
}

//fatching all blogs from the backend
export async function login(data) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/user/login",
    data
  );
  if (!response) {
    console.error("we don't get data from this api :");
  }
  return response.data;
}