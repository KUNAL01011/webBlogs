import {Blog} from '../models/blog.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponse} from '../utils/ApiResponse.js';
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import {asyncHandler} from '../utils/asyncHandler.js';


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

    if(!mainImage){
        throw new ApiError(400, "main Image is required");
    }

    //create an entry in database
    const blog = await Blog.create({
        title,
        mainImage: mainImage.url,
        summary,
        content,
        conclusion
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
})

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
})

//exporting the controllers
export {createBlog,getBlogs};