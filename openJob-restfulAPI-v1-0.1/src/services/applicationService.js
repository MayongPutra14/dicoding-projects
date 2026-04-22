import { nanoid } from "nanoid";
import {
  addApplication,
  getAllApplications,
  getApplicationById,
  getApplicationByUserId,
  getApplicationByJobId,
  updateAppllication,
  deleteApplication,
} from "./repositories/applicationRepositories.js";

export const handleCreateApplication = async (payload) => {
  if (!payload) {
    const error = new Error("Payload is required");
    error.status = 400;
    throw error;
  }

  const id = nanoid(16);
  console.log("Ini ID dari application", id);
  return await addApplication({
    id,
    ...payload,
  });
};

export const handleGetAllApplications = async () => {
  return await getAllApplications();
};

export const handleGetApplicationById = async (applicationId) => {
  const data = await getApplicationById(applicationId);

  if (!data) {
    const error = new Error("Application ID is required");
    error.status = 404;
    throw error;
  }

  return data;
};

export const handleGetApplicationsByUserId = async (userId) => {
  const data = await getApplicationByUserId(userId);
  return data;
};

export const handleGetApplicationsByJobId = async (jobId) => {
  const data = await getApplicationByJobId(jobId);
  return data;
};

export const handleUpdateApplication = async (
  applicationId,
  applicationStatus,
) => {
  const updated = await updateAppllication(applicationId, applicationStatus);

  if (!updated) {
    const error = new Error("Application not found");
    error.status = 404;
    throw error;
  }

  return updated;
};

export const handleDeleteApplication = async (applicationId) => {
  const deleted = await deleteApplication(applicationId);

  if (!deleted) {
    const error = new Error("Application not found");
    error.status = 404;
    throw error;
  }

  return deleted;
};
