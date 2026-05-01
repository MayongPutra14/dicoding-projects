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
  const query = {
    text: `
      SELECT 
      a.id,
      a.status,
      a.created_at,
      a.updated_at,

      u.id AS user_id,
      u.name AS user_name,
      u.email AS user_email,

      j.id AS job_id,
      j.title AS job_title,

      c.id AS company_id,
      c.name AS company_name,

      cat.id AS category_id,
      cat.name AS category_name

    FROM applications a
    JOIN users u ON a.user_id = u.id
    JOIN jobs j ON a.job_id = j.id
    JOIN companies c ON j.company_id = c.id
    JOIN categories cat ON j.category_id = cat.id
    `,
  };

  const result = await pool.query(query);
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
    text: `
    SELECT 
        applications.id,
        applications.status,
        applications.created_at,
        applications.updated_at,
        applications.job_id,
        applications.user_id,
        jobs.title,
        jobs.job_type,
        jobs.location_type,
        jobs.location_city,
        jobs.salary_min,
        jobs.salary_max,
        jobs.is_salary_visible,
        companies.name AS company_name,
        categories.name AS category_name
      FROM applications
      JOIN jobs ON applications.job_id = jobs.id
      JOIN companies ON jobs.company_id = companies.id
      JOIN categories ON jobs.category_id = categories.id
      WHERE applications.user_id = $1
      ORDER BY applications.created_at DESC
    
    `,
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

export const getApplicationByUserAndJob = async (userId, jobId) => {
  const query = {
    text: `SELECT * FROM applications WHERE user_id = $1 AND job_id = $2`,
    values: [userId, jobId],
  };

  const result = await pool.query(query);
  return result.rows[0];
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
