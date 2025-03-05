
import { auth } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import NavMenu from './NavMenu'

const Navbar = async () => {
    const session = await auth()
  return (
    <header className="w-full relative py-3 px-4 md:px-6 md:py-4 flex justify-between border-b items-center ">
      <Link href={"/"}>
        <span className="text-lg font-semibold">
          {process.env.NEXT_PUBLIC_SITE_NAME || "Year Allotment"}
        </span>
      </Link>
      <NavMenu session={session}/>  
    </header>
  );
}

export default Navbar
