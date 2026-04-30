import express from "express";
import authenticate from "../middlewares/auth.js";
import {
  addBookmark,
  getAllBookmarks,
  getBookmarkById,
  deleteBookmark,
} from "../controllers/bookmarkController.js";

const router = express.Router();

router.post("/jobs/:jobId/bookmark", authenticate, addBookmark);
router.get("/bookmarks", authenticate, getAllBookmarks);
router.get("/jobs/:jobId/bookmark/:bookmarkId", authenticate, getBookmarkById);
router.delete("/jobs/:jobId/bookmark", authenticate, deleteBookmark);
export default router;
