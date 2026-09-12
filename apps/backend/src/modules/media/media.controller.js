import asyncHandler from "../../middleware/asyncHandler.js";
import { validateCoordinates } from "../../utils/locationValidator.js";
import { processImageDetection, processVideoDetection } from "../../services/detection.service.js";
import AppError from "../../utils/AppError.js";

/**
 * @route POST /api/media/upload
 * @desc Upload image/video media with GPS location and process AI detection pipeline
 * @access Public (Will require JWT auth in Step 21)
 */
export const uploadMediaController = asyncHandler(async (req, res, next) => {
  if (!req.file) {
    throw new AppError("No file uploaded. Please attach an image or video file", 400);
  }

  const { latitude, longitude, potholeId } = req.body;

  // Validate GPS coordinates
  const location = validateCoordinates(latitude, longitude);

  const isVideo = req.file.mimetype.startsWith("video/");

  const detectionData = isVideo
    ? await processVideoDetection({
        file: req.file,
        latitude: location.latitude,
        longitude: location.longitude,
        potholeId: potholeId || null
      })
    : await processImageDetection({
        file: req.file,
        latitude: location.latitude,
        longitude: location.longitude,
        potholeId: potholeId || null
      });

  res.status(200).json({
    success: true,
    message: isVideo ? "Video uploaded and processed successfully" : "Image uploaded and processed successfully",
    data: detectionData
  });
});
