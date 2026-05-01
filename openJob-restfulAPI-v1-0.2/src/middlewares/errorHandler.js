import multer from "multer";

const errorHandler = (err, req, res, next) => {
  if (err instanceof multer.MulterError) {
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }

  if (err.message === "Only PDF files are allowed") {
    return res.status(400).json({
      status: "failed",
      message: err.message,
    });
  }

  res.status(err.status || 500).json({
    status: "failed",
    message: err.message || "Internal Server Error",
  });
};

export default errorHandler;
