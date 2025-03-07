export  const fetchRoomData = async (roomNo) => {
  try {
    const response = await fetch(`/api/rooms/${roomNo}`);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to fetch room data");
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching room data:", error);
    throw error;
  }
};