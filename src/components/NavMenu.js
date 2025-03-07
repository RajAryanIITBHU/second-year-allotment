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
import { Button } from "./ui/button";
import { Bell, LogOut } from "lucide-react";
import { Separator } from "./ui/separator";
import Link from "next/link";

const NavMenu = ({ session }) => {
  return (
    <div className="flex gap-3 sm:gap-4 items-center">
      <div className="sm:flex flex-col hidden ">
        <span>{session?.user?.name.split(" ").slice(0, -4).join(" ")}</span>
        <span className="text-xs font-medium text-muted-foreground">
          {
            session?.user?.name.split(" ")[
              session?.user?.name.split(" ").length - 2
            ]
          }
        </span>
      </div>
      <Link href={"/notifications"} className="p-1.5 sm:p-2 border rounded hover:bg-muted/70 focus:bg-muted">
        <Bell size={18}/>
      </Link>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className=" w-7 md:w-8 h-7 md:h-8 relative rounded overflow-hidden">
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
        <DropdownMenuContent className="absolute -right-3 top-[105%] w-[180px]">
          <DropdownMenuItem className="cursor-not-allowed sm:hidden">
            <div className="flex flex-col items-start gap-0.5">
              <span>
                {session?.user?.name.split(" ").slice(0, -4).join(" ")}
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                {
                  session?.user?.name.split(" ")[
                    session?.user?.name.split(" ").length - 2
                  ]
                }
              </span>
            </div>
          </DropdownMenuItem>
          <Separator className="my-2 sm:hidden" />
          <DropdownMenuItem>
            <button
              className="w-full text-left flex gap-2 items-center py-0.5"
              onClick={async () => await signOut()}
            >
              <LogOut size={16} /> <span>Logout</span>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default NavMenu;
