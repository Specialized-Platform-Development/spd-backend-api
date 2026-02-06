import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import {
  validateProduct,
  validateProductUpdate,
} from "../middlewares/validation.middleware.js";

const router = express.Router();

// Public routes
router.get("/", getAllProducts);
router.get("/:id", getProductById);

// Protected routes
router.post("/", protect, validateProduct, createProduct);
router.put("/:id", protect, validateProductUpdate, updateProduct);
router.delete("/:id", protect, deleteProduct);

export default router;
