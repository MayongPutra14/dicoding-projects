import pool from "../../config/database.js";
import { nanoid } from "nanoid";

export const saveRefreshToken = async (token) => {
  const id = nanoid(16);
  const query = {
    text: `INSERT INTO authentications (id, token) VALUES ($1, $2) RETURNING *`,
    values: [id, token],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const checkRefreshToken = async (token) => {
  const query = {
    text: `SELECT token FROM authentications WHERE token = $1`,
    values: [token],
  };

  const result = await pool.query(query);
  return result.rows.length > 0;
};

export const deleteRefreshToken = async (token) => {
  const query = {
    text: `DELETE FROM authentications WHERE token = $1 RETURNING token`,
    values: [token],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
