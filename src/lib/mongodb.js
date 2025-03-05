import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI; // Store in .env

if (!MONGODB_URI) {
  throw new Error("Please define MONGODB_URI in your environment variables");
}

let connection = {
  isConnected: 0,
};

async function dbConnect() {
  if (connection.isConnected) {
    console.log("Already Connected to DB");
    return;
  }

  try {
    const db = await mongoose.connect(MONGODB_URI, {});

    console.log(db);
    connection.isConnected = db.connections[0].readyState;
    console.log("Connected to MongoDB");

    return db

  } catch (err) {
    console.log("Connection failed", err);
    process.exit(1);
  }


}

export default dbConnect;
