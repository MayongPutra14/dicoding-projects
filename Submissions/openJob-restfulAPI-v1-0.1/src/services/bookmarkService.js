import { nanoid } from "nanoid";
import {
  addBookmark,
  getAllBookmarksByUserId,
  getBookmarkById,
  deleteBookmark,
} from "./repositories/bookmarkRepositories.js";

export const handleCreateBookmark = async (userId, jobId) => {
  if (!userId || !jobId) {
    const error = new Error("User ID and Job ID are required");
    error.status = 400;
    throw error;
  }

  try {
    const id = nanoid(16);
    return await addBookmark(id, userId, jobId);
  } catch (error) {
    if (error.code === "23505") {
      error.message = "Bookmark already exists";
      error.status = 400;
    }

    throw error;
  }
};

export const handleGetAllBookmarks = async (userId) => {
  return await getAllBookmarksByUserId(userId);
};

export const handleGetBookmarkById = async (bookmarkId, jobId) => {
  const bookmark = await getBookmarkById(bookmarkId, jobId);

  if (!bookmark) {
    const error = new Error("Bookmark not found");
    error.status = 404;
    throw error;
  }

  return bookmark;
};

export const handleDeleteBookmark = async (userId, jobId) => {
  const deleted = await deleteBookmark(userId, jobId);

  if (!deleted) {
    const error = new Error("Bookmark not found");
    error.status = 404;
    throw error;
  }

  return deleted;
};
