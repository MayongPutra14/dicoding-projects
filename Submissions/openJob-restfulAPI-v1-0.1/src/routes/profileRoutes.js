import express from "express";
import authenticate from "../middlewares/auth.js";
import {
  getProfile,
  getProfileApplications,
  getProfileBookmarks,
} from "../controllers/profileCotroller.js";

const router = express.Router();

router.get("/profile", authenticate, getProfile);
router.get("/profile/applications", authenticate, getProfileApplications);
router.get("/profile/bookmarks", authenticate, getProfileBookmarks);

export default router
