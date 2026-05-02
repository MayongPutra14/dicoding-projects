import express from "express";
import authenticate from "../middlewares/auth.js";
import validate from "../middlewares/validate.js";
import { applicationSchema } from "../validations/applicationValidation.js";
import {
  createApplication,
  getAllApplications,
  getApplicationById,
  getApplicationsByUserId,
  getApplicationsByJobId,
  updateApplication,
  deleteApplication
} from "../controllers/applicationController.js";

const router = express.Router();

router.post(
  "/applications",
  authenticate,
  validate(applicationSchema),
  createApplication,
);

router.get("/applications",authenticate,  getAllApplications);
router.get("/applications/:applicationId",authenticate,  getApplicationById);
router.get("/applications/user/:userId",authenticate,  getApplicationsByUserId);
router.get("/applications/job/:jobId",authenticate,  getApplicationsByJobId);
router.put("/applications/:applicationId",authenticate,  updateApplication);
router.delete("/applications/:applicationId",authenticate,  deleteApplication);

export default router;
