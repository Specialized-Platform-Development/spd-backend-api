import User from "../models/User.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

/**
 * @desc    Update user profile
 * @route   PUT /api/users/profile
 * @access  Private
 */
export const updateUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    // Update fields if provided
    if (name) user.name = name;
    if (email) {
      // Check if new email already exists
      const emailExists = await User.findOne({ email });
      if (emailExists && emailExists._id.toString() !== user._id.toString()) {
        return errorResponse(res, 400, "Email already in use");
      }
      user.email = email;
    }
    if (password) user.password = password;

    const updatedUser = await user.save();

    successResponse(res, 200, "User profile updated successfully", {
      user: {
        id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete user account
 * @route   DELETE /api/users/profile
 * @access  Private
 */
export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);

    if (!user) {
      return errorResponse(res, 404, "User not found");
    }

    await user.deleteOne();

    successResponse(res, 200, "User account deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
