"use client"
import React, { useState } from 'react'

const SidebarBtn = ({floor}) => {
    const [ floorNo, setFloorNo] = useState(floor)
  return (
    <li
      value={7}
      onClick={(e) => {
        setFloorNo(e.target.value);
        setFloor(7);
      }}
      className={floorNo === 7 ? "bg-muted" : "text-primary/60"}
    >
      7
    </li>
  );
}

export default SidebarBtn
