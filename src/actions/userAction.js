"use server";

import dbConnect from "@/lib/mongodb";
import User from "@/model/User";
import mongoose from "mongoose";

function serializeUser(user) {
  if (!user) return null;
  const obj = user.toObject ? user.toObject() : user;
  return {
    ...obj,
    id: obj._id,
    _id: undefined,
    __v: undefined,
  };
}

export async function createUser(userData) {
  try {
    await dbConnect();
    const newUser = new User(userData);
    const savedUser = await newUser.save();

    return {
      success: true,
      data: serializeUser(savedUser),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message,
    };
  }
}

export async function getUserByEmail(email) {
  try {
    await dbConnect();
    const user = await User.findOne({ email }).lean();

    if (!user) {
      return { success: false, error: "User not found" };
    }

    return {
      success: true,
      data: serializeUser(user),
    };
  } catch (error) {
    return {
      success: false,
      error: error.message.includes("CastError")
        ? "Invalid email format"
        : error.message,
    };
  }
}

export async function updateUser(userIdentifier, updateData) {
  try {
    await dbConnect();

    // Validate update data
    const allowedFields = [
      "name",
      "email",
      "image",
      "isAlloted",
      "branch",
      "roomAlloted",
    ];
    const invalidFields = Object.keys(updateData).filter(
      (field) => !allowedFields.includes(field)
    );

    if (invalidFields.length > 0) {
      return {
        success: false,
        message: `Invalid fields: ${invalidFields.join(", ")}`,
        errorCode: "INVALID_FIELDS",
      };
    }

    // Check for email uniqueness if updating email
    if (updateData.email) {
      const existingUser = await User.findOne({ email: updateData.email });
      if (existingUser && existingUser._id !== userIdentifier) {
        return {
          success: false,
          message: "Email already exists",
          errorCode: "DUPLICATE_EMAIL",
        };
      }
    }

    // Find and update user by ID or email
    const isObjectId = mongoose.Types.ObjectId.isValid(userIdentifier);
    const query = isObjectId
      ? { _id: userIdentifier }
      : { email: userIdentifier };

     const updatedUser = await User.findOneAndUpdate(
      query, 
      updateData, 
      { new: true, runValidators: true }
    ).lean();

    if (!updatedUser) {
      return {
        success: false,
        message: "User not found",
        errorCode: "USER_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: "User updated successfully",
      data: serializeUser(updatedUser),
    };
  } catch (error) {
    console.error("Update User Error:", error);
    return {
      success: false,
      message: error.code === 11000 ? "Duplicate email error" : "Update failed",
      error: error.message,
    };
  }
}