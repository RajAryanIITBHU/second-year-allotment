"use client";
import { ArrowDownUp, ArrowUpRight, ChevronDown } from "lucide-react";
import { useState } from "react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { useSession } from "next-auth/react";

const CustomAccordion = ({sNo, name, branch, email,isUser}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-md mx-auto border-b">
      <div className="">
        <button
          className="w-full px-1 pb-3 text-left transition-all flex justify-between items-center outline-none"
          onClick={() => setIsOpen(!isOpen)}
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
              className={`${isUser && "hidden"} ${
                isOpen ? "rotate-180" : "rotate-0"
              }`}
            />
          </div>
        </button>

        {isOpen && isUser && (
          <div className="px-2 pt-1 pb-3  flex gap-4">
            <Button size="sm" variant="outline">
              <ArrowUpRight />
              Request Room
            </Button>
            <Button size="sm" variant="outline">
              <ArrowDownUp size={14} />
              Request Swap
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomAccordion;
