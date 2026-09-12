import { uploadToImageKit, deleteFromImageKit } from "./storage.service.js";
import { createInitialMediaRecord } from "./media.service.js";
import { detectImageInAi, detectVideoInAi } from "./ai.service.js";
import { createPotholeRecord } from "./pothole.service.js";
import prisma from "../config/database.js";
import AppError from "../utils/AppError.js";

/**
 * Orchestrates image detection pipeline, severity calculation, authority mapping, and pothole record creation.
 */
export const processImageDetection = async ({ file, latitude, longitude, userId = null }) => {
  if (!file) {
    throw new AppError("No image file provided", 400);
  }

  let uploadedFile = null;
  let initialMedia = null;

  try {
    // 1. Upload image to ImageKit
    uploadedFile = await uploadToImageKit({
      fileBuffer: file.buffer,
      fileName: file.originalname,
      folder: "/potholes/images"
    });

    // 2. Create initial Media metadata record in PostgreSQL (unlinked initially)
    initialMedia = await createInitialMediaRecord({
      url: uploadedFile.url,
      fileId: uploadedFile.fileId,
      type: "IMAGE",
      fileName: uploadedFile.name,
      mimeType: file.mimetype,
      size: uploadedFile.size
    });

    // 3. Pass image to AI service for YOLOv8 inference
    const aiResult = await detectImageInAi(file.buffer, file.originalname, file.mimetype);

    let potholeRecord = null;

    // 4. If potholes detected, calculate severity, map authority, and create Pothole + Detections in transaction
    if (aiResult.detected && aiResult.count > 0) {
      potholeRecord = await createPotholeRecord({
        latitude,
        longitude,
        mediaId: initialMedia.id,
        aiResult,
        userId
      });
    }

    return {
      media: {
        id: initialMedia.id,
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
      pothole: potholeRecord,
      detection: {
        detected: aiResult.detected,
        count: aiResult.count,
        detections: aiResult.detections || []
      }
    };
  } catch (error) {
    // Compensating Cleanup: delete DB record and ImageKit file on failure
    if (initialMedia?.id) {
      try {
        await prisma.media.delete({ where: { id: initialMedia.id } });
      } catch (dbErr) {
        console.error("Compensating DB cleanup failed:", dbErr.message);
      }
    }
    if (uploadedFile?.fileId) {
      try {
        await deleteFromImageKit(uploadedFile.fileId);
      } catch (cleanupErr) {
        console.error("Compensating ImageKit cleanup failed:", cleanupErr.message);
      }
    }
    throw error;
  }
};

/**
 * Orchestrates video detection pipeline, severity calculation, authority mapping, and pothole record creation.
 */
export const processVideoDetection = async ({ file, latitude, longitude, userId = null }) => {
  if (!file) {
    throw new AppError("No video file provided", 400);
  }

  let uploadedFile = null;
  let initialMedia = null;

  try {
    // 1. Upload video to ImageKit
    uploadedFile = await uploadToImageKit({
      fileBuffer: file.buffer,
      fileName: file.originalname,
      folder: "/potholes/videos"
    });

    // 2. Create initial Media metadata record in PostgreSQL
    initialMedia = await createInitialMediaRecord({
      url: uploadedFile.url,
      fileId: uploadedFile.fileId,
      type: "VIDEO",
      fileName: uploadedFile.name,
      mimeType: file.mimetype,
      size: uploadedFile.size
    });

    // 3. Pass video to AI service for frame-by-frame processing
    const aiResult = await detectVideoInAi(file.buffer, file.originalname, file.mimetype);

    let potholeRecord = null;

    // 4. If potholes detected in video, create Pothole record
    if (aiResult.detected && aiResult.count > 0) {
      potholeRecord = await createPotholeRecord({
        latitude,
        longitude,
        mediaId: initialMedia.id,
        aiResult,
        userId
      });
    }

    return {
      media: {
        id: initialMedia.id,
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
      pothole: potholeRecord,
      detection: aiResult
    };
  } catch (error) {
    // Compensating Cleanup
    if (initialMedia?.id) {
      try {
        await prisma.media.delete({ where: { id: initialMedia.id } });
      } catch (dbErr) {
        console.error("Compensating DB cleanup failed:", dbErr.message);
      }
    }
    if (uploadedFile?.fileId) {
      try {
        await deleteFromImageKit(uploadedFile.fileId);
      } catch (cleanupErr) {
        console.error("Compensating ImageKit cleanup failed:", cleanupErr.message);
      }
    }
    throw error;
  }
};
