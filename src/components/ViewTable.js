"use client";
import React from "react";
import { Button } from "./ui/button";
import { toast } from "react-toastify";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { createUser } from "@/actions/createUser";
import { getUserByEmail } from "@/actions/getUserByEmail";
import { addRoom, deleteRoom, updateRoom } from "@/actions/roomAction";

const ViewTable = () => {

  const sub = async (room,floor) => {
    try {
      console.log("executing", room)
      const result = await updateRoom(room,{
        floor,
      });

      if (result.success) {
        console.log(result.data.roomNo, result.data.floor); 
        // toast.success("Room added successfully");
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      toast.error("Failed to add room");
    }
  };


  const ct =async ()=>{
    let a =100;
    let b=1;

    // while(a<=700){
    //   b=1

    //   while(b<=58){
    //     let s = (a+b).toString()
    //     // try {
    //     //   let r = await updateRoom(s, {
    //     //     floor: a/100,
    //     //   });

    //     //   console.log(r.data.floor, r.data.roomNo);
    //     // } catch (error) {
    //     //   console.log("Error");
    //     // }

        
       
    //     b+=1
    //   }

    //   a+=100
    // }


  }

  return (
    <section className="w-full p-4">
    Table
    <Button onClick={ct}>Add Room</Button>
    </section>
  );
};

export default ViewTable;
