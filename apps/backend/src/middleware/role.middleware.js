import AppError from "../utils/AppError.js";

/**
 * Higher-order middleware enforcing role-based access control.
 * @param  {...string} allowedRoles - Roles allowed to access the route
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new AppError("Authentication required before role verification", 401));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(
        new AppError(
          `Forbidden: Role '${req.user.role}' is not authorized to perform this action`,
          403
        )
      );
    }

    next();
  };
};
