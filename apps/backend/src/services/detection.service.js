import { uploadToImageKit, deleteFromImageKit } from "./storage.service.js";
import { detectImageInAi, detectVideoInAi } from "./ai.service.js";
import prisma from "../config/database.js";
import AppError from "../utils/AppError.js";

/**
 * Orchestrates image detection pipeline with compensating ImageKit cleanup.
 * @param {Object} params
 * @param {Express.Multer.File} params.file
 * @param {number} params.latitude
 * @param {number} params.longitude
 * @param {string} [params.potholeId] Optional associated pothole ID
 */
export const processImageDetection = async ({ file, latitude, longitude, potholeId = null }) => {
  if (!file) {
    throw new AppError("No image file provided", 400);
  }

  let uploadedFile = null;

  try {
    // 1. Upload image to ImageKit
    uploadedFile = await uploadToImageKit({
      fileBuffer: file.buffer,
      fileName: file.originalname,
      folder: "/potholes/images"
    });

    // 2. Pass image to AI service for YOLOv8 inference
    const aiResult = await detectImageInAi(file.buffer, file.originalname, file.mimetype);

    let mediaRecord = null;

    // 3. Save Media metadata in PostgreSQL if potholeId is present
    if (potholeId) {
      mediaRecord = await prisma.media.create({
        data: {
          potholeId,
          url: uploadedFile.url,
          fileId: uploadedFile.fileId,
          type: "IMAGE",
          fileName: uploadedFile.name,
          mimeType: file.mimetype,
          size: uploadedFile.size
        }
      });
    }

    return {
      media: {
        id: mediaRecord ? mediaRecord.id : null,
        fileId: uploadedFile.fileId,
        url: uploadedFile.url,
        type: "IMAGE",
        fileName: uploadedFile.name,
        mimeType: file.mimetype,
        size: uploadedFile.size
      },
      location: {
        latitude,
        longitude
      },
      detection: {
        detected: aiResult.detected,
        count: aiResult.count,
        detections: aiResult.detections || []
      }
    };
  } catch (error) {
    // Compensating Cleanup: delete ImageKit file if AI detection or DB save fails
    if (uploadedFile?.fileId) {
      try {
        await deleteFromImageKit(uploadedFile.fileId);
      } catch (cleanupErr) {
        console.error(`Compensating cleanup failed for ImageKit file ${uploadedFile.fileId}:`, cleanupErr);
      }
    }
    throw error;
  }
};

/**
 * Orchestrates video detection pipeline with compensating ImageKit cleanup.
 * @param {Object} params
 * @param {Express.Multer.File} params.file
 * @param {number} params.latitude
 * @param {number} params.longitude
 * @param {string} [params.potholeId] Optional associated pothole ID
 */
export const processVideoDetection = async ({ file, latitude, longitude, potholeId = null }) => {
  if (!file) {
    throw new AppError("No video file provided", 400);
  }

  let uploadedFile = null;

  try {
    // 1. Upload video to ImageKit
    uploadedFile = await uploadToImageKit({
      fileBuffer: file.buffer,
      fileName: file.originalname,
      folder: "/potholes/videos"
    });

    // 2. Pass video to AI service for frame-by-frame processing
    const aiResult = await detectVideoInAi(file.buffer, file.originalname, file.mimetype);

    let mediaRecord = null;

    // 3. Save Media metadata in PostgreSQL if potholeId is present
    if (potholeId) {
      mediaRecord = await prisma.media.create({
        data: {
          potholeId,
          url: uploadedFile.url,
          fileId: uploadedFile.fileId,
          type: "VIDEO",
          fileName: uploadedFile.name,
          mimeType: file.mimetype,
          size: uploadedFile.size
        }
      });
    }

    return {
      media: {
        id: mediaRecord ? mediaRecord.id : null,
        fileId: uploadedFile.fileId,
        url: uploadedFile.url,
        type: "VIDEO",
        fileName: uploadedFile.name,
        mimeType: file.mimetype,
        size: uploadedFile.size
      },
      location: {
        latitude,
        longitude
      },
      detection: aiResult
    };
  } catch (error) {
    // Compensating Cleanup: delete ImageKit file if AI detection or DB save fails
    if (uploadedFile?.fileId) {
      try {
        await deleteFromImageKit(uploadedFile.fileId);
      } catch (cleanupErr) {
        console.error(`Compensating cleanup failed for ImageKit file ${uploadedFile.fileId}:`, cleanupErr);
      }
    }
    throw error;
  }
};
