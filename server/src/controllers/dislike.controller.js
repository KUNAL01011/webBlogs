import mongoose, {isValidObjectId} from "mongoose"
import {Like} from "../models/like.model.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {asyncHandler} from "../utils/asyncHandler.js"

const toggleBlogDislike = asyncHandler(async (req, res) => {
    const { blogId } = req.params;
    const user = req.user;

    // Check if the blogId is a valid ObjectId
    if (!mongoose.isValidObjectId(blogId)) {
        throw new ApiError(400, "Invalid blogId");
    }

    // Check if the user has already disliked the blog
    const existingDislike = await Dislike.findOne({ blog: blogId, user: user._id });

    if (existingDislike) {
        // If dislike already exists, remove it
        await existingDislike.remove();
        res.json(new ApiResponse(true, "Blog dislike removed successfully"));
    } else {
        // If dislike doesn't exist, create it
        const newDislike = new Dislike({ blog: blogId, user: user._id });
        await newDislike.save();
        res.json(new ApiResponse(true, "Blog disliked successfully"));
    }
});

const getDislikeBlog = asyncHandler(async (req, res) => {
    const user = req.user;

    // Find all dislikes by the user
    const dislikedBlogs = await Dislike.find({ user: user._id }).populate("blog");

    res.json(new ApiResponse(true, "Disliked blogs retrieved successfully", dislikedBlogs));
});


export {
    toggleBlogDislike,
    getDislikeBlog
}