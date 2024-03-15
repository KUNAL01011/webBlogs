import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
import sendMail from "../utils/sendMail.js";



const generateAccessAndRefreshTokens = async(userId) => {
    
}


// const registerUser = asyncHandler(async (req, res) => {
//     try {
//         const {fullName,email,password} = req.body;
        
//         // check empty toh nahi hai data
//         if(
//             [fullName,email,password].some((filed) => filed?.trim() === "")
//         ){
//             throw new ApiError(400,"All fields are required");
//         }

//         const existedUser = await User.findOne({email});

//         if(existedUser){
//             throw new ApiError(409, "User with email already exists");
//         }

//         const user = {fullName,email,password};
//         console.log(user);

//         //using this user generate the activationToken
//         const activationToken = createActivationToken(user);
//         console.log(activationToken);

//         const activationCode = activationToken.activationCode;

//         const data = {user: {name:user.fullName}, activationCode};
//         // const html = await ejs.renderFile(path.join(__dirname, '../mails/activation-mail.ejs'));
//         // console.log(html);


//         console.log("data : ",data);


//         try{
//             await sendMail({
//                 email: user.email,
//                 subject: "Activate your account",
//                 template: 'activation-mail.ejs',
//                 data,
//             });
//             console.log('after await')
//             res.status(201).json({
//                 success:true,
//                 message: `Please check your email: ${user.email} to activate your account`,
//                 activationCode: activationCode.token,
//             })
//         } catch(error) {
//             throw new ApiError(500,"Internal server error");
//         }

//         res.status(201).json({
//             success:true,
//             message: `Please check your email: ${user.email} to activate your account`,
//             activationCode: activationCode.token,
//         })

//     } catch (error) {
//         throw new ApiError(500,"Internal errrrrrrrrrrror server error");
//     }
// })

// const createActivationToken =  (user) => {
//     const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
//     const token = jwt.sign({
//         user,activationCode
//     },
//     process.env.ACTIVATION_SECREAT,
//     {
//         expiresIn: "5m"
//     });
//     return {token,activationCode};
// }


const registerUser = asyncHandler(async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        // Check if any field is empty
        if ([fullName, email, password].some((field) => field?.trim() === "")) {
            throw new ApiError(400, "All fields are required");
        }

        const existedUser = await User.findOne({ email });

        if (existedUser) {
            throw new ApiError(409, "User with email already exists");
        }

        const user = { fullName, email, password };

        // Generate activation token
        const activationToken = createActivationToken(user);
        const activationCode = activationToken.activationCode;

        const data = { user: { name: user.fullName }, activationCode };

        try {
            await sendMail({
                email: user.email,
                subject: "Activate your account",
                template: 'activation-mail.ejs',
                data,
            });

            res.status(201).json({
                success: true,
                message: `Please check your email: ${user.email} to activate your account`,
                activationCode: activationCode.token,
            });
        } catch (error) {
            throw new ApiError(500, "Internal server error");
        }
    } catch (error) {
        throw new ApiError(500, "Internal server error");
    }
});

const createActivationToken = (user) => {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const token = jwt.sign(
        { user, activationCode },
        process.env.ACTIVATION_SECRET,
        { expiresIn: "5m" }
    );
    return { token, activationCode };
};

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