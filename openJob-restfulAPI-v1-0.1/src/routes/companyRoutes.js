import express from "express";
import validate from "../middlewares/validate.js";
import authenticate from "../middlewares/auth.js";
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
  authenticate,
  validate(createCompanySchema),
  createCompany,
);

router.put("/companies/:id", authenticate, updateCompany);
router.delete("/companies/:id", authenticate, deleteCompany);

router.get("/companies", getCompanies);
router.get("/companies/:id", getCompanyById);

export default router;
