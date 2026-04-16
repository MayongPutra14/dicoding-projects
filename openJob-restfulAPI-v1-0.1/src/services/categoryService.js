import {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategoryById,
  deleteCategoryById,
} from "./repositories/categoryRepositories.js";
import { nanoid } from "nanoid";

export const handleCreateCategory = async (payload) => {
  const { name } = payload;

  if (!name) {
    const error = new Error("Invalid Payload");
    error.status = 400;
    throw error;
  }

  const id = nanoid(16);

  return await createCategory(id, name);
};

export const handleGetAllCategories = async (id) => {
  return await getAllCategories();
};

export const handleGetCategoryById = async (id) => {
  const category = await getCategoryById(id);

  if (!category) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }
  return category;
};

export const handleUpdateCategory = async (id, payload) => {
  if (!payload) {
    const error = new Error("Payload is required");
    error.status = 400;
    throw error;
  }

  const { name } = payload;
  if (!name) {
    const error = new Error("Invalid Payload");
    error.status = 400;
    throw error;
  }

  const updated = await updateCategoryById(id, name);

  if (!updated) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }

  return updated;
};

export const handleDeleteCategory = async (id) => {
  const deleted = await deleteCategoryById(id);
  if (!deleted) {
    const error = new Error("Category not found");
    error.status = 404;
    throw error;
  }
  return deleted;
};
