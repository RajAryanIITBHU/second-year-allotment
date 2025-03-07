"use server"
import Image from "next/image";
import { signIn, signOut } from "../auth";
import Sidebar from "@/components/Sidebar";
import Building from "@/components/Building";
import ViewTable from "@/components/ViewTable";


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
        <Sidebar floorNum={floor || "1"} />
        <Building floorNo={floor || "1"} /*rooms={filteredRooms}*/ />
      </section>

      <ViewTable />
    </main>
  );
}
