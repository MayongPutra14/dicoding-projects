import express from "express";
import validate from "../middlewares/validate.js";
import authMiddleware from "../middlewares/auth.js";
import { createCompanySchema } from "../validations/companyValidation.js";
import {
  createCompany,
  updateCompany,
  deleteCompany,
  getCompanies,
  getCompanyById,
} from "../controllers/companyController.js";
const router = express.Router();

router.post(
  "/companies",
  authMiddleware,
  validate(createCompanySchema),
  createCompany,
);

router.put("/companies/:id", authMiddleware, updateCompany);
router.delete("/companies/:id", authMiddleware, deleteCompany);

router.get("/companies", getCompanies);
router.get("/companies/:id", getCompanyById);

export default router;
