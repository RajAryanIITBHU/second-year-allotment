"use client";
import { ArrowDownUp, ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useSession } from "next-auth/react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";


const CustomAccordion = ({
  sNo,
  name,
  branch,
  email,
  isUser,
  isCapacity,
  idx,
  roomNo,
  userRoomNo,
  singleAccordianOpen,setSingleAccordianOpen,
}) => {
  const {index,isOpen} = singleAccordianOpen


  const handleRequestRoom = ()=>{

  }

  const handleSwapRoom = ()=>{
    
  }

  return (
    <div className="w-full max-w-md mx-auto border-b pb-2">
      <div className="">
        <button
          className="w-full px-1 pb-1 text-left transition-all flex justify-between items-center outline-none"
          onClick={() => {
            if (isCapacity || userRoomNo !== 0) {
              if (isOpen && idx === index) {
                setSingleAccordianOpen({ index: undefined, isOpen: false });
              } else {
                setSingleAccordianOpen({ index: idx, isOpen: true });
              }
            }
          }}
        >
          <div className="flex gap-2 items-center text-sm">
            <span>{sNo}.</span>
            <span className="">{name}</span>
          </div>
          <div className="flex gap-4">
            <Badge variant="outline" className={"opacity-70"}>
              {branch}
            </Badge>
            <ChevronDown
              size={16}
              className={`${
                isCapacity || userRoomNo !== 0 ? !isUser ? "hidden" : "" : "hidden"
              } ${isOpen ? "rotate-180" : "rotate-0"}`}
            />
          </div>
        </button>

        {isOpen && isUser && idx === index && (
          <>
            <span className="mini-font mx-3 !opacity-60">Request</span>
            <div className="px-2 pt-2 pb-3  flex gap-4">
              {isCapacity && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      <ArrowUpRight />
                      Room
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[400px]">
                    <AlertDialogHeader className="pb-4">
                      <AlertDialogTitle className="flex items-center gap-1">
                        <ArrowUpRight size={24} />
                        Request Room {roomNo}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to request this room from{" "}
                        {`${name} (${branch.slice(0, 3).toUpperCase()}).`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter className="">
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleRequestRoom}>
                        Request
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
              {userRoomNo !== 0 && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button size="sm" variant="outline" className>
                      <ArrowDownUp size={14} />
                      Swap
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent className="max-w-[400px]">
                    <AlertDialogHeader className="pb-4">
                      <AlertDialogTitle className="flex items-center gap-1">
                        <ArrowDownUp size={20} />
                        Request to Swap Room {roomNo} from {userRoomNo}
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure you want to swap your Room {userRoomNo}{" "}
                        with Room {roomNo} currently occupied by
                        {` ${name} (${branch.slice(0, 3).toUpperCase()}).`}
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction onClick={handleSwapRoom}>
                        Swap
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomAccordion;
