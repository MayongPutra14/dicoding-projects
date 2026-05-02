import pool from "../../config/database.js";

export const addDocument = async ({
  id,
  user_id,
  filename,
  original_name,
  file_path,
  file_type,
  size,
}) => {
  const query = {
    text: `
        INSERT INTO documents (id, user_id, filename, original_name, file_path, file_type, size)
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING id as "documentId", filename, original_name as "originalName", size `,
    values: [id, user_id, filename, original_name, file_path, file_type, size],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const getAllDocuments = async () => {
  const result = await pool.query("SELECT * FROM documents");
  return result.rows;
};

export const getDocumentById = async (fileId) => {
  const query = {
    text: `SELECT * FROM documents WHERE id = $1`,
    values: [fileId],
  };

  const result = await pool.query(query);
  return result.rows[0];
};

export const deleteDocument = async (fileId) => {
  const query = {
    text: `DELETE FROM documents WHERE id = $1`,
    values: [fileId],
  };

  const result = await pool.query(query);
  return result.rowCount;
};
