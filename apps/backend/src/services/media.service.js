import prisma from "../config/database.js";

/**
 * Creates initial Media metadata record in PostgreSQL (potholeId can be null initially).
 */
export const createInitialMediaRecord = async ({ url, fileId, type, fileName, mimeType, size, potholeId = null }) => {
  return prisma.media.create({
    data: {
      url,
      fileId,
      type,
      fileName,
      mimeType,
      size,
      potholeId
    }
  });
};
