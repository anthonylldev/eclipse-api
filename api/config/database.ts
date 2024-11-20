import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config()

const uri = `mongodb+srv://${process.env.DATABASE_USER}:${process.env.DATABASE_PASSWORD}@eclipse-cluster.fys1e.mongodb.net/${process.env.DATABASE_NAME}?retryWrites=true&w=majority&appName=eclipse-cluster`;

const clientOptions = {
  serverApi: {
    version: "1" as const,
    strict: true,
    deprecationErrors: true
  }
};

const connectDB = async () => {
  try {
    await mongoose.connect(uri, clientOptions);
    console.log("Connected to MongoDB successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", (err as Error).message);
    process.exit(1);
  }
};

export default connectDB;
