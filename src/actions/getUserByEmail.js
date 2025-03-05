"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/model/User";


export async function getUserByEmail(email) {
  try {
    await dbConnect();
    const user = await User.findOne({ email: email });

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return { success: true, data: user };
  } catch (error) {
    return {
      success: false,
      error: error.message.includes("CastError")
        ? "Invalid email format"
        : error.message,
    };
  }
}
