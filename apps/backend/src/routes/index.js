import { Router } from "express";
import mediaRoutes from "../modules/media/media.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Pothole Backend Service is healthy",
    timestamp: new Date().toISOString()
  });
});

router.use("/media", mediaRoutes);

export default router;
