import pool from "../../config/database.js";

export const addJob = async (job) => {
  const {
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
  } = job;

  const query = {
    text: `INSERT INTO jobs 
  (
    id,
    company_id,
    category_id,
    title,
    description,
    job_type,
    experience_level,
    location_type,
    location_city,
    salary_min,
    salary_max,
    is_salary_visible,
    status,
    created_at,
    updated_at
  )
    VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, NOW(), NOW())
    RETURNING * `,
    values: [
      id,
      company_id,
      category_id,
      title,
      description,
      job_type,
      experience_level,
      location_type,
      location_city,
      salary_min,
      salary_max,
      is_salary_visible,
      status,
    ],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getAllJobs = async () => {
  const query = {
    text: `SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
        FROM jobs
        JOIN companies ON jobs.company_id = companies.id
        JOIN categories ON jobs.category_id = categories.id
        `,
  };

  const result = await pool.query(query);
  return result.rows;
};

export const searchJobs = async ({ title, companyName }) => {
  let baseQuery = ` SELECT jobs.*, companies.name AS company_name, categories.name AS category_name
        FROM jobs
        JOIN companies ON jobs.company_id = companies.id
        JOIN categories ON jobs.category_id = categories.id
        WHERE 1 = 1
    `;

  const values = [];
  let index = 1;

  if (title) {
    baseQuery += `AND jobs.title ILIKE $${index}`;
    values.push(`%${title}%`);
    index++;
  }
  if (companyName) {
    baseQuery += `AND companies.name ILIKE $${index}`;
    values.push(`%${companyName}%`);
    index++;
  }

  const result = await pool.query({
    text: baseQuery,
    values,
  });

  return result.rows;
};

export const getJobsByCompanyId = async (companyId) => {
  const query = {
    text: `SELECT * FROM jobs WHERE company_id = $1`,
    values: [companyId],
  };

  const result = await pool.query(query);
  return result.rows;
};

export const getJobsByCategoryId = async (categoryId) => {
  const query = {
    text: `SELECT * FROM jobs WHERE category_id = $1`,
    values: [categoryId],
  };

  const result = await pool.query(query);
  return result.rows;
};

export const getJobById = async (jobId) => {
  const query = {
    text: `SELECT * FROM jobs WHERE id = $1`,
    values: [jobId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const deleteJobById = async (jobId) => {
  const query = {
    text: `DELETE FROM jobs WHERE id = $1 RETURNING id`,
    values: [jobId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const updateJobbyId = async (jobId, jobData) => {
  const keys = Object.keys(jobData);

  if (keys.length === 0) return;

  const setClause = keys
    .map((key, index) => `${key} = $${index + 1}`)
    .join(", ");

  const values = Object.values(jobData);
  values.push(jobId);

  const query = {
    text: `UPDATE jobs SET ${setClause}, updated_at = NOW() WHERE id = $${values.length} RETURNING *`,
    values,
  };

  const result = await pool.query(query);
  return result.rows[0];
};
