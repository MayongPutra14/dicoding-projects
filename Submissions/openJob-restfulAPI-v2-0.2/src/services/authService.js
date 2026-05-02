import { nanoid } from "nanoid";
import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import { getUserByEmail } from "./repositories/userRepositories.js";
import {
  saveRefreshToken,
  checkRefreshToken,
  deleteRefreshToken,
} from "./repositories/authRepositories.js";

export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    const error = new Error("Invalid Payload");
    error.status = 400;
    throw error;
  }

  const user = await getUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid Credentials");
    error.status = 401;
    throw error;
  }

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) {
    const error = new Error("Invalid Credentials");
    error.status = 401;
    throw error;
  }

  const payload = { id: user.id };
  const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "3h",
  });
  const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_KEY);

  await saveRefreshToken(refreshToken);

  return { accessToken, refreshToken };
};

export const refreshAccessToken = async (refreshToken) => {
  const isTokenValid = await checkRefreshToken(refreshToken);

  if (!isTokenValid) {
    const error = new Error("Invalid refresh token");
    error.status = 400;
    throw error;
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

    const newAccessToken = jwt.sign(
      { id: decoded.id },
      process.env.ACCESS_TOKEN_KEY,
      { expiresIn: "3h" },
    );

    return newAccessToken;
  } catch (error) {
    error.message = "Refresh token expired";
    error.status = 401;
    throw error;
  }
};

export const logoutUser = async (refreshToken) => {
  const isTokenValid = await checkRefreshToken(refreshToken);

  if (!isTokenValid) {
    const error = new Error("Invalid refresh token");
    error.status = 400;
    throw error;
  }

  await deleteRefreshToken(refreshToken);
};
