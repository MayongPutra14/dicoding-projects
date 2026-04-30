import {
  handleGetProfile,
  handleGetProfileApplications,
  handleGetProfileBookmarks,
} from "../services/profileService.js";

export const getProfile = async (req, res, next) => {
  try {
    const user = await handleGetProfile(req.user.id);

    res.status(200).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileApplications = async (req, res, next) => {
  try {
    const applications = await handleGetProfileApplications(req.user.id);
    res.status(200).json({
      status: "success",
      data: {
        applications: applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getProfileBookmarks = async (req, res, next) => {
  try {
    const bookmarks = await handleGetProfileBookmarks(req.user.id);
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
