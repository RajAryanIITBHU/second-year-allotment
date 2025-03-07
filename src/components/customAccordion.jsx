"use client";
import { ArrowDownUp, ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useSession } from "next-auth/react";

const CustomAccordion = ({
  sNo,
  name,
  branch,
  email,
  isUser,
  isCapacity,
  idx,
  singleAccordianOpen,setSingleAccordianOpen,
}) => {
  const {index,isOpen} = singleAccordianOpen

  return (
    <div className="w-full max-w-md mx-auto border-b pb-2">
      <div className="">
        <button
          className="w-full px-1 pb-1 text-left transition-all flex justify-between items-center outline-none"
          onClick={() => {
            if(isOpen && idx === index){

              setSingleAccordianOpen({ index: undefined, isOpen: false });
            }else{

              setSingleAccordianOpen({ index: idx, isOpen: true });
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
              className={`${!isUser && "hidden"} ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </button>

        {isOpen && isUser && idx === index && (
          <>
            <span className="mini-font mx-3 !opacity-60">Request</span>
            <div className="px-2 pt-2 pb-3  flex gap-4">
              {isCapacity && (
                <Button size="sm" variant="outline">
                  <ArrowUpRight />
                  Room
                </Button>
              )}
              <Button size="sm" variant="outline">
                <ArrowDownUp size={14} />
                Swap
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CustomAccordion;
