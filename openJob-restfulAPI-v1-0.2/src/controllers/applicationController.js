import {
  handleCreateApplication,
  handleGetAllApplications,
  handleGetApplicationById,
  handleGetApplicationsByUserId,
  handleGetApplicationsByJobId,
  handleUpdateApplication,
  handleDeleteApplication,
} from "../services/applicationService.js";

export const createApplication = async (req, res, next) => {
  try {
    const applications = await handleCreateApplication(req.body);

    res.status(201).json({
      status: "success",
      data: applications,
    });
  } catch (error) {
    next(error);
  }
};

export const getAllApplications = async (req, res, next) => {
  try {
    const applications = await handleGetAllApplications();

    res.status(200).json({
      status: "success",
      data: {
        applications,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationById = async (req, res, next) => {
  try {
    const applications = await handleGetApplicationById(
      req.params.applicationId,
    );

    res.set("X-Data-Source", applications.source);

    res.status(200).json({
      status: "success",
      data: applications.data,
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationsByUserId = async (req, res, next) => {
  try {
    const applications = await handleGetApplicationsByUserId(req.params.userId);
    res.set("X-Data-Source", applications.source);

    res.status(200).json({
      status: "success",
      data: {
        applications: applications.data,
      }
    });
  } catch (error) {
    next(error);
  }
};

export const getApplicationsByJobId = async (req, res, next) => {
  try {
    const applications = await handleGetApplicationsByJobId(req.params.JobId);
    res.set("X-Data-Source", applications.source);

    res.status(200).json({
      status: "success",
      data: applications.data,
    });
  } catch (error) {
    next(error);
  }
};

export const updateApplication = async (req, res, next) => {
  try {
    const applications = await handleUpdateApplication(
      req.params.applicationId,
      req.body,
    );

    res.status(200).json({
      status: "success",
      message: "Job Updated Successfully",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const applications = await handleDeleteApplication(
      req.params.applicationId,
    );

    res.status(200).json({
      status: "success",
      message: "Job Deleted Successfully",
    });
  } catch (error) {
    next(error);
  }
};
