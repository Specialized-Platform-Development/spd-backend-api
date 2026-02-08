import dotenv from "dotenv";
import app from "./app.js";
import connectDB from "./config/database.js";
import seedDatabase from "./scripts/seed.js";

// Load environment variables
dotenv.config();

// Connect to database
connectDB().then(() => {
  // Seed database if needed (false = don't exit process)
  seedDatabase(false);
});

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || "development"}`);
  console.log(`🌐 API URL: http://localhost:${PORT}`);
  console.log(`✅ Health check: http://localhost:${PORT}/health`);
});

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error(`❌ Unhandled Rejection: ${err.message}`);
  server.close(() => process.exit(1));
});
