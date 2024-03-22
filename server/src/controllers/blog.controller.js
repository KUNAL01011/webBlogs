import {Blog} from '../models/blog.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {asyncHandler} from '../utils/asyncHandler.js';
import {v2 as cloudinary } from 'cloudinary';



//This controller create for give all blogs to front-end
const getBlogs = asyncHandler( async (req, res) => {
    try {
        const response = await Blog.find();
        if(!response){
          throw new ApiError(500, "we did't get response to backend");
        }
    
        return res.status(200).json(
          new ApiResponse(200, response,"Successfull fetched all data")
        );
      } catch (error) {
        throw new ApiError(500,"Something went wrong while fetching all task");
      }
});


//This controller create for adding a blog into the database
const createBlog = asyncHandler( async (req,res) => {
    //fatching json data from body
    const {title,summary,content,conclusion} = req.body;

    if([title,summary,content,conclusion].some((field) => field.trim() === "")){
        throw new ApiError(400, "All fields are required")
    }

    //fatcing file form the req
    const mainImagePath = req.files?.mainImage[0]?.path;
    if(!mainImagePath) {
        throw new ApiError(400,"main Image is required");
    }

    //Image upload on cloudinary 
    const mainImage = await uploadOnCloudinary(mainImagePath);
    // console.log(mainImage);

    if(!mainImage){
        throw new ApiError(400, "main Image is required");
    }

    //create an entry in database
    const blog = await Blog.create({
        title,
        mainImage: mainImage.url,
        summary,
        content,
        conclusion,
        imageCloudId: mainImage.public_id
    });

    //checking entry created or not
    const createdBlog = await Blog.findById(blog._id);

    if(!createdBlog){
        throw new ApiError(500, "Somthing went wrong while creating blog");
    }

    // return the response to frontend
    return res.status(201).json(
        new ApiResponse(201, createBlog, "blog created successfully")
    )
});




const deleteBlog = asyncHandler(async (req, res) => {
  const taskId = req.params.id;
  if (!taskId) {
      return res.status(400).json({ message: "Missing required field: taskContent" });
  }
  try {
      // Find the blog by ID
      const blog = await Blog.findById(taskId);
      
      if (!blog) {
          return res.status(404).json({ message: "Blog not found" });
      }
      
      // Delete the associated image from Cloudinary
      console.log(blog.imageCloudId)
      if (!blog.imageCloudId) {
          // Assuming you have the Cloudinary SDK installed and configured
          console.log("we can't find the id ");
      }
      else{
        await cloudinary.uploader.destroy(blog.imageCloudId);
      }
      
      // Delete the blog from the database
      const deletedBlog = await Blog.findByIdAndDelete(taskId);
      
      res.status(200).json({ message: "Blog successfully deleted", data: deletedBlog });

  } catch (error) {
      console.error(error);
      return res.status(500).json({ message: "Internal server error" });
  }
});


// This controller for updateing the blog 
const updateBlog = asyncHandler( async (req, res) => {

});


//exporting the controllers
export {createBlog,getBlogs,deleteBlog};