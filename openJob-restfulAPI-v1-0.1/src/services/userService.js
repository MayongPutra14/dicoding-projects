import pool from "../config/database.js";
import bcrypt from "bcrypt";
import { nanoid } from "nanoid";
import { getAllUsers, getUserById } from "./repositories/userRepositories.js";

export const createUser = async ({ name, email, password, role }) => {
  const id = nanoid(16);
  const hashedPassword = await bcrypt.hash(password, 10);
  const createdAt = new Date().toISOString();
  const updatedAt = createdAt;

  {
    const query = {
      text: "INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4,$5, $6, $7) RETURNING id, name, email, role",
      values: [id, name, email, hashedPassword, role, createdAt, updatedAt],
    };

    const result = await pool.query(query);
    return result.rows[0];
  }
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
