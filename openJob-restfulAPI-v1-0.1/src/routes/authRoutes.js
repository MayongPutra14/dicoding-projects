import express from "express";
import { login } from "../controllers/authController.js";

const router = express.Router();

router.post("/authentications", login);

export default router;
