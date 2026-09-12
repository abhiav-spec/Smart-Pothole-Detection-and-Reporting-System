import AppError from "../utils/AppError.js";

/**
 * Generic Zod validation middleware.
 * @param {Object} schemas - Object containing optional body, query, and params Zod schemas
 */
export const validateRequest = (schemas) => {
  return async (req, res, next) => {
    try {
      if (schemas.body) {
        req.body = await schemas.body.parseAsync(req.body);
      }
      if (schemas.query) {
        req.query = await schemas.query.parseAsync(req.query);
      }
      if (schemas.params) {
        req.params = await schemas.params.parseAsync(req.params);
      }
      next();
    } catch (err) {
      if (err.name === "ZodError" || err.issues) {
        const issues = err.issues || err.errors || [];
        const formattedErrors = issues.map((issue) => ({
          field: issue.path.join("."),
          message: issue.message
        }));
        return next(
          new AppError(`Validation Error: ${formattedErrors.map((e) => e.message).join("; ")}`, 400)
        );
      }
      next(err);
    }
  };
};
