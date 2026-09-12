import bcrypt from "bcryptjs";
import prisma from "../../config/database.js";
import AppError from "../../utils/AppError.js";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../../utils/token.js";

/**
 * Registers a new user.
 */
export const registerUser = async ({ name, email, password, role = "USER" }) => {
  if (!name || !email || !password) {
    throw new AppError("Name, email, and password are required fields", 400);
  }

  const existingUser = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (existingUser) {
    throw new AppError("A user with this email address already exists", 409);
  }

  const validRoles = ["USER", "AUTHORITY", "ADMIN"];
  const userRole = validRoles.includes(role?.toUpperCase()) ? role.toUpperCase() : "USER";

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      name,
      email: email.toLowerCase(),
      passwordHash,
      role: userRole
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      createdAt: true
    }
  });

  const accessToken = generateAccessToken(user);
  const refreshToken = generateRefreshToken(user);

  return { user, accessToken, refreshToken };
};

/**
 * Authenticates user credentials.
 */
export const loginUser = async ({ email, password }) => {
  if (!email || !password) {
    throw new AppError("Email and password are required fields", 400);
  }

  const user = await prisma.user.findUnique({
    where: { email: email.toLowerCase() }
  });

  if (!user) {
    throw new AppError("Invalid email or password credentials", 401);
  }

  const isMatch = await bcrypt.compare(password, user.passwordHash);
  if (!isMatch) {
    throw new AppError("Invalid email or password credentials", 401);
  }

  const userData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    createdAt: user.createdAt
  };

  const accessToken = generateAccessToken(userData);
  const refreshToken = generateRefreshToken(userData);

  return { user: userData, accessToken, refreshToken };
};

/**
 * Refreshes an access token using a valid refresh token.
 */
export const refreshUserToken = async (refreshToken) => {
  if (!refreshToken) {
    throw new AppError("Refresh token is required", 400);
  }

  try {
    const decoded = verifyRefreshToken(refreshToken);

    const user = await prisma.user.findUnique({
      where: { id: decoded.id },
      select: { id: true, name: true, email: true, role: true }
    });

    if (!user) {
      throw new AppError("User belonging to refresh token no longer exists", 401);
    }

    const newAccessToken = generateAccessToken(user);
    const newRefreshToken = generateRefreshToken(user);

    return {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken
    };
  } catch (err) {
    throw new AppError("Invalid or expired refresh token", 401);
  }
};
