import { loginUser } from "../services/authService.js";
export const login = async (req, res, next) => {
  try {
    const tokens = await loginUser(req.body);

    res.status(200).json({
      status: "success",
      data: {
        accessToken: tokens.accessToken,
        refreshToken: tokens.refreshToken,
      },
    });
  } catch (error) {
    next(error);
  }
};
