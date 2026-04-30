import {
  handleCreateCompany,
  handleGetCompanies,
  handleGetCompanyById,
  handleUpdateCompany,
  handleDeleteCompany,
} from "../services/companyService.js";

export const createCompany = async (req, res, next) => {
  try {
    const result = await handleCreateCompany(req.body, req.user.id);
    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanies = async (req, res, next) => {
  try {
    const companies = await handleGetCompanies();

    res.status(200).json({
      status: "success",
      data: {
        companies,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getCompanyById = async (req, res, next) => {
  try {
    const result = await handleGetCompanyById(req.params.id);

    res.set("X-Data-Source", result.source);

    res.status(200).json({
      status: "success",
      data: result.data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateCompany = async (req, res, next) => {
  try {
    const data = await handleUpdateCompany(req.params.id, req.body);

    res.status(200).json({
      status: "success",
      message: "Data Updated Successfully",
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCompany = async (req, res, next) => {
  try {
    await handleDeleteCompany(req.params.id);

    res.status(200).json({
      status: "success",
      message: "Company deleted",
    });
  } catch (error) {
    next(error);
  }
};
