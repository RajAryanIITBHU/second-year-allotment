export default function getSortedRoomsByRange(
  rooms,
  startRoom,
  endRoom,
  { sort = true, reverse = false } = {}
) {
  // Input validation
  if (!Array.isArray(rooms)) throw new Error("rooms must be an array");
  if (typeof startRoom !== "string" || typeof endRoom !== "string") {
    throw new Error("startRoom and endRoom must be strings");
  }

  // Normalize room numbers
  const normalize = (rn) => String(rn).toUpperCase().padStart(4, "0");

  // Get comparable room numbers
  const start = normalize(startRoom);
  const end = normalize(endRoom);

  // Filter rooms in range
  const filtered = rooms.filter((room) => {
    const current = normalize(room.roomNo);
    return current >= start && current <= end;
  });

  // Sorting logic
  if (sort) {
    filtered.sort((a, b) => {
      const compare = normalize(a.roomNo).localeCompare(
        normalize(b.roomNo),
        undefined,
        { numeric: true }
      );
      return reverse ? -compare : compare;
    });
  }

  return filtered;
}
