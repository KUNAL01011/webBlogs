import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import sendEmail from "../utils/sendMail.js";

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
      "Something went wrong while generating referesh and access token"
    );
  }
};

const createActivationToken = (user) => {
  try {
    const activationCode = Math.floor(1000 + Math.random() * 9000).toString();
    const activationToken = jwt.sign(
      { user, activationCode },
      process.env.ACTIVATION_TOKEN_SECRET,
      { expiresIn: "5m" }
    );
    return { activationToken, activationCode };
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating referesh and access token"
    );
  }
};

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

    const user = await User.create({
      fullName,
      email,
      password,
    });

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken -posts -avatar"
    );

    // Generate activation token
    const activate_user = createActivationToken(createdUser);

    const { activationToken, activationCode } = activate_user;

    const data = { user: { name: createdUser.fullName }, activationCode };

    const options = {
      httpOnly: true,
      secure: false,
    };

    try {
      await sendEmail({
        email: user.email,
        subject: "Activate your account",
        template: "activation-mail.ejs",
        data,
      });

      res
        .status(200)
        .cookie("activationToken", activationToken, options)
        .json(
          new ApiResponse(
            200,
            "Activate User Successfully",
            `Please check your email: ${user.email} to activate your account`
          )
        );

      return;
    } catch (error) {
      throw new ApiError(500, "Internal server error");
    }
  } catch (error) {
    throw new ApiError(500, "Internal server error");
  }
});

const activateUser = asyncHandler(async (req, res) => {
  try {
    // Extract activation code from the request body
    const { activation_Code } = req.body;

    // Extract token from the cookie in the request headers
    const activation_Token = req.cookies.activationToken;

    // If token is not found in cookies, handle accordingly
    if (!activation_Token) {
      throw new ApiError(400, "Activation token not found in cookies");
    }

    // Decode the token using the secret key
    const decodedToken = jwt.verify(
      activation_Token,
      process.env.ACTIVATION_TOKEN_SECRET
    );

    // If activation codes don't match, handle accordingly
    if (decodedToken.activationCode !== activation_Code) {
      throw new ApiError(409, "The OTP is not valid. Please try again.");
    }

    // Find user by ID from decoded token
    const validateUser = await User.findById(decodedToken.user._id);

    // If user not found, handle accordingly
    if (!validateUser) {
      throw new ApiError(409, "User not found. Please register first.");
    }

    // Activate the user
    validateUser.isActive = true;
    await validateUser.save({ validateBeforeSave: false });

    // Find the user again to send response with updated information
    const createdUser = await User.findById(validateUser._id).select(
      "-password -refreshToken"
    );

    // If user not found after activation, handle accordingly
    if (!createdUser) {
      throw new ApiError(
        500,
        "Something went wrong while registering the user"
      );
    }

    // Send success response
    return res
      .status(201)
      .json(
        new ApiResponse(
          200,
          "Activate User Successfully",
          "Activate User Successfully"
        )
      );
  } catch (error) {
    console.error(error);
    throw new ApiError(500, "Internal server error");
  }
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, fullName, password } = req.body;

  if (!email) {
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
    .json(
      new ApiResponse(
        200,
        { user: loggedInUser, accessToken, refreshToken },
        "user logged in successfully"
      )
    );
});

const getUser = asyncHandler(async (req, res) => {
  return res
    .status(200)
    .json(new ApiResponse(200, req.user, "user logged in successfully"));
});

export { registerUser, activateUser, loginUser, getUser };
