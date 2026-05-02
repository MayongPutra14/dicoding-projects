import {
  loginUser,
  refreshAccessToken,
  logoutUser,
} from "../services/authService.js";

export const login = async (req, res, next) => {
  try {
    const { accessToken, refreshToken } = await loginUser(req.body);

    res.status(200).json({
      status: "success",
      message: "login successful",
      data: {
        accessToken,
        refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const refresh = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const error = new Error("Refresh token is required");
      error.status = 400;
      throw error;
    }

    const accessToken = await refreshAccessToken(refreshToken);
    res.status(200).json({
      status: "success",
      message: "Access token refreshed",
      data: { accessToken },
    });
  } catch (error) {
    next(error);
  }
};

export const logout = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;

    if (!refreshToken) {
      const error = new Error("Refresh token is required");
      error.status = 400;
      throw error;
    }

    await logoutUser(refreshToken);

    res.status(200).json({
      status: "success",
      message: "Logout successful",
    });
  } catch (error) {
    next(error)
  }
};
