import { Router } from "express";
import { listPotholesController, updatePotholeStatusController, getPotholeByIdController } from "./pothole.controller.js";
import { authenticate } from "../../middleware/auth.middleware.js";
import { authorize } from "../../middleware/role.middleware.js";
import { validateRequest } from "../../middleware/validation.middleware.js";
import { updateStatusSchema } from "./pothole.validator.js";

const router = Router();

// GET /api/potholes (Paginated list, search, filter, sort)
router.get("/", listPotholesController);

// GET /api/potholes/:potholeId
router.get("/:potholeId", getPotholeByIdController);

// PATCH /api/potholes/:potholeId/status
router.patch(
  "/:potholeId/status",
  authenticate,
  authorize("ADMIN", "AUTHORITY"),
  validateRequest({ body: updateStatusSchema }),
  updatePotholeStatusController
);

export default router;

