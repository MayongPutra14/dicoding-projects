import { nanoid } from "nanoid";
import {
  addDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
} from "./repositories/documentRepositories.js";

export const handleUploadDocument = async (userId, file) => {
  if (!file) {
    const error = new Error("File is required");
    error.status = 400;
    throw error;
  }

  const id = nanoid(16);
  return await addDocument({
    id,
    user_id: userId,
    filename: file.filename,
    original_name: file.originalname,
    file_path: file.path,
    file_type: file.mimetype,
    size: file.size,
  });
};

export const handleGetAllDocuments = async () => {
  return await getAllDocuments();
};

export const handleGetDocumentById = async (fileId) => {
  const document = await getDocumentById(fileId);

  if (!document) {
    const error = new Error("Document not found");
    error.status = 404;
    throw error;
  }

  return document;
};

export const handleDeleteDocument = async (fileId) => {
  const deleted = await deleteDocument(fileId);

  if (deleted === 0) {
    const error = new Error("Document not found");
    error.status = 404;
    throw error;
  }

  return deleted;
};
