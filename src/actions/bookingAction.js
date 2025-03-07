// actions/bookingActions.js
"use server";
import dbConnect from "@/lib/mongodb";
import User from "@/model/User";
import Room from "@/model/Room";
import mongoose from "mongoose";

export async function bookRoom(roomNo, userEmail) {
  try {
    await dbConnect();
    const session = await mongoose.startSession();

    try {
      return await session.withTransaction(async () => {
        const MAX_ROOM_CAPACITY = ["29", "01", "58", "30"].includes(
          roomNo.slice(-2)
        )
          ? 4
          : 3;

        const [user, room] = await Promise.all([
          User.findOne({ email: userEmail }).session(session),
          Room.findOne({ roomNo }).session(session),
        ]);

        if (!user || !room) throw new Error("User or room not found");
        if (user.isAlloted) throw new Error("You already have a booked room");
        if (room.isBooked) throw new Error("This room is fully booked");

        const newAllotment = room.allotedStudents + 1;
        const roomIsFull = newAllotment >= MAX_ROOM_CAPACITY;

        await Promise.all([
          User.updateOne(
            { _id: user._id },
            { $set: { roomAlloted: roomNo, isAlloted: true } },
            { session }
          ),
          Room.updateOne(
            { _id: room._id },
            {
              $inc: { allotedStudents: 1 },
              $set: { isBooked: roomIsFull },
              $push: {
                students: {
                  name: user.name,
                  email: user.email,
                  branch: user.branch,
                  roomAlloted: roomNo,
                },
              },
            },
            { session }
          ),
        ]);

        return { success: true, roomNo };
      });
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Booking failed:", error);
    return {
      success: false,
      error: error.message,
      code: error.code || "TRANSACTION_FAILED",
    };
  }
}

export async function unbookRoom(userEmail) {
  try {
    await dbConnect();
    const session = await mongoose.startSession();

    try {
      return await session.withTransaction(async () => {
        // 1. Get user and their allotted room
        const user = await User.findOne({ email: userEmail }).session(session);
        if (!user) throw new Error("User not found");
        if (!user.isAlloted) throw new Error("No active booking exists");

        // 2. Get associated room
        const room = await Room.findOne({ roomNo: user.roomAlloted }).session(
          session
        );
        if (!room) throw new Error("Associated room not found");

        // 3. Verify user exists in room's students
        const studentIndex = room.students.findIndex(
          (s) => s.email === userEmail
        );
        if (studentIndex === -1)
          throw new Error("Student not found in room records");

        // 4. Calculate new capacity status
        const newAllotment = room.allotedStudents - 1;
        const MAX_CAPACITY = ["29", "01", "58", "30"].includes(
          room.roomNo.slice(-2)
        )
          ? 4
          : 3;
        const roomIsAvailable = newAllotment < MAX_CAPACITY;

        // 5. Perform atomic updates
        await Promise.all([
          User.updateOne(
            { _id: user._id },
            { $set: { roomAlloted: 0, isAlloted: false } },
            { session }
          ),
          Room.updateOne(
            { _id: room._id },
            {
              $inc: { allotedStudents: -1 },
              $set: { isBooked: !roomIsAvailable },
              $pull: { students: { email: userEmail } },
            },
            { session }
          ),
        ]);

        return { success: true, roomNo: user.roomAlloted };
      });
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Unbooking failed:", error);
    return {
      success: false,
      error: error.message,
      code: error.code || "UNBOOK_FAILED",
    };
  }
}