import {
  handleCreateJob,
  handleGetJobs,
  handleGetJobsByCompanyId,
  handleGetJobsByCategoryId,
  handleGetJobById,
  handleUpdateJobById,
  handleDeleteJobById,
} from "../services/jobService.js";

export const createJob = async (req, res, next) => {
  try {
    const result = await handleCreateJob(req.body);

    res.status(201).json({
      status: "success",
      data: result,
    });
  } catch (error) {
    next(error);
  }
};

export const getJobs = async (req, res, next) => {
  try {
    const jobs = await handleGetJobs(req.query);

    res.status(200).json({
      status: "success",
      data: {
        jobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJobsByCompanyId = async (req, res, next) => {
  try {
    const jobs = await handleGetJobsByCompanyId(req.params.companyId);

    res.status(200).json({
      status: "success",
      data: {
        jobs: jobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJobsByCategoryId = async (req, res, next) => {
  try {
    const jobs = await handleGetJobsByCategoryId(req.params.jobCategoryId);

    res.status(200).json({
      status: "success",
      data: {
        jobs: jobs,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getJobById = async (req, res, next) => {
  try {
    const job = await handleGetJobById(req.params.jobId);
    res.status(200).json({
      status: "success",
      data: job,
    });
  } catch (error) {
    next(error);
  }
};

export const updateJobById = async (req, res, next) => {
  try {
    await handleUpdateJobById(req.params.jobId, req.body);

    res.status(200).json({
      status: "success",
      message: "Job Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteJoById = async (req, res, next) => {
  try {
    await handleDeleteJobById(req.params.jobId);

    res.status(200).json({
      status: "success",
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
