import pool from "../../config/database.js";

export const addCompany = async ({
  id,
  name,
  location,
  description,
  user_id,
}) => {
  const query = {
    text: `INSERT INTO companies (id, name, location, description, user_id) VALUES ($1, $2, $3, $4, $5 ) RETURNING id, name, location, description, user_id`,
    values: [id, name, location, description, user_id],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getAllCompanies = async () => {
  const result = await pool.query("SELECT * FROM companies");
  return result.rows;
};

export const getCompanyById = async (id) => {
  const query = {
    text: `SELECT * FROM companies WHERE id = $1`,
    values: [id],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const updateCompanyById = async (
  id,
  { name, location, description },
) => {
  const query = {
    text: `UPDATE companies SET name = $1, location = $2, description = $3 WHERE id = $4 RETURNING *`,
    values: [name, location, description, id],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const deleteCompanyById = async (id) => {
  const query = {
    text: `DELETE FROM companies WHERE id = $1 RETURNING id`,
    values: [id],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
