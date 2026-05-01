import fs from "fs";
import path from "path";
import {
  handleUploadDocument,
  handleGetAllDocuments,
  handleGetDocumentById,
  handleDeleteDocument,
} from "../services/documentService.js";

export const uploadDocument = async (req, res, next) => {
  try {
    const userId = req.user.id;

    const document = await handleUploadDocument(userId, req.file);

    res.status(201).json({
      status: "success",
      data: document,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllDocuments = async (req, res, next) => {
  try {
    const documents = await handleGetAllDocuments();
    console.log("Document(Getalldocuments):", documents);
    res.status(200).json({
      status: "success",
      data: {
        documents,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getDocumentById = async (req, res, next) => {
  try {
    const document = await handleGetDocumentById(req.params.documentId);
    const filepath = path.resolve(document.file_path);
    console.log("Document(GetDocumentById):", document);
    res.download(filepath, document.original_name, (err) => {
      if (err) {
        if (!res.headersSent) {
          next(err);
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

export const deleteDocument = async (req, res, next) => {
  try {
    await handleDeleteDocument(req.params.documentId);
    res.status(200).json({
      status: "success",
      message: "Document deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};
