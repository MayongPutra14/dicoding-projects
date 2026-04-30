import { nanoid } from "nanoid";
import redis from "../config/redis.js";
import { producerApplicationEvent } from "../messaging/produces.js";
import {
  addApplication,
  getAllApplications,
  getApplicationById,
  getApplicationsByUserId,
  getApplicationsByJobId,
  getApplicationByUserAndJob,
  updateAppllication,
  deleteApplication,
} from "./repositories/applicationRepositories.js";

export const handleCreateApplication = async (payload) => {
  if (!payload) {
    const error = new Error("Payload is required");
    error.status = 400;
    throw error;
  }
  const { user_id, job_id } = payload;

  const existing = await getApplicationByUserAndJob(user_id, job_id);
  if (existing) {
    const error = new Error("Application already exists");
    error.status = 400;
    throw error;
  }

  const id = nanoid(16);
  const newApplication = await addApplication({
    id,
    ...payload,
  });

  await producerApplicationEvent({
    id: newApplication.id,
    userId: newApplication.user_id,
    jobId: newApplication.job_id,
  });

  await redis.del(`applications:user:${user_id}`);
  await redis.del(`applications:job:${job_id}`);

  return newApplication;
};

export const handleGetAllApplications = async () => {
  return await getAllApplications();
};

export const handleGetApplicationById = async (applicationId) => {
  const cacheKey = `application:${applicationId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return {
      data: JSON.parse(cached),
      source: "cache",
    };
  }

  const data = await getApplicationById(applicationId);

  if (!data) {
    const error = new Error("Application not found");
    error.status = 404;
    throw error;
  }

  await redis.setEx(cacheKey, 3600, JSON.stringify(data));

  return {
    data,
    source: "database",
  };
};

export const handleGetApplicationsByUserId = async (userId) => {
  const cacheKey = `applications:user:${userId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return {
      data: JSON.parse(cached),
      source: "cache",
    };
  }

  const data = await getApplicationsByUserId(userId);

  await redis.setEx(cacheKey, 3600, JSON.stringify(data));
  return {
    data,
    source: "database",
  };
};

export const handleGetApplicationsByJobId = async (jobId) => {
  const cacheKey = `applications:job:${jobId}`;
  const cached = await redis.get(cacheKey);
  if (cached) {
    return {
      data: JSON.parse(cached),
      source: "cache",
    };
  }

  const data = await getApplicationsByJobId(jobId);

  await redis.setEx(cacheKey, 3600, JSON.stringify(data));

  return {
    data,
    source: "database",
  };
};

export const handleUpdateApplication = async (
  applicationId,
  applicationStatus,
) => {
  const oldData = await getApplicationById(applicationId);
  if (!oldData) {
    const error = new Error("Application not found");
    error.status = 404;
    throw error;
  }

  const updatedApplication = await updateAppllication(
    applicationId,
    applicationStatus,
  );

  await redis.del(`application:${applicationId}`);
  await redis.del(`applications:user:${updatedApplication.user_id}`);
  await redis.del(`applications:job:${updatedApplication.job_id}`);

  return updatedApplication;
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
