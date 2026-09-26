import axios from "axios";
import FormData from "form-data";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";

/**
 * Helper to get axios client using current env AI_SERVICE_URL
 */
const getAiClient = () => {
  return axios.create({
    baseURL: process.env.AI_SERVICE_URL || env.AI_SERVICE_URL
  });
};

/**
 * Checks the health status of the FastAPI AI Service.
 * @returns {Promise<Object>} Health response { status: "ok" }
 */
export const checkAiHealth = async () => {
  try {
    const aiClient = getAiClient();
    const response = await aiClient.get("/health", { timeout: 5000 });
    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      throw new AppError("AI Service health check timed out", 504);
    }
    if (error.code === "ECONNREFUSED" || !error.response) {
      throw new AppError("AI Service is unavailable", 503);
    }
    throw new AppError(`AI Service health error: ${error.message}`, error.response?.status || 500);
  }
};

/**
 * Sends an image file buffer to the FastAPI AI Service for YOLOv8 pothole detection.
 * @param {Buffer} fileBuffer - Image file buffer
 * @param {string} fileName - File name
 * @param {string} [mimeType="image/jpeg"] - Image MIME type
 * @returns {Promise<Object>} Detection payload { detected: boolean, count: number, detections: Array }
 */
export const detectImageInAi = async (fileBuffer, fileName, mimeType = "image/jpeg") => {
  try {
    const aiClient = getAiClient();
    const form = new FormData();
    form.append("image", fileBuffer, {
      filename: fileName,
      contentType: mimeType
    });

    const response = await aiClient.post("/detect/image", form, {
      headers: form.getHeaders(),
      timeout: env.AI_IMAGE_TIMEOUT_MS
    });

    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      throw new AppError("AI Service image detection timed out", 504);
    }
    if (error.code === "ECONNREFUSED" || !error.response) {
      throw new AppError("AI Service is unavailable", 503);
    }
    if (error.response?.status >= 400 && error.response?.status < 500) {
      const detailRaw = error.response.data?.detail;
      const detail = typeof detailRaw === "string" ? detailRaw : JSON.stringify(detailRaw);
      throw new AppError(`AI Service client error: ${detail}`, 400);
    }
    throw new AppError(`AI Service image detection failed: ${error.message}`, 500);
  }
};

/**
 * Sends a video file buffer to the FastAPI AI Service for YOLOv8 frame-by-frame pothole detection.
 * @param {Buffer} fileBuffer - Video file buffer
 * @param {string} fileName - File name
 * @param {string} [mimeType="video/mp4"] - Video MIME type
 * @returns {Promise<Object>} Aggregated video detection payload
 */
export const detectVideoInAi = async (fileBuffer, fileName, mimeType = "video/mp4") => {
  try {
    const aiClient = getAiClient();
    const form = new FormData();
    form.append("video", fileBuffer, {
      filename: fileName,
      contentType: mimeType
    });

    const response = await aiClient.post("/detect/video", form, {
      headers: form.getHeaders(),
      timeout: 120000
    });

    return response.data;
  } catch (error) {
    if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") {
      throw new AppError("AI Service video detection timed out", 504);
    }
    if (error.code === "ECONNREFUSED" || !error.response) {
      throw new AppError("AI Service is unavailable", 503);
    }
    if (error.response?.status >= 400 && error.response?.status < 500) {
      const detailRaw = error.response.data?.detail;
      const detail = typeof detailRaw === "string" ? detailRaw : JSON.stringify(detailRaw);
      throw new AppError(`AI Service client error: ${detail}`, 400);
    }
    throw new AppError(`AI Service video detection failed: ${error.message}`, 500);
  }
};
