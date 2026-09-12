import asyncHandler from "../../middleware/asyncHandler.js";
import prisma from "../../config/database.js";
import { updatePotholeStatus } from "../../services/potholeStatus.service.js";
import { listPotholes } from "../../services/pothole.service.js";
import AppError from "../../utils/AppError.js";

/**
 * @route GET /api/potholes
 * @desc Get paginated, filtered, and sorted list of potholes
 * @access Public
 */
export const listPotholesController = asyncHandler(async (req, res, next) => {
  const result = await listPotholes(req.query);
  res.status(200).json({
    success: true,
    data: result.data,
    pagination: result.pagination
  });
});

/**
 * @route PATCH /api/potholes/:potholeId/status
 * @desc Update pothole status with validation and audit history creation
 * @access Public (Will require Admin/Authority role in Step 21)
 */
export const updatePotholeStatusController = asyncHandler(async (req, res, next) => {
  const { potholeId } = req.params;
  const { status, reason, authorityId, changedById } = req.body;

  if (!status) {
    throw new AppError("New status field is required", 400);
  }

  const updatedPothole = await updatePotholeStatus({
    potholeId,
    newStatus: status,
    changedById: changedById || null,
    reason: reason || null,
    authorityId: authorityId || null
  });

  res.status(200).json({
    success: true,
    message: `Pothole status updated to ${status} successfully`,
    data: updatedPothole
  });
});

/**
 * @route GET /api/potholes/:potholeId
 * @desc Get complete pothole details including media, detections, status history, and authority
 * @access Public
 */
export const getPotholeByIdController = asyncHandler(async (req, res, next) => {
  const { potholeId } = req.params;

  const pothole = await prisma.pothole.findUnique({
    where: { id: potholeId },
    include: {
      media: true,
      detections: true,
      statusHistory: {
        orderBy: { createdAt: "desc" }
      },
      authority: true
    }
  });

  if (!pothole) {
    throw new AppError(`Pothole not found with ID: ${potholeId}`, 404);
  }

  res.status(200).json({
    success: true,
    data: pothole
  });
});
