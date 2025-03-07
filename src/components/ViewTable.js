"use client";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { addCapacityField, updateRoom } from "@/actions/roomAction";
import { getUserByEmail } from "@/actions/userAction";
import { createUser } from "@/actions/userAction";
import { useSession } from "next-auth/react";
import { updateSession } from "@/utils/updateSession";
import { fetchRoomData } from "@/utils/fetchRoomData";
import useSWR from "swr";


const ViewTable = () => {
  const { data: session, update } = useSession();

  const sub = async (room, floor) => {
    try {
      console.log("executing", room);
      const result = await updateRoom(room, {
        floor,
      });

      if (result.success) {
        console.log(result.data.roomNo, result.data.floor);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to add room");
    }
  };

  const reloadSession = () => {
    const event = new Event("visibilitychange");
    document.dispatchEvent(event);
  };

  

  

  const ct = async () => {
    let a = 100;
    let b = 1;

    // while(a<=700){
    //   b=1

    //   while(b<=58){
    //     let s = (a+b).toString()
    //     try {
    //       let r = await updateRoom(s, {
    //         capacity: b === 1 || b === 29 || b === 30 || b === 58 ? 4: 3,
    //       });

    //       console.log(r.data.capacity, r.data.roomNo);
    //     } catch (error) {
    //       console.log("Error");
    //     }

    //     b+=1
    //   }

    //   a+=100
    // }
    try {
      toast.success("Initiated");
      
      console.log(roomData)

    } catch (error) {
      toast.error("Err");
      console.log(error);
    }
  };

  return (
    <section className="w-full p-4">
      Table
      <Button onClick={ct}>Add Room</Button>
    </section>
  );
};

export default ViewTable;
