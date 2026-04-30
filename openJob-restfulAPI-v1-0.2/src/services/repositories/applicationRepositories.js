import pool from "../../config/database.js";

export const addApplication = async (application) => {
  const { id, user_id, job_id, status } = application;

  const query = {
    text: ` INSERT INTO applications
    (
        id,
        user_id,
        job_id,
        status,
        created_at,
        updated_at
    )
    VALUES ($1, $2, $3, $4, NOW(), NOW())
    RETURNING *`,
    values: [id, user_id, job_id, status],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getAllApplications = async () => {
  const result = await pool.query("SELECT * FROM applications");
  return result.rows;
};

export const getApplicationById = async (applicationId) => {
  const query = {
    text: "SELECT * FROM applications WHERE id = $1",
    values: [applicationId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getApplicationsByUserId = async (userId) => {
  const query = {
    text: `SELECT * FROM applications WHERE user_id = $1`,
    values: [userId],
  };

  const result = await pool.query(query);
  return result.rows;
};

export const getApplicationsByJobId = async (jobId) => {
  const query = {
    text: `SELECT * FROM applications WHERE job_id = $1`,
    values: [jobId],
  };

  const result = await pool.query(query);
  return result.rows;
};

export const updateAppllication = async (applicationId, applicationStatus) => {
  const keys = Object.keys(applicationStatus);

  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(applicationStatus);
  values.push(applicationId);

  const query = {
    text: `UPDATE applications SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
    values,
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const deleteApplication = async (applicationId) => {
  const query = {
    text: `DELETE FROM applications WHERE id = $1 RETURNING id`,
    values: [applicationId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
