import {
  handleCreateCategory,
  handleGetAllCategories,
  handleGetCategoryById,
  handleUpdateCategory,
  handleDeleteCategory,
} from "../services/categoryService.js";

export const createCategory = async (req, res, next) => {
  try {
    const data = await handleCreateCategory(req.body);

    res.status(201).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getCategories = async (req, res, next) => {
  try {
    const categories = await handleGetAllCategories();

    res.status(200).json({
      status: "success",
      data: {
        categories,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCategoryById = async (req, res, next) => {
  try {
    const data = await handleGetCategoryById(req.params.id);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const data = await handleUpdateCategory(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const data = await handleDeleteCategory(req.params.id);

    res.status(200).json({
      status: "success",
      data,
    });
  } catch (error) {
    next(error);
  }
};
