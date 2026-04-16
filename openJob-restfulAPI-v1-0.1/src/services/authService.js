import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";
import { getUserByEmail } from "./repositories/userRepositories.js";
import { nanoid } from "nanoid";

export const loginUser = async ({ email, password }) => {
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

export const saveRefreshToken = async (token) => {
  const id = nanoid(16);
  const query = {
    text: "INSERT INTO authentications (id, token) VALUES ($1, $2)",
    values: [id, token],
  };

  await pool.query(query);
};

export const refreshAccessToken = async (refreshToken) => {
  const query = {
    text: "SELECT token FROM authentications WHERE refresh_token = $1",
    values: [refreshToken],
  };

  const result = await pool.query(query);

  if (!result.rows.length) {
    throw new Error("Invalid refresh token");
  }

  const decoded = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_KEY);

  const newAccessToken = jwt.sign(
    {
      id: decoded.id,
    },
    process.env.ACCESS_TOKEN_KEY,
    {
      expiresIn: "3h",
    },
  );
  return newAccessToken;
};

export const deleteRefreshToken = async (token) => {
  const query = {
    text: "DELETE FROM authentications WHERE token = $1",
    values: [token],
  };

  await pool.query(query);
};
