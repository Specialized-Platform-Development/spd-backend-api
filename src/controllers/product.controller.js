import Product from "../models/Product.js";
import { successResponse, errorResponse } from "../utils/responseHandler.js";

/**
 * @desc    Create new product
 * @route   POST /api/products
 * @access  Private
 */
export const createProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    const product = await Product.create({
      name,
      description,
      price,
      stock,
      imageUrl,
    });

    successResponse(res, 201, "Product created successfully", { product });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get all products
 * @route   GET /api/products
 * @access  Public
 */
export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });

    successResponse(res, 200, "Products retrieved successfully", {
      count: products.length,
      products,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Get single product by ID
 * @route   GET /api/products/:id
 * @access  Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    successResponse(res, 200, "Product retrieved successfully", { product });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Update product
 * @route   PUT /api/products/:id
 * @access  Private
 */
export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, price, stock, imageUrl } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    // Update fields if provided
    if (name !== undefined) product.name = name;
    if (description !== undefined) product.description = description;
    if (price !== undefined) product.price = price;
    if (stock !== undefined) product.stock = stock;
    if (imageUrl !== undefined) product.imageUrl = imageUrl;

    const updatedProduct = await product.save();

    successResponse(res, 200, "Product updated successfully", {
      product: updatedProduct,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc    Delete product
 * @route   DELETE /api/products/:id
 * @access  Private
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return errorResponse(res, 404, "Product not found");
    }

    await product.deleteOne();

    successResponse(res, 200, "Product deleted successfully", null);
  } catch (error) {
    next(error);
  }
};
