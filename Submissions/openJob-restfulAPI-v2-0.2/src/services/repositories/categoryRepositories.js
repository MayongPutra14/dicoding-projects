import pool from "../../config/database.js";

export const createCategory = async (id, name) => {
  const query = {
    text: `INSERT INTO categories(id, name) VALUES($1, $2) RETURNING *`,
    values: [id, name],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getAllCategories = async () => {
  const result = await pool.query(`SELECT * FROM categories`);
  return result.rows;
};

export const getCategoryById = async (id) => {
  const query = {
    text: `SELECT * FROM categories WHERE id = $1`,
    values: [id],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const updateCategoryById = async (id, name) => {
  const query = {
    text: `UPDATE categories SET name = $1 WHERE id = $2 RETURNING *`,
    values: [name, id],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const deleteCategoryById = async (id) => {
  const query = {
    text: `DELETE FROM categories WHERE id = $1 RETURNING *`,
    values: [id],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
