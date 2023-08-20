import asyncHandler from "express-async-handler";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";
import BlacklistToken from "../models/blacklistModel.js";

// @desc    Auth user/set token
// route    POST api/users/auth
// @access  Public
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email: email });

  // matchPassword method defined in userModel.js
  if (user && (await user.matchPassword(password))) {
    generateToken(res, user._id);
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(401);
    throw new Error("Invalid credentials");
  }
});

// @desc    Register a user
// route    POST api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email: email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password, // hash password in userModel.js
  });

  if (user) {
    generateToken(res, user._id); // generate token
    res.status(201);
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// @desc    Logout user
// route    POST api/users/logout
// @access  Public
const logoutUser = asyncHandler(async (req, res) => {
  const token = req.cookies.jwt;

  console.log(token);

  // Is token in blacklist?
  const blacklistedToken = await BlacklistToken.findOne({ token });
  if (!blacklistedToken) {
    // If not in blacklist, add it
    await BlacklistToken.create({ token });
  }

  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });

  res.status(200).json({ message: "User logged out" });
});

// @desc    Get user profile
// route    POST api/users/profile
// @access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "User profile" });
});

// @desc    Update user profile
// route    PUT api/users/profile
// @access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Update user profile" });
});

export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
};
