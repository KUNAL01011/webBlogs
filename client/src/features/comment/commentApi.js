import axios from "axios";

// function that send data to backend to register user
export async function getBlogComments(userData) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/comment/:blogId",
    userData,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

// for otp validation 
export async function addComment(otp) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/comment/:blogId",
    otp,
    {
      withCredentials: true, // Include cookies with the request
    }
  );
  return response.data;
}

//fatching all blogs from the backend
export async function deleteComment(data) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/comment/c/:commentId",
    data,
    {
      withCredentials: true,
    }
  );
  return response.data;
}

//logout
export async function updateComment(){
  const response = await axios.post(`http://localhost:8000/api/v1/comment/c/:commentId`,
  {
    withCredentials: true
  }
  );
  return response.data;

}

