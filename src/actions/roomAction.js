// actions/roomActions.js
"use server";

import dbConnect from "@/lib/mongodb";
import Room from "@/model/Room";
import mongoose from "mongoose";


export async function addRoom(roomData) {
  try {
    await dbConnect();

    const existingRoom = await Room.findOne({ roomNo: roomData.roomNo }).lean();
    if (existingRoom) {
      return {
        success: false,
        message: "Room already exists",
        errorCode: "DUPLICATE_ROOM",
      };
    }

    const newRoom = new Room(roomData);
    const savedRoom = await newRoom.save();

    const roomObject = savedRoom.toObject();

    return {
      success: true,
      message: "Room created successfully",
      data: roomObject,
    };
  } catch (error) {
    return {
      success: false,
      message: error.code === 11000 ? "Duplicate room" : "Creation failed",
      error: error.message,
    };
  }
}

export async function updateRoom(roomNo, updateData) {
  try {
    await dbConnect();

    const updatedRoom = await Room.findOneAndUpdate(
      { roomNo: roomNo },
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedRoom) {
      return {
        success: false,
        message: "Room not found",
        errorCode: "ROOM_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: "Room updated successfully",
      data: updatedRoom,
    };
  } catch (error) {
    console.error("Update Room Error:", error);
    return {
      success: false,
      message: "Failed to update room",
      error: error.message,
    };
  }
}

export async function manageRoomStudents(
  roomNo,
  operation,
  studentData,
  arrayField = "students"
) {
  try {
    await dbConnect();

    const validOperations = ["add", "remove"];
    if (!validOperations.includes(operation)) {
      throw new Error("Invalid operation");
    }

    const update =
      operation === "add"
        ? { $push: { [arrayField]: studentData } }
        : { $pull: { [arrayField]: { email: studentData.email } } };

    const updatedRoom = await Room.findOneAndUpdate(
      { roomNo: roomNo },
      update,
      { new: true }
    );

    if (!updatedRoom) {
      return {
        success: false,
        message: "Room not found",
        errorCode: "ROOM_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: `Student ${
        operation === "add" ? "added to" : "removed from"
      } room`,
      data: updatedRoom,
    };
  } catch (error) {
    console.error("Manage Students Error:", error);
    return {
      success: false,
      message: `Failed to ${operation} student`,
      error: error.message,
    };
  }
}

export async function deleteRoom(roomIdentifier) {
  try {
    await dbConnect();

    // Support both ID and roomNo deletion
    const query = mongoose.Types.ObjectId.isValid(roomIdentifier)
      ? { _id: roomIdentifier }
      : { roomNo: roomIdentifier };

    const deletedRoom = await Room.findOneAndDelete(query);

    if (!deletedRoom) {
      return {
        success: false,
        message: "Room not found",
        errorCode: "ROOM_NOT_FOUND",
      };
    }

    // Convert to plain object and transform
    const deletedData = deletedRoom.toObject();
    deletedData.id = deletedData._id.toString();
    delete deletedData._id;
    delete deletedData.__v;

    return {
      success: true,
      message: "Room deleted successfully",
      data: deletedData,
    };
  } catch (error) {
    console.error("Delete Room Error:", error);
    return {
      success: false,
      message: "Failed to delete room",
      error: error.message,
    };
  }
}

export async function readSingleRoom(identifier) {
  try {
    await dbConnect();

    const isObjectId = mongoose.Types.ObjectId.isValid(identifier);
    const query = isObjectId ? { _id: identifier } : { roomNo: identifier };

    const room = await Room.findOne(query).lean();

    if (!room) {
      return {
        success: false,
        message: 'Room not found',
        errorCode: 'ROOM_NOT_FOUND'
      };
    }

    // Convert to client-safe format
    const roomData = {
      ...room,
      id: room._id.toString(),
      _id: undefined,
      __v: undefined
    };

    return {
      success: true,
      data: roomData
    };

  } catch (error) {
    console.error('Read Single Error:', error);
    return {
      success: false,
      message: 'Failed to fetch room',
      error: error.message
    };
  }
}

export async function readMultipleRooms({ floor, startRoom, endRoom }) {
  try {
    await dbConnect();

    const query = {};
    
    // Floor-based filtering
    if (floor !== undefined) {
      query.floor = floor;
    }

    // Room number range filtering
    if (startRoom && endRoom) {
      query.roomNo = {
        $gte: startRoom,
        $lte: endRoom
      };
    }

    const rooms = await Room.find(query)
      .sort({ roomNo: 1 })
      .lean();

    // Serialize data
    const serializedRooms = rooms.map(room => ({
      ...room,
      id: room._id.toString(),
      _id: undefined,
      __v: undefined,
      students: room.students.map(student => ({
        ...student,
        id: student._id?.toString(),
        _id: undefined
      })),
      possiblyBookedStudents: room.possiblyBookedStudents.map(student => ({
        ...student,
        id: student._id?.toString(),
        _id: undefined
      }))
    }));

    return {
      success: true,
      data: serializedRooms
    };

  } catch (error) {
    console.error('Read Multiple Error:', error);
    return {
      success: false,
      message: 'Failed to fetch rooms',
      error: error.message
    };
  }
}

