import AppError from "./AppError.js";

/**
 * Validates geographical latitude and longitude values.
 * @param {number|string} latitude 
 * @param {number|string} longitude 
 * @returns {{ latitude: number, longitude: number }} Parsed coordinate numbers
 */
export const validateCoordinates = (latitude, longitude) => {
  if (latitude === undefined || latitude === null || latitude === "" ||
      longitude === undefined || longitude === null || longitude === "") {
    throw new AppError("Latitude and longitude coordinates are required", 400);
  }

  const latNum = Number(latitude);
  const lngNum = Number(longitude);

  if (Number.isNaN(latNum) || Number.isNaN(lngNum)) {
    throw new AppError("Latitude and longitude must be valid numbers", 400);
  }

  if (latNum < -90 || latNum > 90) {
    throw new AppError("Latitude must be between -90 and +90 degrees", 400);
  }

  if (lngNum < -180 || lngNum > 180) {
    throw new AppError("Longitude must be between -180 and +180 degrees", 400);
  }

  return { latitude: latNum, longitude: lngNum };
};
