import mongoose from "mongoose";
import { Follower } from "../models/follower.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";

//user follow or unfollow : working fine
const togglefollow = asyncHandler(async (req, res) => {
  const { user_id } = req.params;
  const user = req.user;

  // Check if the channelId is a valid ObjectId
  if (!mongoose.isValidObjectId(user_id)) {
    throw new ApiError(400, "Invalid channelId");
  }

  // Check if the user is already subscribed to the channel
  const existingFollower = await Follower.findOne({
    follower: user_id,
    following: user._id,
  });

  if (existingFollower) {
    const unfollow = await Follower.findByIdAndDelete(existingFollower._id);
    return res
      .status(200)
      .json(new ApiResponse(200, unfollow, "user is unfollow"));
  } else {
    const newFollower = await Follower.create({
      follower: user_id,
      following: user._id,
    });
    return res
      .status(200)
      .json(new ApiResponse(200, newFollower, "follow successfully added"));
  }
});

//get user is follow or not status : working fine
const getUserFollowersStatus = asyncHandler(async (req, res) => {
    const { user_id } = req.params;
    const user = req.user;
  
    // Check if the channelId is a valid ObjectId
    if (!mongoose.isValidObjectId(user_id)) {
      throw new ApiError(400, "Invalid channelId");
    }
  
    // Check if the user is already subscribed to the channel
    const existingFollower = await Follower.findOne({
      follower: user_id,
      following: user._id,
    });
  
    if (existingFollower) {
      return res
        .status(200)
        .json(new ApiResponse(200, {followerStatus: true}, "user is followed by you"));
    } else {
      
      return res
        .status(200)
        .json(new ApiResponse(200, {followerStatus: false}, "user is not followed by you"));
    }
});

export { togglefollow, getUserFollowersStatus };
