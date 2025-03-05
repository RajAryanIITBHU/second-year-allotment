"use server";
import dbConnect from "@/lib/mongodb";
import User from "@/model/User";

export async function createUser(userData) {
  try {
    await dbConnect();
    const newUser = new User(userData);
    await newUser.save();
    return { success: true, data: newUser };
  } catch (error) {
    return { success: false, error: error.message };
  }
}
