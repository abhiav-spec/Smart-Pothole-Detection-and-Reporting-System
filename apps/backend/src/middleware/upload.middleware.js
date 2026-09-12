import multer from "multer";
import { env } from "../config/env.js";
import AppError from "../utils/AppError.js";

const storage = multer.memoryStorage();

const allowedMimeTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "video/mp4",
  "video/webm"
];

const fileFilter = (req, file, cb) => {
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new AppError(`Unsupported file type: ${file.mimetype}. Allowed types: JPG, PNG, WEBP, MP4, WEBM`, 400), false);
  }
};

const upload = multer({
  storage,
  limits: {
    fileSize: env.MAX_FILE_SIZE_MB * 1024 * 1024
  },
  fileFilter
});

export const handleMulterUpload = (fieldName) => {
  const multerSingle = upload.single(fieldName);

  return (req, res, next) => {
    multerSingle(req, res, (err) => {
      if (err instanceof multer.MulterError) {
        if (err.code === "LIMIT_FILE_SIZE") {
          return next(new AppError(`File size exceeds maximum limit of ${env.MAX_FILE_SIZE_MB}MB`, 400));
        }
        return next(new AppError(`File upload error: ${err.message}`, 400));
      } else if (err) {
        return next(err);
      }
      next();
    });
  };
};

export default upload;
