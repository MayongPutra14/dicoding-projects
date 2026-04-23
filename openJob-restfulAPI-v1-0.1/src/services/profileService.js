import { getUserById } from "./repositories/userRepositories.js";
import { getApplicationsByUserId } from "./repositories/applicationRepositories.js";
import { getAllBookmarksByUserId } from "./repositories/bookmarkRepositories.js";

const createError = (message, status) => {
  const error = new Error(message);
  error.status = status;
  return error;
};

export const handleGetProfile = async (userId) => {
  const user = await getUserById(userId);
  if (!user) {
    throw createError("User not found", 404);
  }

  return user;
};

export const handleGetProfileApplications = async (userId) => {
  return getApplicationsByUserId(userId);
};

export const handleGetProfileBookmarks = async (userId) => {
  return await getAllBookmarksByUserId(userId);
};
