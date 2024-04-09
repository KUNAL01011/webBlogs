import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Blog } from "../models/blog.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { v2 as cloudinary } from "cloudinary";
import { upload } from "../middlewares/multer.middleware.js";

//This controller for getting all blogs : working fine : need some updation
const getAllBlogs = asyncHandler(async (req, res) => {
  try {
    const blogs = await Blog.aggregate([
      {
        $lookup: {
          from: "users",
          localField: "owner",
          foreignField: "_id",
          as: "owner",
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          subtitle: 1,
          mainImage: 1,
          content: 1,
          conclusion: 1,
          isPublished: 1,
          tags: 1,
          category: 1,
          owner: {
            $arrayElemAt: ["$owner", 0],
          },
          createdAt: 1,
          updatedAt: 1,
        },
      },
    ]);

    res.status(200).json(new ApiResponse(200, blogs, "all blogs are fetched"));
  } catch (error) {
    throw new ApiError(500, "Something went wrong", error);
  }
});

//update the blog : this has a problem : working fine
const updateBlog = asyncHandler(async (req, res) => {
  const { blogId } = req.params; // Get the blog id from request parameters
  const updatedData = req.body; // Get updated blog data from request body
  const newMainImage = req.file?.path;
  const user = req.user;


  const blog = await Blog.findById(blogId);
  const oldMainImageCloudId = blog.mainImageCloudId;

  console.log(updatedData.title)
  
  const response = {};
  if(newMainImage){
    response = await uploadOnCloudinary(newMainImage);
  }


  const userId = user._id;
  const Id = blog.owner;
  if (userId.toString() !== Id.toString()) {
    throw new ApiError(400, "Anouthrized request");
  }

  console.log(Id);

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(blogId,{
      $set:{
        title: updatedData?.title,
        subtitle:updatedData?.subtitle,
        mainImage: res?.url,
        mainImageCloudId: res?.public_id,
        content:updatedData?.content,
        conclusion:updatedData?.conclusion,
        tags: updatedData?.tags,
        category:updatedData?.category
      }
    }, {
      new: true,
    });

    console.log(updateBlog)

    if (!updatedBlog) {
      throw new ApiError(400, "we can not find the blog");
    }
    if (newMainImage) {
      await cloudinary.uploader.destroy(oldMainImageCloudId,{
        resource_type: "auto"
      });
    }
    res
      .status(200)
      .json(new ApiResponse(200, updateBlog, "update blog successfully"));
  } catch (error) {
    console.error("Error updating blog:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

//delete the blog : wroking fine
const deleteBlog = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;

    console.log(blogId);

    const blog = await Blog.findById(blogId);
    console.log(blog);
    const mainImageCloudId = blog.mainImageCloudId;
    if (mainImageCloudId) {
      await cloudinary.uploader.destroy(mainImageCloudId);
    }

    const deletedBlog = await Blog.findByIdAndDelete(blogId); // Renamed the variable to avoid conflict
    if (!deleteBlog) {
      throw new ApiError(400, "Your are not Anouthrized to delete the blog");
    }
    res
      .status(200)
      .json(new ApiResponse(200, deletedBlog, "Blog deleted successfully")); // Changed the variable name to deletedBlog
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "We were unable to delete the blog", error);
  }
});

// Controller function to create a new blog : working fine
const publishABlog = asyncHandler(async (req, res) => {
  const { title, subtitle, content, conclusion, tags, category } = req.body; // Get blog data from request body
  const mainImageLocalPath = req.file?.path;

  const user = req.user._id;

  if (!mainImageLocalPath) {
    throw new ApiError(400, "mainImage file is missing");
  }

  const mainImage = await uploadOnCloudinary(mainImageLocalPath);
  // console.log(mainImage);

  if (!mainImage.url) {
    throw new ApiError(400, "Error while uploading on mainImage");
  }

  try {
    const newBlog = await Blog.create({
      title,
      subtitle,
      mainImage: mainImage.url,
      mainImageCloudId: mainImage.public_id,
      content,
      conclusion,
      tags,
      category,
      owner: user,
    });
    console.log(newBlog);

    if (!newBlog) {
      throw new ApiError(400, "error while generatign blog");
    }

    res
      .status(200)
      .json(200, new ApiResponse(200, newBlog, "Blog successfully created"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "We can't create blog", error);
  }
});

//togglePublishStatus of blog : working fine
const togglePublishStatus = asyncHandler(async (req, res) => {
  const { blogId } = req.params;

  if (!blogId) {
    throw new ApiError(400, "Sorry we can not find the blog");
  }

  try {
    const blog = await Blog.findById(blogId);

    if (!blog) {
      throw new ApiError(400, "Sorry we can not find the blog");
    }

    blog.isPublished = true;
    await blog.save({ validateBeforeSave: false });

    res
      .status(200)
      .json(new ApiResponse(200, blog, "publish blog successfully"));
  } catch (error) {
    throw new ApiError(200, "sorry we can not set publis your blog", error);
  }
});

export {
  getAllBlogs,
  updateBlog,
  deleteBlog,
  publishABlog,
  togglePublishStatus,
};
