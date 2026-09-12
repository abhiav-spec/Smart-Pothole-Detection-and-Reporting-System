import rateLimit from "express-rate-limit";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";

/**
 * General API rate limiter for general routes.
 */
export const generalRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.RATE_LIMIT_MAX_REQUESTS,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError("Too many requests from this IP. Please try again later.", 429));
  }
});

/**
 * Strict rate limiter for authentication routes (login, register).
 */
export const authRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.AUTH_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError("Too many authentication attempts. Please try again later.", 429));
  }
});

/**
 * Rate limiter for heavy media uploads.
 */
export const uploadRateLimiter = rateLimit({
  windowMs: env.RATE_LIMIT_WINDOW_MS,
  max: env.UPLOAD_RATE_LIMIT_MAX,
  standardHeaders: true,
  legacyHeaders: false,
  handler: (req, res, next) => {
    next(new AppError("Media upload limit reached. Please try again later.", 429));
  }
});
