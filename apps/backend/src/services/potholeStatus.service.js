import prisma from "../config/database.js";
import AppError from "../utils/AppError.js";

const ALLOWED_TRANSITIONS = {
  REPORTED: ["VERIFIED", "REJECTED"],
  VERIFIED: ["ASSIGNED", "REJECTED"],
  ASSIGNED: ["IN_PROGRESS"],
  IN_PROGRESS: ["RESOLVED"],
  RESOLVED: [],
  REJECTED: []
};

/**
 * Updates a pothole's status and records an append-only audit trail inside a Prisma transaction.
 * @param {Object} params
 * @param {string} params.potholeId - Target pothole ID
 * @param {string} params.newStatus - Requested new PotholeStatus
 * @param {string} [params.changedById] - Optional ID of user/admin changing status
 * @param {string} [params.reason] - Optional reason/note
 * @param {string} [params.authorityId] - Required if status becomes ASSIGNED
 */
export const updatePotholeStatus = async ({ potholeId, newStatus, changedById = null, reason = null, authorityId = null }) => {
  // 1. Fetch current pothole
  const pothole = await prisma.pothole.findUnique({
    where: { id: potholeId }
  });

  if (!pothole) {
    throw new AppError(`Pothole not found with ID: ${potholeId}`, 404);
  }

  const currentStatus = pothole.status;

  // 2. Validate status transition
  const allowedNextStatuses = ALLOWED_TRANSITIONS[currentStatus] || [];
  if (!allowedNextStatuses.includes(newStatus)) {
    throw new AppError(
      `Invalid status transition from ${currentStatus} to ${newStatus}. Allowed transitions: ${
        allowedNextStatuses.length > 0 ? allowedNextStatuses.join(", ") : "None (Terminal State)"
      }`,
      400
    );
  }

  // 3. If transitioning to ASSIGNED, require and validate authorityId
  let assignedAuthorityId = pothole.authorityId;
  if (newStatus === "ASSIGNED") {
    const targetAuthId = authorityId || pothole.authorityId;
    if (!targetAuthId) {
      throw new AppError("An authorityId is required when transitioning status to ASSIGNED", 400);
    }
    const authorityExists = await prisma.authority.findUnique({
      where: { id: targetAuthId }
    });
    if (!authorityExists) {
      throw new AppError(`Authority not found with ID: ${targetAuthId}`, 404);
    }
    assignedAuthorityId = targetAuthId;
  }

  // 4. Execute atomic Prisma Transaction
  const updatedPothole = await prisma.$transaction(
    async (tx) => {
      // Update Pothole.status and authorityId
      await tx.pothole.update({
        where: { id: potholeId },
        data: {
          status: newStatus,
          authorityId: assignedAuthorityId || undefined
        }
      });

      // Create PotholeStatusHistory append-only audit record
      await tx.potholeStatusHistory.create({
        data: {
          potholeId,
          oldStatus: currentStatus,
          newStatus,
          changedById: changedById || undefined,
          reason: reason || undefined
        }
      });

      return tx.pothole.findUnique({
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
    },
    {
      maxWait: 10000,
      timeout: 15000
    }
  );

  return updatedPothole;
};
