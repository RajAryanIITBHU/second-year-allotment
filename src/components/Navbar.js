"use client"
import Link from 'next/link'
import React from 'react'
import { useSession } from "next-auth/react";
const Navbar = () => {
    const { data: session } = useSession();
  return (
   <header className="w-full relative py-3 px-4 md:px-6 md:py-4 flex justify-between border-b ">
    <Link href={"/"}>
        <span className='text-lg font-semibold'>
            
        {process.env.NEXT_PUBLIC_SITE_NAME || "Year Allotment"}
        </span>
    </Link>
    <div className="flex gap-4">
        <span>{session?.user?.name}</span>
    </div>
   </header>
  )
}

export default Navbar
