import pool from "../../config/database.js";

export const createUser = async ({ id, name, email, password, role, createdAt, updatedAt }) => {
  const query = {
    text: "INSERT INTO users (id, name, email, password, role, created_at, updated_at) VALUES ($1, $2, $3, $4,$5, $6, $7) RETURNING id, name, email, role",
    values: [id, name, email, password, role, createdAt, updatedAt],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getAllUsers = async (pool) => {
  const query = {
    text: `SELECT id, name, email, role, created_at, updated_at FROM users`,
  };

  const result = await pool.query(query);
  return result.rows;
};

export const getUserById = async (id) => {
  const query = {
    text: `SELECT id, name, email, role, created_at, updated_at FROM users WHERE id = $1`,
    values: [id],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getUserByEmail = async (email) => {
  const query = {
    text: "SELECT * FROM users  WHERE email = $1",
    values: [email],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
