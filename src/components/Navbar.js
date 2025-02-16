
import { auth } from '@/auth'
import Image from 'next/image'
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
    <div className="flex gap-4 items-center">
        <span>{session?.user?.name.split(" ").slice(0,-4).join(" ")}</span>
        <div className="w-6 md:w-8 h-6 md:h-8 relative rounded-full overflow-hidden">
            <Image src={session?.user?.image || `https://ui-avatars.com/api/?name=${session?.user?.name.split(" ").slice(0,-4).join("+")}`} alt='profile_pic' fill/>
        </div>
    </div>
   </header>
  )
}

export default Navbar
