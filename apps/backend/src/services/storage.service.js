import imagekit from "../config/imagekit.js";
import AppError from "../utils/AppError.js";

/**
 * Uploads a file buffer to ImageKit.
 * @param {Object} params
 * @param {Buffer} params.fileBuffer - Buffer of the file to upload
 * @param {string} params.fileName - Name of the file
 * @param {string} [params.folder="/potholes"] - ImageKit folder destination
 * @returns {Promise<Object>} Upload metadata (url, fileId, name, size, filePath)
 */
export const uploadToImageKit = async ({ fileBuffer, fileName, folder = "/potholes" }) => {
  try {
    const response = await imagekit.upload({
      file: fileBuffer,
      fileName: fileName,
      folder: folder
    });

    return {
      url: response.url,
      fileId: response.fileId,
      name: response.name,
      size: response.size,
      filePath: response.filePath
    };
  } catch (error) {
    throw new AppError(`ImageKit upload failed: ${error.message}`, 500);
  }
};

/**
 * Deletes a file from ImageKit by fileId.
 * @param {string} fileId - ImageKit file ID
 * @returns {Promise<boolean>} Success boolean
 */
export const deleteFromImageKit = async (fileId) => {
  try {
    await imagekit.deleteFile(fileId);
    return true;
  } catch (error) {
    throw new AppError(`ImageKit deletion failed: ${error.message}`, 500);
  }
};
