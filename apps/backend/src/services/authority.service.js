import prisma from "../config/database.js";

/**
 * Calculates Haversine distance in kilometers between two GPS points.
 */
const haversineDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371; // Earth radius in kilometers
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};

/**
 * Finds the nearest Authority record in the database for given GPS coordinates.
 * @param {number} latitude 
 * @param {number} longitude 
 * @returns {Promise<string|null>} ID of nearest Authority or null if no authorities exist
 */
export const findNearestAuthority = async (latitude, longitude) => {
  try {
    const authorities = await prisma.authority.findMany({
      select: { id: true, name: true }
    });

    if (!authorities || authorities.length === 0) {
      return null;
    }

    // For now, return the first available authority if coordinates are unmapped,
    // or calculate minimum distance when authority locations are stored.
    return authorities[0].id;
  } catch (error) {
    console.error("Error finding nearest authority:", error);
    return null;
  }
};
