"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const floor = searchParams.get("floor") || "1";
    const [floorNo, setFloorNo] = useState(parseInt(floor));

    const setFloor = (floor) => {
      router.push(`?floor=${floor}`, { scroll: false }); 
    };
  
  return (
    <aside className="w-44 flex md:flex-col py-4 md:mt-12 max-md:w-full max-md:items-center">
      <h3 className="px-2 md:px-4 md:mb-6 max-md:pr-4">Floors</h3>
      <ul id="SIDEBAR_UL" className="flex-1">
        <li
          value={7}
          onClick={(e) => {
            setFloorNo(e.target.value);
            setFloor(7)
          }}
          className={floorNo === 7 ? "bg-muted" : "text-primary/60"}
        >
          7
        </li>
        <li
          value={6}
          onClick={(e) => {
            setFloorNo(e.target.value);
            setFloor(6)
          }}
          className={floorNo === 6 ? "bg-muted" : "text-primary/60"}
        >
          6
        </li>
        <li
          value={5}
          onClick={(e) => {
            setFloorNo(e.target.value);
            setFloor(5)
          }}
          className={floorNo === 5 ? "bg-muted" : "text-primary/60"}
        >
          5
        </li>
        <li
          value={4}
          onClick={(e) => {
            setFloorNo(e.target.value);
            setFloor(4)
          }}
          className={floorNo === 4 ? "bg-muted" : "text-primary/60"}
        >
          4
        </li>
        <li
          value={3}
          onClick={(e) => {
            setFloorNo(e.target.value);
            setFloor(3)
          }}
          className={floorNo === 3 ? "bg-muted" : "text-primary/60"}
        >
          3
        </li>
        <li
          value={2}
          onClick={(e) => {
            setFloorNo(e.target.value);
            setFloor(2)
          }}
          className={floorNo === 2 ? "bg-muted" : "text-primary/60"}
        >
          2
        </li>
        <li
          value={1}
          onClick={(e) => {
            setFloorNo(e.target.value);
            setFloor(1)
          }}
          className={floorNo === 1 ? "bg-muted" : "text-primary/60"}
        >
          1
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
