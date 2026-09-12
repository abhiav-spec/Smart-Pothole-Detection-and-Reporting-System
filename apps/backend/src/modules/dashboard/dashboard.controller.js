import asyncHandler from "../../middleware/asyncHandler.js";
import {
  getOverviewStats,
  getMapPotholes,
  getRecentPotholes,
  getAuthorityStats
} from "./dashboard.service.js";

/**
 * @route GET /api/dashboard/overview
 * @desc Get overall statistics (total, status breakdown, severity breakdown)
 * @access Public (Will require Admin/Authority role in Step 21)
 */
export const getOverviewController = asyncHandler(async (req, res, next) => {
  const stats = await getOverviewStats();
  res.status(200).json({
    success: true,
    data: stats
  });
});

/**
 * @route GET /api/dashboard/map
 * @desc Get lightweight pothole coordinates for Leaflet map display
 * @access Public
 */
export const getMapController = asyncHandler(async (req, res, next) => {
  const { status, severity } = req.query;
  const potholes = await getMapPotholes({ status, severity });
  res.status(200).json({
    success: true,
    count: potholes.length,
    data: potholes
  });
});

/**
 * @route GET /api/dashboard/recent
 * @desc Get recent potholes list for admin dashboard
 * @access Public
 */
export const getRecentController = asyncHandler(async (req, res, next) => {
  const { limit } = req.query;
  const recent = await getRecentPotholes(limit);
  res.status(200).json({
    success: true,
    count: recent.length,
    data: recent
  });
});

/**
 * @route GET /api/dashboard/authorities
 * @desc Get authority performance metrics (total assigned, pending, resolved)
 * @access Public
 */
export const getAuthorityStatsController = asyncHandler(async (req, res, next) => {
  const authStats = await getAuthorityStats();
  res.status(200).json({
    success: true,
    data: authStats
  });
});
