// actions/roomActions.js
"use server";

import dbConnect from "@/lib/mongodb";
import Room from "@/model/Room";
import mongoose from "mongoose";

function serializeRoom(room) {
  if (!room) return null;

  const serializeStudent = (student) => ({
    ...student,
    id: student._id?.toString() || student.id,
    _id: undefined,
  });

  return {
    ...room,
    id: room._id?.toString() || room.id,
    _id: undefined,
    __v: undefined,
    students: room.students?.map(serializeStudent) || [],
    possiblyBookedStudents:
      room.possiblyBookedStudents?.map(serializeStudent) || [],
  };
}


export async function addRoom(roomData) {
  try {
    await dbConnect();

    const existingRoom = await Room.findOne({ roomNo: roomData.roomNo }).lean();
    if (existingRoom) {
      return {
        success: false,
        message: "Room exists",
        errorCode: "DUPLICATE_ROOM",
      };
    }

    const newRoom = new Room(roomData);
    const savedRoom = await newRoom.save();

    return {
      success: true,
      message: "Room created",
      data: serializeRoom(savedRoom.toObject()),
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
      { roomNo },
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedRoom) {
      return {
        success: false,
        message: "Room not found",
        errorCode: "ROOM_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: "Room updated",
      data: serializeRoom(updatedRoom),
    };
  } catch (error) {
    return {
      success: false,
      message: "Update failed",
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

    const update =
      operation === "add"
        ? { $push: { [arrayField]: studentData } }
        : { $pull: { [arrayField]: { email: studentData.email } } };

    const updatedRoom = await Room.findOneAndUpdate({ roomNo }, update, {
      new: true,
    }).lean();

    if (!updatedRoom) {
      return {
        success: false,
        message: "Room not found",
        errorCode: "ROOM_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: `Student ${operation === "add" ? "added" : "removed"}`,
      data: serializeRoom(updatedRoom),
    };
  } catch (error) {
    return {
      success: false,
      message: "Operation failed",
      error: error.message,
    };
  }
}

export async function deleteRoom(roomIdentifier) {
  try {
    await dbConnect();

    const query = mongoose.Types.ObjectId.isValid(roomIdentifier)
      ? { _id: roomIdentifier }
      : { roomNo: roomIdentifier };

    const deletedRoom = await Room.findOneAndDelete(query).lean();

    if (!deletedRoom) {
      return {
        success: false,
        message: "Room not found",
        errorCode: "ROOM_NOT_FOUND",
      };
    }

    return {
      success: true,
      message: "Room deleted",
      data: serializeRoom(deletedRoom),
    };
  } catch (error) {
    return {
      success: false,
      message: "Deletion failed",
      error: error.message,
    };
  }
}

export async function readSingleRoom(identifier) {
  try {
    await dbConnect();

    const query = mongoose.Types.ObjectId.isValid(identifier)
      ? { _id: identifier }
      : { roomNo: identifier };

    const room = await Room.findOne(query).lean();

    return room
      ? { success: true, data: serializeRoom(room) }
      : {
          success: false,
          message: "Room not found",
          errorCode: "ROOM_NOT_FOUND",
        };
  } catch (error) {
    return {
      success: false,
      message: "Fetch failed",
      error: error.message,
    };
  }
}

export async function readMultipleRooms({ floor, startRoom, endRoom }) {
  try {
    await dbConnect();

    const query = {};
    if (floor !== undefined) query.floor = floor;
    if (startRoom && endRoom) query.roomNo = { $gte: startRoom, $lte: endRoom };

    const rooms = await Room.find(query).sort({ roomNo: 1 }).lean();

    return {
      success: true,
      data: rooms.map((room) => serializeRoom(room)),
    };
  } catch (error) {
    return {
      success: false,
      message: "Fetch failed",
      error: error.message,
    };
  }
}

export async function addCapacityField() {
  await dbConnect();

  const result = await Room.updateMany({ capacity: { $exists: false } }, [
    {
      $set: {
        capacity: {
          $cond: {
            if: { $regexMatch: { input: "$roomNo", regex: /(29|01|58|30)$/ } },
            then: 4,
            else: 3,
          },
        },
      },
    },
  ]);

  console.log(`Updated ${result.modifiedCount} rooms with capacity values`);
  console.log("Rooms ending with 29, 01, 58, or 30 set to capacity 4");
  console.log("All other rooms set to default capacity 3");
  
}