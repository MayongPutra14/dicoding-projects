import {
  handleCreateBookmark,
  handleGetAllBookmarks,
  handleGetBookmarkById,
  handleDeleteBookmark,
} from "../services/bookmarkService.js";

export const addBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const bookmark = await handleCreateBookmark(userId, jobId);

    res.status(201).json({
      status: "success",
      data: bookmark,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllBookmarks = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const bookmarks = await handleGetAllBookmarks(userId);

    res.status(200).json({
      status: "success",
      data: {
        bookmarks: bookmarks,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getBookmarkById = async (req, res, next) => {
  try {
    const { bookmarkId, jobId } = req.params;

    const bookmark = await handleGetBookmarkById(bookmarkId, jobId);

    res.status(200).json({
      status: "success",
      data: bookmark,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteBookmark = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const jobId = req.params.jobId;

    const deleted = await handleDeleteBookmark(userId, jobId);

    res.status(200).json({
      status: "success",
      data: deleted,
    });
  } catch (error) {
    next(error);
  }
};
