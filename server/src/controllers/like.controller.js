import mongoose, { isValidObjectId } from "mongoose";
import { Like } from "../models/like.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

// like or unlike controller : working fine
const toggleBlogLike = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const user = req.user;

    if (!mongoose.isValidObjectId(blogId)) {
      throw new ApiError(400, "Invalid blogId");
    }

    const existingLike = await Like.findOne({
      post: blogId,
      likedBy: user._id,
    });
    console.log(existingLike);

    if (existingLike) {
      const unliked = await Like.findByIdAndDelete(existingLike._id);
      return res
        .status(200)
        .json(new ApiResponse(200, unliked, "blog is unliked"));
    } else {
      const like = await Like.create({
        post: blogId,
        likedBy: user._id,
      });
      res.status(200).json(new ApiResponse(200, like, "blog is liked"));
    }
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "soory unable to like");
  }
});

// get like status for user controller : working fine
const getLikedBlog = asyncHandler(async (req, res) => {
    const {blogId} = req.params;
    const user = req.user;

    if(!user){
        throw new ApiError(400,"sorry you not authrized to check")
    }

    const existingLike = await Like.findOne({
        post: blogId,
        likedBy: user._id,
    });

    if(!existingLike){
        return res.status(200).json(new ApiResponse(200,{likeStatus:false},"fetch successfull"))
    }else{
        return res.status(200).json(new ApiResponse(200,{likeStatus:true},"fetch successfull"))
    }

});

export { toggleBlogLike, getLikedBlog };
