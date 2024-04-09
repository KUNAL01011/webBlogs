import axios from "axios";

//fatching all blogs from the backend
export async function getAllBlogs() {
  const response = await axios.get(
    "http://localhost:8000/api/v1/blog/get-blogs",
    {
      withCredentials: true,
    }
  );
  if (!response) {
    console.error("we don't get data from this api :");
  }
  return response.data;
}

//fetching the blog by Id
export async function getBlogById(Id) {
  const response = await axios.get(`http://localhost:8000/api/v1/blog/${Id}`, {
    withCredentials: true,
  });
  if (!response) {
    console.error("we dont have this blog");
  }
  return response.data;
}
// creating the blog
export async function createBlog(data) {
  const response = await axios.post(
    "http://localhost:8000/api/v1/blog/create-blog",
    data,
    {
      withCredentials: true,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  if (!response) {
    console.log("sorrry unble to create blog ");
  }
  return response.data;
}
//deleting one blog by id

export async function deleteBlog(blog_id) {
  const response = await axios.delete(
    `http://localhost:8000/api/v1/blog/delete-blog/${blog_id}`
  );
  if (!response) {
    console.log("We can not able to delete the blog");
  }

  return response.data;
}
export async function updateBlog(blog_id) {
  const response = await axios.delete(
    `http://localhost:8000/api/v1/blog/delete-blog/${blog_id}`
  );
  if (!response) {
    console.log("We can not able to delete the blog");
  }

  return response.data;
}
export async function togglePublishStatus(blog_id) {
  const response = await axios.delete(
    `http://localhost:8000/api/v1/blog/delete-blog/${blog_id}`
  );
  if (!response) {
    console.log("We can not able to delete the blog");
  }

  return response.data;
}
