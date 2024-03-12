import axios from "axios";

//fatching all blogs from the backend
export async function getAllBlogs() {
   const response = await axios.get("http://localhost:8000/api/v1/blog/get-blog");
   if(!response){
    console.error("we don't get data from this api :");
   }
   return response.data;
}

//deleting one blog by id

export async function deleteBlog(blog_id){
   const response = await axios.delete(`http://localhost:8000/api/v1/blog/delete-blog/${blog_id}`);
   if(!response){
      console.log("We can not able to delete the blog");
   }

   return response.data;
}