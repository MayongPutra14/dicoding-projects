import pool from "../config/database.js";


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