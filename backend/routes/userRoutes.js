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

router.post("/", registerUser);
router.post("/auth", checkTokenBlacklist, authUser);
router.post("/logout", logoutUser);
router.get("/profile", checkTokenBlacklist, getUserProfile);
router.put("/profile", checkTokenBlacklist, getUserProfile);

export default router;
