import jwt from "jsonwebtoken";
import asyncHandler from "express-async-handler";

// TODO use errorResponse util for consistent error messages

import User from "../models/userModel.js";

// verifies user
const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // set verified user to req.user
      req.user = await User.findById(decoded.userId).select("-password"); // userId passed in during jwt.sign generateToken.js

      // Log successful verification
      console.log("Token verified. User ID: ", decoded.userId);

      next();
    } catch (error) {
      console.error("Token verification error: ", error.message);
      res.status(401);
      throw new Error("Not authorized, invalid token");
    }
  } else {
    console.warn("Not authorized, no token");
    res.status(401);
    throw new Error("Not authorized, no token");
  }
});

export { protect };
