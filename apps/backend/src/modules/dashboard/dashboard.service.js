import prisma from "../../config/database.js";

/**
 * Returns aggregated overview stats (total count, status breakdown, severity breakdown) using separate Prisma groupBy queries.
 */
export const getOverviewStats = async () => {
  const totalCount = await prisma.pothole.count();

  const statusGroups = await prisma.pothole.groupBy({
    by: ["status"],
    _count: { _all: true }
  });

  const severityGroups = await prisma.pothole.groupBy({
    by: ["severity"],
    _count: { _all: true }
  });

  // Format status map
  const statusMap = {
    REPORTED: 0,
    VERIFIED: 0,
    ASSIGNED: 0,
    IN_PROGRESS: 0,
    RESOLVED: 0,
    REJECTED: 0
  };

  statusGroups.forEach((group) => {
    statusMap[group.status] = group._count._all;
  });

  // Format severity map
  const severityMap = {
    LOW: 0,
    MEDIUM: 0,
    HIGH: 0,
    CRITICAL: 0
  };

  severityGroups.forEach((group) => {
    severityMap[group.severity] = group._count._all;
  });

  return {
    total: totalCount,
    status: statusMap,
    severity: severityMap
  };
};

/**
 * Returns lightweight pothole markers for Leaflet map display.
 */
export const getMapPotholes = async ({ status, severity } = {}) => {
  const where = {};
  if (status) where.status = status;
  if (severity) where.severity = severity;

  return prisma.pothole.findMany({
    where,
    select: {
      id: true,
      latitude: true,
      longitude: true,
      severity: true,
      status: true,
      createdAt: true
    },
    orderBy: { createdAt: "desc" }
  });
};

/**
 * Returns latest reported potholes with media metadata (excluding heavy detections).
 */
export const getRecentPotholes = async (limit = 10) => {
  return prisma.pothole.findMany({
    take: Number(limit) || 10,
    select: {
      id: true,
      latitude: true,
      longitude: true,
      severity: true,
      status: true,
      createdAt: true,
      media: {
        select: {
          id: true,
          url: true,
          type: true,
          fileName: true
        }
      },
      authority: {
        select: {
          id: true,
          name: true,
          code: true
        }
      }
    },
    orderBy: { createdAt: "desc" }
  });
};

/**
 * Returns performance statistics for registered municipal authorities.
 */
export const getAuthorityStats = async () => {
  const authorities = await prisma.authority.findMany({
    include: {
      potholes: {
        select: {
          id: true,
          status: true
        }
      }
    }
  });

  return authorities.map((auth) => {
    const totalAssigned = auth.potholes.length;
    const resolved = auth.potholes.filter((p) => p.status === "RESOLVED").length;
    const pending = auth.potholes.filter((p) => p.status === "ASSIGNED" || p.status === "IN_PROGRESS").length;

    return {
      id: auth.id,
      name: auth.name,
      code: auth.code,
      totalAssigned,
      pending,
      resolved
    };
  });
};
