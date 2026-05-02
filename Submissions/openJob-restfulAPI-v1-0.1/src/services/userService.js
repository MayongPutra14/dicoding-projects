import { nanoid } from "nanoid";
import pool from "../config/database.js";
import bcrypt from "bcrypt";
import {
  createUser,
  getAllUsers,
  getUserById,
} from "./repositories/userRepositories.js";

export const handleCreateUser = async ({ name, email, password, role }) => {
  const id = nanoid(16);
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  const user = await createUser({
    id,
    name,
    email,
    password: hashedPassword,
    role,
    createdAt,
    updatedAt,
  });

  return user
};

export const handleGetAllUsers = async (pool) => {
  const users = await getAllUsers(pool);

  return {
    status: "success",
    data: users,
  };
};

export const handleGetUserById = async (id) => {
  const user = await getUserById(id);

  if (!user) {
    return {
      status: "failed",
      message: "User not found",
    };
  }

  return {
    status: "success",
    data: user,
  };
};
