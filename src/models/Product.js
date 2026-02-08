import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [2, "Product name must be at least 2 characters"],
    maxlength: [200, "Product name cannot exceed 200 characters"],
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
    maxlength: [2000, "Description cannot exceed 2000 characters"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  stock: {
    type: Number,
    required: [true, "Product stock is required"],
    min: [0, "Stock cannot be negative"],
    default: 0,
  },
  imageUrl: {
    type: String,
    default: "https://via.placeholder.com/400x300?text=No+Image",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Product = mongoose.model("Product", productSchema);

export default Product;
