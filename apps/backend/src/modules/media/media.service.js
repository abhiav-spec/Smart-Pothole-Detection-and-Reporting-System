import { uploadToImageKit } from "../../services/storage.service.js";
import prisma from "../../config/database.js";
import AppError from "../../utils/AppError.js";

/**
 * Processes media upload to ImageKit and optional metadata storage.
 * @param {Object} params
 * @param {Express.Multer.File} params.file
 * @param {number} params.latitude
 * @param {number} params.longitude
 * @param {string} [params.potholeId] Optional associated pothole ID
 */
export const processMediaUpload = async ({ file, latitude, longitude, potholeId = null }) => {
  if (!file) {
    throw new AppError("No media file provided for upload", 400);
  }

  const mediaType = file.mimetype.startsWith("image/") ? "IMAGE" : "VIDEO";
  const folder = mediaType === "IMAGE" ? "/potholes/images" : "/potholes/videos";

  // Upload to ImageKit
  const uploadResult = await uploadToImageKit({
    fileBuffer: file.buffer,
    fileName: file.originalname,
    folder
  });

  let mediaRecord = null;

  // If potholeId is provided, persist Media record in Prisma database
  if (potholeId) {
    mediaRecord = await prisma.media.create({
      data: {
        potholeId,
        url: uploadResult.url,
        fileId: uploadResult.fileId,
        type: mediaType,
        fileName: uploadResult.name,
        mimeType: file.mimetype,
        size: uploadResult.size
      }
    });
  }

  return {
    mediaId: mediaRecord ? mediaRecord.id : null,
    fileId: uploadResult.fileId,
    url: uploadResult.url,
    type: mediaType,
    fileName: uploadResult.name,
    mimeType: file.mimetype,
    size: uploadResult.size,
    location: {
      latitude,
      longitude
    }
  };
};
