import asyncHandler from "../../middleware/asyncHandler.js";
import { validateCoordinates } from "../../utils/locationValidator.js";
import { processMediaUpload } from "./media.service.js";
import AppError from "../../utils/AppError.js";

/**
 * @route POST /api/media/upload
 * @desc Upload image/video media with GPS location
 * @access Public (Will require JWT auth in Step 21)
 */
export const uploadMediaController = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    throw new AppError("No file uploaded. Please attach an image or video file", 400);
  }

  const { latitude, longitude, potholeId } = req.body;

  // Validate GPS coordinates
  const location = validateCoordinates(latitude, longitude);

  // Process media upload
  const mediaData = await processMediaUpload({
    file: req.file,
    latitude: location.latitude,
    longitude: location.longitude,
    potholeId: potholeId || null
  });

  res.status(200).json({
    success: true,
    message: "Media uploaded successfully",
    data: mediaData
  });
});
