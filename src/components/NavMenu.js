"use client";
import Image from "next/image";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";




const NavMenu = ({ session }) => {
  return (
    <div className="flex gap-4 items-center">
      <div className="flex flex-col">
        <span>{session?.user?.name.split(" ").slice(0, -4).join(" ")}</span>
        <span className="text-xs font-medium text-muted-foreground">
          {
            session?.user?.name.split(" ")[
              session?.user?.name.split(" ").length - 2
            ]
          }
        </span>
      </div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className=" w-6 md:w-8 h-6 md:h-8 relative rounded-full overflow-hidden">
            <Image
              src={
                session?.user?.image ||
                `https://ui-avatars.com/api/?name=${session?.user?.name
                  .split(" ")
                  .slice(0, -4)
                  .join("+")}`
              }
              alt="profile_pic"
              fill
            />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="absolute -right-3 top-[105%] ">
          <DropdownMenuItem >
            <button onClick={async () => await signOut()}>Logout</button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavMenu;
