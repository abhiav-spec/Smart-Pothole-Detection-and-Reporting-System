import { env } from "../config/env.js";
import logger from "../config/logger.js";

const globalErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || "error";

  if (statusCode >= 500) {
    logger.error({ err, path: req.originalUrl, method: req.method }, "Server Error");
  } else {
    logger.warn({ path: req.originalUrl, method: req.method, statusCode, message: err.message }, "Operational Client Error");
  }

  res.status(statusCode).json({
    success: false,
    status,
    message: err.message || "Internal Server Error",
    ...(env.NODE_ENV === "development" && { stack: err.stack })
  });
};

export default globalErrorHandler;
