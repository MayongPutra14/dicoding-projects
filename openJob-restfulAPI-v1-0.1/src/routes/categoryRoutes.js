import express from "express";
import authenticate from "../middlewares/auth.js";
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import validate from "../middlewares/validate.js";
import { createCategorySchema } from "../validations/categoryValidation.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/categories/:id", getCategoryById);
router.post(
  "/categories",
  authenticate,
  validate(createCategorySchema),
  createCategory,
);
router.put("/categories/:id", authenticate, updateCategory);
router.delete("/categories/:id", authenticate, deleteCategory);

export default router;
