import express from "express";
import { upload } from "../middlewares/uploadMiddleware.js";
import authenticate from "../middlewares/auth.js";
import {
  uploadDocument,
  getAllDocuments,
  getDocumentById,
  deleteDocument,
} from "../controllers/documentController.js";

const route = express.Router();

route.post(
  "/documents",
  authenticate,
  upload.single("document"),
  uploadDocument,
);
route.get("/documents", getAllDocuments);
route.get("/documents/:documentId", getDocumentById);
route.delete("/documents/:documentId", authenticate, deleteDocument);

export default route;
