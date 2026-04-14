import { createUser } from "../services/userService.js";
import {
  handleGetAllUsers,
  handleGetUserById,
} from "../services/userService.js";

export const registerUser = async (req, res, next) => {
  try {
    const user = await createUser(req.body);

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
    const { id } = req.params;

    const result = await handleGetUserById(id);

    if (result.status === "failed") {
      return res.status(404).json(result);
    }

    return res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};
