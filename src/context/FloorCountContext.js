"use client"
import { createContext, useContext, useState } from "react";

const FloorNumberContext = createContext();

export const FloorNumberProvider = ({ children }) => {
  const [floorNo, setFloorNo] = useState(1);

  return (
    <FloorNumberContext.Provider value={{ floorNo, setFloorNo }}>
      {children}
    </FloorNumberContext.Provider>
  );
};

export const useFloorNumberContext = () => {
  return useContext(FloorNumberContext);
};
