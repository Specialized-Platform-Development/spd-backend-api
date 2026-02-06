import express from "express";
import { updateUser, deleteUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { validateUserUpdate } from "../middlewares/validation.middleware.js";

const router = express.Router();

// All routes are protected
router.put("/profile", protect, validateUserUpdate, updateUser);
router.delete("/profile", protect, deleteUser);

export default router;
