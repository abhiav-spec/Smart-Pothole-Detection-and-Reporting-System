import asyncHandler from "../../middleware/asyncHandler.js";
import { registerUser, loginUser, refreshUserToken } from "./auth.service.js";

/**
 * @route POST /api/auth/register
 * @desc Register new user account
 * @access Public
 */
export const registerController = asyncHandler(async (req, res) => {
  const { name, email, password, role } = req.body;
  const result = await registerUser({ name, email, password, role });

  res.status(201).json({
    success: true,
    message: "User registered successfully",
    data: result
  });
});

/**
 * @route POST /api/auth/login
 * @desc Authenticate user credentials and return tokens
 * @access Public
 */
export const loginController = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const result = await loginUser({ email, password });

  res.status(200).json({
    success: true,
    message: "Login successful",
    data: result
  });
});

/**
 * @route POST /api/auth/refresh
 * @desc Obtain new access token using refresh token
 * @access Public
 */
export const refreshController = asyncHandler(async (req, res) => {
  const { refreshToken } = req.body;
  const result = await refreshUserToken(refreshToken);

  res.status(200).json({
    success: true,
    message: "Token refreshed successfully",
    data: result
  });
});

/**
 * @route POST /api/auth/logout
 * @desc Revoke user session
 * @access Public
 */
export const logoutController = asyncHandler(async (req, res) => {
  res.status(200).json({
    success: true,
    message: "Logout successful"
  });
});
