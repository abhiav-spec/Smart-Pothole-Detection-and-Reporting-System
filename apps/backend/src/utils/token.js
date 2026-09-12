import jwt from "jsonwebtoken";
import { env } from "../config/env.js";

/**
 * Generates an Access Token for a user.
 * @param {Object} payload - User object payload { id, email, role }
 * @returns {string} JWT Access Token
 */
export const generateAccessToken = (payload) => {
  return jwt.sign(
    { id: payload.id, email: payload.email, role: payload.role },
    env.JWT_ACCESS_SECRET,
    { expiresIn: env.JWT_ACCESS_EXPIRES_IN || "15m" }
  );
};

/**
 * Generates a Refresh Token for a user.
 * @param {Object} payload - User object payload { id, email, role }
 * @returns {string} JWT Refresh Token
 */
export const generateRefreshToken = (payload) => {
  return jwt.sign(
    { id: payload.id, email: payload.email, role: payload.role },
    env.JWT_REFRESH_SECRET,
    { expiresIn: env.JWT_REFRESH_EXPIRES_IN || "7d" }
  );
};

/**
 * Verifies an Access Token.
 * @param {string} token
 * @returns {Object} Decoded payload
 */
export const verifyAccessToken = (token) => {
  return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

/**
 * Verifies a Refresh Token.
 * @param {string} token
 * @returns {Object} Decoded payload
 */
export const verifyRefreshToken = (token) => {
  return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
