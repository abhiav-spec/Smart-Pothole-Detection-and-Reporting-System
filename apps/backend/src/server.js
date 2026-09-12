import app from "./app.js";
import { env } from "./config/env.js";
import logger from "./config/logger.js";

const server = app.listen(env.PORT, () => {
  logger.info(`Server running in ${env.NODE_ENV} mode on port ${env.PORT}`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  logger.error({ err }, "UNHANDLED REJECTION! Shutting down...");
  server.close(() => {
    process.exit(1);
  });
});

// Handle uncaught exceptions
process.on("uncaughtException", (err) => {
  logger.error({ err }, "UNCAUGHT EXCEPTION! Shutting down...");
  process.exit(1);
});
