import mongoose from "mongoose";

/**
 * Connect to MongoDB database
 */
const connectDB = async () => {
  try {
    let mongoUri = process.env.MONGODB_URI;

    if (process.env.NODE_ENV === 'test' || !mongoUri) {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      const mongod = await MongoMemoryServer.create();
      mongoUri = mongod.getUri();
      console.log(`🧠 In-Memory MongoDB started at: ${mongoUri}`);
    }

    const conn = await mongoose.connect(mongoUri);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    console.log(`📦 Database: ${conn.connection.name}`);
  } catch (error) {
    console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
