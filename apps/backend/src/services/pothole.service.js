import prisma from "../config/database.js";
import { calculateSeverity } from "./severity.service.js";
import { findNearestAuthority } from "./authority.service.js";
import { parsePotholeQueryParams } from "../modules/potholes/pothole.query.js";

/**
 * Creates persistent domain records for a detected pothole using an atomic Prisma transaction.
 */
export const createPotholeRecord = async ({ latitude, longitude, mediaId, aiResult, userId = null }) => {
  const detections = aiResult.detections || [];

  // 1. Calculate severity and max confidence
  const { severity, maxConfidence } = calculateSeverity(detections);

  // 2. Find nearest authority
  const authorityId = await findNearestAuthority(latitude, longitude);

  // 3. Execute atomic Prisma Transaction (configured with 15s timeout for remote DBs)
  const potholeId = await prisma.$transaction(
    async (tx) => {
      // A. Create Pothole
      const pothole = await tx.pothole.create({
        data: {
          latitude,
          longitude,
          severity,
          status: "REPORTED",
          confidence: maxConfidence,
          authorityId: authorityId || undefined
        }
      });

      // B. Create Detection records for each detected bounding box
      if (detections.length > 0) {
        await tx.detection.createMany({
          data: detections.map((det) => ({
            potholeId: pothole.id,
            confidence: det.confidence,
            className: "pothole",
            boundingBox: det.bbox || null,
            modelVersion: "yolov8"
          }))
        });
      }

      // C. Update existing Media record to link potholeId
      if (mediaId) {
        await tx.media.update({
          where: { id: mediaId },
          data: { potholeId: pothole.id }
        });
      }

      // D. Create Report record if reporter userId is present
      if (userId) {
        await tx.report.create({
          data: {
            userId,
            potholeId: pothole.id,
            description: "System AI auto-generated pothole detection report"
          }
        });
      }

      return pothole.id;
    },
    {
      maxWait: 10000,
      timeout: 15000
    }
  );

  // 4. Return populated record outside transaction block
  return prisma.pothole.findUnique({
    where: { id: potholeId },
    include: {
      media: true,
      detections: true,
      authority: true
    }
  });
};

/**
 * Returns a paginated, filtered, and sorted list of potholes.
 * @param {Object} queryParams - Express req.query object
 * @returns {Promise<Object>} Data list + pagination metadata
 */
export const listPotholes = async (queryParams) => {
  const { page, limit, skip, where, orderBy } = parsePotholeQueryParams(queryParams);

  const [items, total] = await Promise.all([
    prisma.pothole.findMany({
      where,
      skip,
      take: limit,
      orderBy,
      include: {
        media: {
          select: {
            id: true,
            url: true,
            type: true
          }
        },
        authority: {
          select: {
            id: true,
            name: true,
            code: true
          }
        }
      }
    }),
    prisma.pothole.count({ where })
  ]);

  const totalPages = Math.ceil(total / limit) || 1;

  return {
    data: items,
    pagination: {
      page,
      limit,
      total,
      totalPages,
      hasNextPage: page < totalPages,
      hasPreviousPage: page > 1
    }
  };
};
