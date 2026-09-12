import crypto from "crypto";
import logger from "../config/logger.js";

/**
 * Request Tracing & Structured Logging Middleware using Pino child loggers.
 */
export const requestLoggerMiddleware = (req, res, next) => {
  // 1. Extract or generate unique Request ID
  const requestId = req.headers["x-request-id"] || `req-${crypto.randomUUID()}`;
  req.id = requestId;
  res.setHeader("X-Request-ID", requestId);

  // 2. Attach request-scoped child logger
  req.logger = logger.child({ requestId });

  const startTime = Date.now();

  // 3. Log response metrics on stream finish
  res.on("finish", () => {
    const durationMs = Date.now() - startTime;
    const statusCode = res.statusCode;
    const userId = req.user?.id || null;

    const logData = {
      requestId,
      method: req.method,
      url: req.originalUrl || req.url,
      statusCode,
      durationMs,
      userId
    };

    if (statusCode >= 500) {
      req.logger.error(logData, "Server Error Request Completed");
    } else if (statusCode >= 400) {
      req.logger.warn(logData, "Client Error Request Completed");
    } else {
      req.logger.info(logData, "Request Completed");
    }
  });

  next();
};
