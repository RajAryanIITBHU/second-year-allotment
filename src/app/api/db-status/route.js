import { Response } from "next/server";
import dbConnect from "@/lib/mongodb";
import mongoose from "mongoose";

export async function GET(request) {
  try {
    await dbConnect(); // Ensure MongoDB connection

    const result = await mongoose.connection.db.admin().serverStatus();
    const connections = result.connections;

    return new Response(
      JSON.stringify({
        current: connections.current, // Active connections
        available: connections.available, // Remaining available
        totalCreated: connections.totalCreated, // Total connections made
      }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error fetching MongoDB connection status:", error);
    return new Response(
      JSON.stringify({ message: "Error fetching DB status" }),
      {
        status: 500,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
  }
}
