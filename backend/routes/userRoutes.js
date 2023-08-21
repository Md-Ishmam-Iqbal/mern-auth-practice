import express from "express";
const router = express.Router();
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controller/userController.js";
import checkTokenBlacklist from "../middleware/checkBlacklist.js";
import { protect } from "../middleware/authMiddleware.js";

router.post("/", registerUser);
router.post("/auth", checkTokenBlacklist, authUser);
router.post("/logout", logoutUser);
router.get("/profile", protect, checkTokenBlacklist, getUserProfile);
router.put("/profile", protect, checkTokenBlacklist, updateUserProfile);

export default router;
