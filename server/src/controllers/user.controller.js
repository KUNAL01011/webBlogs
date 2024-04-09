import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { User } from "../models/user.model.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendMail.js";
import {uploadOnCloudinary} from '../utils/cloudinary.js';
import mongoose from "mongoose";

//while Some one login to account this function gereate the tokens for sending cookies
const generateAccessAndRefreshTokens = async (userId) => {
  try {
    const user = await User.findById(userId);
    const accessToken = user.generateAccessToken();
    const refreshToken = user.generateRefreshToken();

    user.refreshToken = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating tokens ",
      error
    );
  }
};

//while some want's to activate him/her account ther this token will help you
const generateActivationToken = async (user) => {
  try {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const activationToken = jwt.sign(
      { user, activationCode },
      process.env.ACTIVATION_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    return { activationCode, activationToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while gereating the activation token ",
      error
    );
  }
};

//register user data in DB : working fine
const registerUser = asyncHandler(async (req, res) => {
  try {
    const { fullName, email, password, username } = req.body;
    

    //Input validation
    if (
      [fullName, email, password, username].some(
        (filed) => filed?.trim() === ""
      )
    ) {
      throw new ApiError(400, "All fileds are required ");
    }

    //Checking existance
    const existedUser = await User.findOne({ email });
    console.log(existedUser);
    if (existedUser) {
      throw new ApiError(409, "User is already exist ");
    }


    //Creating User in DB
    const user = await User.create({
      fullName,
      email,
      password,
      username,
    });

    console.log(user);
    //Checking User create or not
    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -posts -avatar "
    );

    //Greneating activation token
    const { activationCode, activationToken } = await generateActivationToken(
      createdUser
    );
    console.log(activationCode);
    const data = {
      user: {
        name: createdUser.fullName,
      },
      activationCode,
    };

    //Sending cookie for safty perpose
    const options = {
      httpOnly: true,
      secure: false,
    };

    try {
      await sendEmail({
        email: createdUser.email,
        subject: " Activate your account ",
        template: "activation-mail.ejs",
        data,
      });

      res
        .status(200)
        .cookie("activationToken", activationToken, options)
        .json(
          new ApiResponse(
            200,
            {msg:`Please Check Your email : ${createdUser.email} to acivate your acount `},
            "register User SuccessFully"
          )
        );
    } catch (error) {
      console.log(error)
      throw new ApiError(
        500,
        "Internal Server error When I try to send Mail",
        error
      );
    }
  } catch (error) {
    throw new ApiError(500, "Internal Server error ", error);
  }
});

//activate the user status : working fine
const activateUser = asyncHandler(async (req, res) => {
  try {
    // console.log(req);
    const { activation_Code } = req.body;
    const activation_Token = req.cookies.activationToken;

    // Input Validation
    // console.log(activation_Code,activation_Token);

    if (!activation_Code && !activation_Token) {
      throw new ApiError(
        400,
        "Activation Token and Otp is required to activate your account "
      );
    }

    // verify the token
    const decodeToken = jwt.verify(
      activation_Token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    const user = await User.findById(decodeToken.user._id);

    //check user if get or not
    if (!user) {
      throw new ApiError(409, "User not fount. Please register first ");
    }

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
      throw new ApiError(500, "Something went wrong");
    }
    console.log(createdUser._id);

    createdUser.isActive = true;
    await createdUser.save({ validateBeforeSave: false });
    const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
      createdUser._id
    );

    const loggedInUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    const options = {
      httpOnly: true,
      secure: true,
    };

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", refreshToken, options)
      .json(new ApiResponse(200, loggedInUser, "user logged in successfully"));
  } catch (error) {
    console.log(error);
    throw new ApiError(400, "Sorry we can't activate user account ", error);
  }
});

//login the user : working fine
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email && !password) {
    throw new ApiError(400, "user is not found Please register first");
  }

  const user = await User.findOne({
    $or: [{ email }],
  });

  if (!user) {
    throw new ApiError(404, "user does not exits");
  }

  if (user.isActive === false) {
    throw new ApiError(
      404,
      "user not validate first validate user after login"
    );
  }

  const isPasswordValid = await user.isPasswordCorrect(password);

  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid user credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    user._id
  );

  const loggedInUser = await User.findById(user._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .status(200)
    .cookie("accessToken", accessToken, options)
    .cookie("refreshToken", refreshToken, options)
    .json(new ApiResponse(200, loggedInUser, "user logged in successfully"));
});

//logOut the user : working fine
const logoutUser = asyncHandler(async (req, res) => {
  try {
    await User.findByIdAndUpdate(
      req.user._id,
      {
        $unset: {
          refreshToken: 1 // this is to learn why we did it
        },
      },
      {
        new: true,
      }
    );
    const options = {
      httpOnly: true,
      secure: true,
    };
  
    return res
      .status(200)
      .clearCookie("accessToken", options)
      .clearCookie("refreshToken", options)
      .json(new ApiResponse(200, {}, "User logged Out"));
  } catch (error) {
    throw new ApiError(400,"Unauthorized request")
  }
});

//for changing the password : working fine
const changeCurrentPassword = asyncHandler(async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  const user = await User.findById(req.user?._id);
  const isPasswordCorrected = await user.isPasswordCorrect(oldPassword);

  if (!isPasswordCorrected) {
    throw new ApiError(400, "Invalid old password");
  }

  user.password = newPassword;
  await user.save({ validateBeforeSave: false });

  return res
    .status(200)
    .json(new ApiResponse(200, {}, "Password changed successfully "));
});

