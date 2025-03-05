"use server"
import Image from "next/image";
import { signIn, signOut } from "../auth";
import Sidebar from "@/components/Sidebar";
import Building from "@/components/Building";
import ViewTable from "@/components/ViewTable";
import { Button } from "@/components/ui/button";
import { toast } from "react-toastify";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import { cache } from "react";

import User from "@/model/User";
import dbConnect from "@/lib/mongodb";
import { createUser } from "@/actions/createUser";
import { readMultipleRooms } from "@/actions/roomAction";

// const getRooms = cache(async () => {
//   console.log("Fetching rooms from Firestore...");
//   const querySnapshot = await getDocs(collection(db, "rooms"));
//   return querySnapshot.docs.map((doc) => doc.data());
// });

export default async function Home({searchParams}) {
  const { floor } = await searchParams;
  
  
  return (
    <main className="w-full space-y-4">
   <section className="w-[100dvw] flex min-h-[50dvh] max-md:flex-col max-md:px-4">
      
      <Sidebar/>
      <Building floorNo={floor || "1"} /*rooms={filteredRooms}*//>

   </section>
  
   <ViewTable/>
   
    </main>
  );
}
