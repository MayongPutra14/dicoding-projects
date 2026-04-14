import pool from "../config/database.js";
import bcrypt from "bcrypt";
import jwt, { decode } from "jsonwebtoken";

export const loginUser = async ({ email, password }) => {
  const query = {
    text: "SELECT * FROM users WHERE email = $1",
    values: [email],
  };

  const result = await pool.query(query);
  const user = result.rows[0];

  if (!user) {
    throw new Error("Invalid Credentials");
  }

  const isValid = await bcrypt.compare(password, user.password);

  if (!isValid) {
    throw new Error("Invalid Credentials");
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
  const query = {
    text: "INSERT INTO authentications (refresh_token) VALUES ($1)",
    values: [token],
  };

  await pool.query(query);
};

export const refreshAccessToken = async (refreshToken) => {
  const query = {
    text: "SELECT refresh_token FROM authentications WHERE refresh_token = $1",
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
    text: "DELETE FROM authentications WHERE refresh_token = $1",
    values: [token],
  };

  await pool.query(query);
};
