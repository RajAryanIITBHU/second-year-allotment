
import { auth } from '@/auth'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth()
  return (
   <header className="w-full relative py-3 px-4 md:px-6 md:py-4 flex justify-between border-b ">
    <Link href={"/"}>
        <span className='text-lg font-semibold'>
            
        {process.env.NEXT_PUBLIC_SITE_NAME || "Year Allotment"}
        </span>
    </Link>
    <div className="flex gap-4">
        <span>{session?.user?.name.split(" ").slice(0,-4).join(" ")}</span>
    </div>
   </header>
  )
}

export default Navbar
