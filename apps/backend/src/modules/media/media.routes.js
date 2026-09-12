import { Router } from "express";
import { handleMulterUpload } from "../../middleware/upload.middleware.js";
import { uploadMediaController } from "./media.controller.js";

const router = Router();

// POST /api/media/upload
router.post("/upload", handleMulterUpload("file"), uploadMediaController);

export default router;
