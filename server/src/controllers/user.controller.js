import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";



const generateAccessAndRefreshTokens = async(userId) => {
    
}


const registerUser = asyncHandler(async (req, res) => {

})


const loginUser = asyncHandler(async (req, res) => {

})


const logoutUser = asyncHandler(async (req, res) => {

})

const refreshAccessToken = asyncHandler(async (req, res) => {

})

const changeCurrentPassword = asyncHandler(async (req, res) => {

})

const getCurrentUser = asyncHandler(async (req, res) => {

})

const updateAccoutDetails = asyncHandler(async (req, res) => {

})

const updateUserAvatar = asyncHandler(async (req, res) => {

})


const getUserChannelProfile = asyncHandler(async (req, res) => {

})

const getPosts = asyncHandler(async (req, res) => {

})

export {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changeCurrentPassword,
    getCurrentUser,
    updateAccoutDetails,
    updateUserAvatar,
    getUserChannelProfile,
    getPosts
}