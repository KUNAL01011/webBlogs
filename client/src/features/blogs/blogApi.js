import axios from "axios";

//fatching all blogs from the backend
export async function getAllBlogs() {
   const response = await axios.get("http://localhost:8000/api/v1/blog/get-blog");
   if(!response){
    console.error("we don't get data from this api :");
   }
   return response.data;
}