import { Router } from "express";
import { handleMulterUpload } from "../../middleware/upload.middleware.js";
import { uploadMediaController } from "./media.controller.js";
import { uploadRateLimiter } from "../../middleware/rateLimit.middleware.js";

const router = Router();

// POST /api/media/upload
router.post("/upload", uploadRateLimiter, handleMulterUpload("file"), uploadMediaController);

export default router;