//update the account detail : working fine
const updateAccountDetails = asyncHandler(async (req, res) => {
  const { fullName, email,username } = req.body;
  try {
    
  if (!fullName && !email && !username) {
    throw new ApiError(400, "All fields are required");
  }

  const user = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        fullName,
        email: email,
        username:username
      },
    },
    { new: true }
  ).select("-password -refreshToken");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "Account details updated Successfully"));
  } catch (error) {
    throw new ApiError(400,"something went wrong");
  }
});

// update the user logo : working fine
const updateUserAvatar = asyncHandler(async (req, res) => {
  try {
    const avatarLocalPath = req.file?.path;

    if (!avatarLocalPath) {
      throw new ApiError(400, "Avatar file is missing ");
    }
  
    const user = req.user;
  
    if (user?.avatarCloudId) {
      await cloudinary.uploader.destroy(user.avatarCloudId);
    }
  
    console.log(avatarLocalPath)
    const avatar = await uploadOnCloudinary(avatarLocalPath);
    console.log(avatar)
    
  if (!avatar.url) {
    throw new ApiError(400, "Error while uploading on avatar ");
  }

  const updatedUser = await User.findByIdAndUpdate(
    req.user?._id,
    {
      $set: {
        avatar: avatar.url,
        avatarCloudId: avatar.public_id,
      },
    },
    { new: true }
  ).select("-password");

  return res
    .status(200)
    .json(
      new ApiResponse(200, updatedUser, " Avatar image updated successfully ")
    );
  } catch (error) {
    throw new ApiError(400, "Please send avatar");
  }
});

// get user profile : this controller have some issue
const getUserChannelProfile = asyncHandler(async (req, res) => {
  try {
    const { username } = req.params;

    if (!username?.trim()) {
      throw new ApiError(400, "user id is missing");
    }

    const user = await User.aggregate([
      {
        $match: {
          username: username?.toLowerCase(),
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "follower",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "following",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "blogs",
          localField: "posts",
          foreignField: "_id",
          as: "posts",
        },
      },
      {
        $addFields: {
          followerCount: {
            $size: "$followers",
          },
          followingCount: {
            $size: "$following",
          },
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          fullName: 1,
          posts: 1,
          followerCount: 1,
          followingCount: 1,
          avatar: 1,
        },
      },
    ]);

    console.log(user);

    res.status(200).json(200, user, "Data fatched successfully");
  } catch (error) {
    throw new ApiError(500,"something went wrong geting this user",error);
  }
});


const getUser = asyncHandler(async(req,res)=>{
  // const user = req.user;
  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.user._id),
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "follower",
          as: "followers",
        },
      },
      {
        $lookup: {
          from: "followers",
          localField: "_id",
          foreignField: "following",
          as: "following",
        },
      },
      {
        $lookup: {
          from: "blogs",
          localField: "posts",
          foreignField: "_id",
          as: "posts",
        },
      },
      {
        $addFields: {
          followerCount: {
            $size: "$followers",
          },
          followingCount: {
            $size: "$following",
          },
        },
      },
      {
        $project: {
          _id: 1,
          email: 1,
          fullName: 1,
          username:1,
          posts: 1,
          followerCount: 1,
          followingCount: 1,
          avatar: 1,
          about:1,
        },
      },
    ]);

    if(!user){
      throw new ApiError(400,"You are not authrized");
    }

    res.status(200).json(new ApiResponse(200,user,"user get successfull"));
  } catch (error) {
    throw new ApiError(500,"something went wrong geting this user",error);
  }
})
export {
  registerUser,
  activateUser,
  loginUser,
  logoutUser,
  changeCurrentPassword,
  updateAccountDetails,
  updateUserAvatar,
  getUser,
  getUserChannelProfile
};

// import ms from "ms";
// import crypto from "crypto";
// import config from "config";
// import {generate} from "otp-generator";

// export class Totp {
//   private declare secret: string;
//   private declare ttl: string;

//   constructor() {
//     this.secret = config.get<string>("otp.secret");
//     const exp = config.get<number>("otp.expires");
//     this.ttl = ms(exp); // converted to ms
//   }

//   generate(phone: string) {
//     const expires = Date.now() + this.ttl;
//     // Generate a random otp
//     const otp = this.getOtp();
//     // Generate a random salt
//     const salt = crypto.randomBytes(16).toString("hex");
//     // make data to encode
//     const data = `${phone}.${otp}.${expires}.${salt}`;
//     // make hash
//     const hash = `${this.makeHash(data)}.${expires}.${salt}`;

//     return {otp, hash, ttl: this.ttl};
//   }

//   verify(phone: string, otp: string, hash: string) {
//     if (!hash.match(".")) return false; // Hash should have at least one dot
//     // split the hash into parts: hash value, expires from the hash returned from the user(
//     const [hashValue, expires, salt] = hash.split(".");
//     // make data to encode
//     if (Date.now() > Number(expires)) return false;
//     // calculate new hash with the secret and the same algorithm
//     const data = `${phone}.${otp}.${expires}.${salt}`;
//     // compare the hashes
//     return this.makeHash(data) === hashValue;
//   }

//   private getOtp(length: number = config.get("otp.digits")) {
//     return generate(length, {
//       digits: true,
//       specialChars: false,
//       lowerCaseAlphabets: false,
//       upperCaseAlphabets: false,
//     });
//   }

//   private makeHash(data: string) {
//     return crypto.createHmac("sha256", this.secret).update(data).digest("hex");
//   }
// }
