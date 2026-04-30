import express from "express";
import validate from "../middlewares/validate.js";
import { registerSchema } from "../validations/userValidation.js";
import {
  getUsers,
  registerUser,
  getUserById,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/users", validate(registerSchema), registerUser);
router.get("/users", getUsers);
router.get("/users/:id", getUserById);

export default router;
