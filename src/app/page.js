import Image from "next/image";
import { signIn, signOut } from "../auth";

export default function Home() {
  return (
   <div className="">
    <button onClick={async ()=>{
        "use server";
        await signOut()
    }}>Signout</button>
   </div>
  );
}
