import express from "express";
import { register, login, getProfile } from "../controllers/auth.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
  validateRegister,
  validateLogin,
} from "../middlewares/validation.middleware.js";

const router = express.Router();

// Public routes
router.post("/register", validateRegister, register);
router.post("/login", validateLogin, login);

// Protected routes
router.get("/profile", protect, getProfile);

export default router;
