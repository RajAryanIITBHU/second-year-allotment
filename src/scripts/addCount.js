// scripts/migrateRooms.js
import dbConnect from "@/lib/mongodb";
import Room from "@/model/Room";

async function addCapacityField() {
  await dbConnect();

  const result = await Room.updateMany(
    { capacity: { $exists: false } },
    { $set: { capacity: 3 } }
  );

  console.log(`Updated ${result.modifiedCount} rooms`);
  process.exit(0);
}

addCapacityField();
