import pool from "../../config/database.js";

export const addBookmark = async (id, userId, jobId) => {
  const query = {
    text: `INSERT INTO bookmarks (id, user_id, job_id)
        VALUES ($1, $2, $3)
        RETURNING *
        `,
    values: [id, userId, jobId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getAllBookmarksByUserId = async (userId) => {
  const query = {
    text: `
      SELECT 
        bookmarks.id, 
        bookmarks.user_id, 
        bookmarks.job_id, 
        bookmarks.created_at, 
        bookmarks.updated_at,
        jobs.category_id,
        jobs.title,
        jobs.description,
        jobs.job_type,
        jobs.experience_level,
        jobs.location_type,
        jobs.location_city,
        jobs.salary_min,
        jobs.salary_max,
        jobs.is_salary_visible,
        jobs.status AS job_status,
        companies.name AS company_name,
        companies.location AS company_location
      FROM bookmarks
      JOIN jobs ON bookmarks.job_id = jobs.id
      JOIN companies ON jobs.company_id = companies.id
      WHERE bookmarks.user_id = $1 
      ORDER BY bookmarks.created_at DESC`,
    values: [userId],
  };

  const result = await pool.query(query);
  return result.rows;
};

export const getBookmarkById = async (bookmarkId, jobId) => {
  const query = {
    text: `SELECT * FROM bookmarks
        WHERE id = $1 AND job_id = $2
        `,
    values: [bookmarkId, jobId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const deleteBookmark = async (userId, jobId) => {
  const query = {
    text: `DELETE FROM bookmarks
      WHERE user_id = $1 AND job_id = $2
      RETURNING *
      `,
    values: [userId, jobId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};
