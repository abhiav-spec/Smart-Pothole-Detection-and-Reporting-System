import pino from "pino";
import { env } from "./env.js";

const logger = pino({
  level: env.LOG_LEVEL || "info",
  base: env.NODE_ENV === "production" ? { pid: process.pid } : undefined,
  timestamp: pino.stdTimeFunctions.isoTime
});

export default logger;
