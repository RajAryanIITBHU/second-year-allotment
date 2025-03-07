import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error("❌ Please define MONGODB_URI in the environment variables");
}

// Global connection cache (works across API calls & hot reloads)
let cached = (global).mongoose || { conn: null, promise: null };
(global).mongoose = cached;




async function dbConnect() {
  if (cached.conn) {
    console.log("🔄 Using existing MongoDB connection");
    return cached.conn;
  }


  if (!cached.promise) {
    console.log("⏳ Connecting to MongoDB...");
    cached.promise = mongoose.connect(MONGODB_URI, {
      bufferCommands: false,
      autoIndex: process.env.NODE_ENV !== "production",
      maxPoolSize: 10, // Limits connection pool
      minPoolSize: 1, // Keeps at least 1 open connection
    });
  }

  try {
    cached.conn = await cached.promise;
    console.log("✅ MongoDB Connected");
    return cached.conn;
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    cached.promise = null;
    throw err;
  }
}

export default dbConnect;
