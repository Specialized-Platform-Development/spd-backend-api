import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { errorResponse } from "../utils/responseHandler.js";

/**
 * Protect routes - Verify JWT token
 */
export const protect = async (req, res, next) => {
  try {
    let token;

    // Check if token exists in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // Check if token exists
    if (!token) {
      return errorResponse(res, 401, "Not authorized, no token provided");
    }

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Get user from token (exclude password)
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        return errorResponse(res, 401, "User not found");
      }

      next();
    } catch (error) {
      return errorResponse(
        res,
        401,
        "Not authorized, token invalid or expired",
      );
    }
  } catch (error) {
    next(error);
  }
};

/**
 * Role-based access control
 * @param  {...String} roles - Allowed roles
 */
export const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return errorResponse(
        res,
        403,
        "You do not have permission to perform this action",
      );
    }
    next();
  };
};
