import {
  addCompany,
  getAllCompanies,
  getCompanyById,
  updateCompanyById,
  deleteCompanyById,
} from "./repositories/companyRepositories.js";
import { nanoid } from "nanoid";

export const handleCreateCompany = async (payload, userId) => {
  const id = nanoid(16);
  return await addCompany({
    id,
    ...payload,
    user_id: userId,
  });
};

export const handleGetCompanies = async () => {
  return await getAllCompanies();
};

export const handleGetCompanyById = async (id) => {
  const company = await getCompanyById(id);

  if (!company) {
    const error = new Error("Company not found");
    error.status = 404;
    throw error;
  }

  return company;
};

export const handleUpdateCompany = async (id, payload) => {
  const updated = await updateCompanyById(id, payload);

  if (!updated) {
    const error = new Error("Company not found");
    error.status = 404;
    throw error;
  }

  return updated;
};

export const handleDeleteCompany = async (id) => {
  const deleted = await deleteCompanyById(id);

  if (!deleted) {
    const error = new Error("Company not found");
    error.status = 404;
    throw error;
  }

  return deleted;
};
