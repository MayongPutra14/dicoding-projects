import express from "express";
import authenticate from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { jobSchema } from "../validations/jobValidations.js";
import {
  createJob,
  getJobs,
  getJobsByCompanyId,
  getJobsByCategoryId,
  getJobById,
  updateJobById,
  deleteJoById,
} from "../controllers/jobController.js";

const router = express.Router();

router.post("/jobs", authenticate, validate(jobSchema), createJob);
router.get("/jobs", getJobs);
router.get("/jobs/company/:companyId", getJobsByCompanyId);
router.get("/jobs/category/:jobCategoryId", getJobsByCategoryId);
router.get("/jobs/:jobId", getJobById);
router.put("/jobs/:jobId", authenticate, updateJobById);
router.delete("/jobs/:jobId", authenticate, deleteJoById);
export default router;
