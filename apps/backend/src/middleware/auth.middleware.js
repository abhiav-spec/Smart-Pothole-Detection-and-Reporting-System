import asyncHandler from "./asyncHandler.js";
import AppError from "../utils/AppError.js";
import { verifyAccessToken } from "../utils/token.js";
import prisma from "../config/database.js";

/**
 * Middleware verifying JWT Bearer token and populating req.user
 */
export const authenticate = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new AppError("Authentication token is missing or malformed", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = verifyAccessToken(token);
    
    // Optionally verify user still exists in database
    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, email: true, role: true, name: true }
    });

    if (!user) {
      throw new AppError("User belonging to this token no longer exists", 401);
    }

    req.user = user;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      throw new AppError("Authentication token has expired", 401);
    }
    if (err.name === "JsonWebTokenError") {
      throw new AppError("Invalid authentication token", 401);
    }
    throw err;
  }
});
