import { nanoid } from "nanoid";
import {
  addJob,
  getAllJobs,
  getJobsByCompanyId,
  getJobsByCategoryId,
  getJobById,
  searchJobs,
  updateJobbyId,
  deleteJobById,
} from "./repositories/jobRepositories.js";

export const handleCreateJob = async (payload) => {
  if (!payload) {
    const error = new Error("Payload is required");
    error.status = 400;
    throw error;
  }

  const id = nanoid(16);
  return await addJob({
    id,
    ...payload,
  });
};

export const handleGetJobs = async (query) => {
  const { title, "company-name": companyName } = query;

  if (title || companyName) {
    return await searchJobs({
      title,
      companyName,
    });
  }

  return await getAllJobs();
};

export const handleGetJobsByCompanyId = async (comapnyId) => {
  const jobs = await getJobsByCompanyId(comapnyId);

  return jobs;
};

export const handleGetJobsByCategoryId = async (categoryId) => {
  const jobs = await getJobsByCategoryId(categoryId);

  return jobs;
};

export const handleGetJobById = async (jobId) => {
  const job = await getJobById(jobId);

  if (!job) {
    const error = new Error("Job not found");
    error.status = 404;
    throw error;
  }

  return job;
};

export const handleUpdateJobById = async (jobId, jobData) => {
  const updated = await updateJobbyId(jobId, jobData);

  if (!updated) {
    const error = new Error("Job not found");
    error.status = 404;
    throw error;
  }

  return updated;
};

export const handleDeleteJobById = async (jobId) => {
  const deleted = await deleteJobById(jobId);

  if (!deleted) {
    const error = new Error("Job not found");
    error.status = 404;
    throw error;
  }

  return deleted;
};
