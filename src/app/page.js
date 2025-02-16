import Image from "next/image";
import { signIn, signOut } from "../auth";
import Sidebar from "@/components/Sidebar";
import Building from "@/components/Building";
import ViewTable from "@/components/ViewTable";

export default function Home() {
  return (
    <main className="w-full space-y-4">
   <section className="w-[100dvw] flex min-h-[50dvh]">
      
      <Sidebar/>
      <Building/>

   </section>
   <ViewTable/>
    </main>
  );
}
