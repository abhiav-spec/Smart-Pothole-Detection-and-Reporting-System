import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes.js";
import mediaRoutes from "../modules/media/media.routes.js";
import potholeRoutes from "../modules/potholes/pothole.routes.js";
import dashboardRoutes from "../modules/dashboard/dashboard.routes.js";

const router = Router();

router.get("/health", (req, res) => {
  res.status(200).json({
    success: true,
    message: "Smart Pothole Backend Service is healthy",
    timestamp: new Date().toISOString()
  });
});

router.use("/auth", authRoutes);
router.use("/media", mediaRoutes);
router.use("/potholes", potholeRoutes);
router.use("/dashboard", dashboardRoutes);

export default router;
