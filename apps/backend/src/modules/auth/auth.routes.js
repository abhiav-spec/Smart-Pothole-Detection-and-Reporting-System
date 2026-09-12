import { Router } from "express";
import {
  registerController,
  loginController,
  refreshController,
  logoutController
} from "./auth.controller.js";
import { authRateLimiter } from "../../middleware/rateLimit.middleware.js";
import { validateRequest } from "../../middleware/validation.middleware.js";
import { registerSchema, loginSchema, refreshSchema } from "./auth.validator.js";

const router = Router();

// Apply auth rate limiter to all auth routes
router.use(authRateLimiter);

// POST /api/auth/register
router.post("/register", validateRequest({ body: registerSchema }), registerController);

// POST /api/auth/login
router.post("/login", validateRequest({ body: loginSchema }), loginController);

// POST /api/auth/refresh
router.post("/refresh", validateRequest({ body: refreshSchema }), refreshController);

// POST /api/auth/logout
router.post("/logout", logoutController);

export default router;
