import express from "express";
import { authenticationSchema } from "../validations/userValidation.js";
import validate from "../middlewares/validate.js";
import { login, refresh, logout } from "../controllers/authController.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.post("/authentications", validate(authenticationSchema), login);
router.put("/authentications", refresh);
router.delete("/authentications", authenticate, logout);

export default router;
