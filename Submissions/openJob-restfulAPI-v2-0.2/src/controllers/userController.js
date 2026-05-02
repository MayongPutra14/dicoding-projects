import { handleCreateUser } from "../services/userService.js";
import {
  handleGetAllUsers,
  handleGetUserById,
} from "../services/userService.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await handleCreateUser(req.body);

    res.status(201).json({
      status: "success",
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

export const getUsers = async (req, res, next) => {
  try {
    const result = await handleGetAllUsers(req.pool);

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getUserById = async (req, res, next) => {
  try {
    const result = await handleGetUserById(req.params.id);

    if (result.status === "failed") {
      return res.status(404).json({
        status: "failed",
        message: result.message,
      });
    }

    res.set("X-Data-Source", result.source);

    return res.status(200).json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};
