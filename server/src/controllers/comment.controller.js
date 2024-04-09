import mongoose from "mongoose";
import { Comment } from "../models/comment.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//getting all comment : working fine
const getBlogComments = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;

    // Check if the blogId is a valid ObjectId
    if (!mongoose.isValidObjectId(blogId)) {
      throw new ApiError(400, "Invalid blogId");
    }

    // Find comments for the blog
    const comments = await Comment.find({ post: blogId });

    // Check if there are no comments for the blog
    if (comments.length === 0) {
      throw new ApiError(404, "No comments found for the given blogId");
    }

    res
      .status(200)
      .json(
        new ApiResponse(200, comments, "Blog comments retrieved successfully")
      );
  } catch (error) {
    console.error("Error retrieving comments:", error);
    throw new ApiError(
      error.statusCode || 500,
      error.message || "Something went wrong"
    );
  }
});

//adding comment : working fine
const addComment = asyncHandler(async (req, res) => {
  try {
    const { blogId } = req.params;
    const { content } = req.body;
    const user = req.user;

    // Check if the blogId is a valid ObjectId
    if (!mongoose.isValidObjectId(blogId)) {
      throw new ApiError(400, "Invalid blogId");
    }

    // Create a new comment
    const newComment = await Comment.create({
      content,
      post: blogId,
      commentBy: user._id,
    });

    if (!newComment) {
      throw new ApiError(400, "Sorry we can not able to create comment");
    }

    res
      .status(200)
      .json(new ApiResponse(200, newComment, "Comment created successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Sorry we can not add comment");
  }
});

//updateing the comment : working fine
const updateComment = asyncHandler(async (req, res) => {
  try {
    const { commentId } = req.params;
    const { content } = req.body;
    const user = req.user;

    const comment = await Comment.findById(commentId);
    console.log(comment);
    if(!comment){
      throw new ApiError(400, "sorry this comment not exist");
    }

    console.log(user);
    if(comment.commentBy.toString() !== user._id.toString()){
      throw new ApiError(400,"soory this comment not is yours");
    }
    console.log(user.id)
    const response = await Comment.findByIdAndUpdate(commentId,{
      $set:{
        content
      }
    });

    if(!response){
      throw new ApiError(400,"Sorry we can not find the comment");
    }

    res.status(200).json(new ApiResponse(200,response,"comment update successfully"));
  } catch (error) {
    throw new ApiError(500,"something went wrong");
  }
});


// deleteing the comment : working fine
const deleteComment = asyncHandler(async (req, res) => {
  const { commentId } = req.params;
  const user = req.user;

  if(!commentId){
    throw new ApiError(400,"sorry we don't get Id");
  }

  // Find the comment
  let comment = await Comment.findById(commentId);

  if(comment.commentBy.toString() !== user._id.toString()){
    throw new ApiError(400,"sorry your not authorized for that")
  }

  const response = await Comment.findByIdAndDelete(commentId);
  res.status(200).json(200,response,"comment delete successfully")
});

export { getBlogComments, addComment, updateComment, deleteComment };
