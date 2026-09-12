import { Router } from "express";
import {
  getOverviewController,
  getMapController,
  getRecentController,
  getAuthorityStatsController
} from "./dashboard.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";

const router = Router();

// GET /api/dashboard/overview (Protected: ADMIN, AUTHORITY)
router.get("/overview", authenticate, authorize("ADMIN", "AUTHORITY"), getOverviewController);

// GET /api/dashboard/map (Public)
router.get("/map", getMapController);

// GET /api/dashboard/recent (Public)
router.get("/recent", getRecentController);

// GET /api/dashboard/authorities (Protected: ADMIN, AUTHORITY)
router.get("/authorities", authenticate, authorize("ADMIN", "AUTHORITY"), getAuthorityStatsController);

export default router;
