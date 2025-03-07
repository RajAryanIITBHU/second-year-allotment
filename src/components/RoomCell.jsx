"use client";
import React, { useEffect } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "./ui/separator";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Button } from "./ui/button";
import CustomAccordion from "./customAccordion";
import { useSession } from "next-auth/react";
import { getUserByEmail, updateUser } from "@/actions/userAction";
import { manageRoomStudents, updateRoom } from "@/actions/roomAction";
import { toast } from "react-toastify";
import { bookRoom } from "@/actions/bookingAction";
import { updateSession } from "@/utils/updateSession";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const RoomCell = ({ className, data }) => {
  const {
    allotedStudents,
    roomNo,
    floor,
    isBooked,
    possiblyBookedStudents,
    students,
  } = data;

  const { data: session, update } = useSession();

  const handleBook = async () => {
    if (!session?.user?.email) {
      toast.error("Authentication required");
      return;
    }

    const result = await bookRoom(roomNo, session.user.email);

    if (result.success) {
      await update({
        isAlloted: true,
        roomAlloted: parseInt(roomNo),
      });

      toast.success("Room booked successfully!");
    } else {
      toast.error(result.error);
    }
  };

  const handleUnbook = () => {};

  return (
    <TooltipProvider>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <div className={`${className} cursor-pointer`}>
                {data.roomNo}
                <span
                  className={
                    allotedStudents === 1
                      ? "!bg-yellow-500"
                      : allotedStudents == 2
                      ? "!bg-blue-700"
                      : allotedStudents === 3
                      ? "!bg-green-700"
                      : ""
                  }
                ></span>
              </div>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent className="bg-muted border rounded text-muted-foreground">
            <span className="tracking-wide font-medium">
              Students{" "}
              {"(" +
                allotedStudents +
                (roomNo.slice(1) == "29" ||
                roomNo.slice(1) == "01" ||
                roomNo.slice(1) == "58" ||
                roomNo.slice(1) == "30"
                  ? "/4"
                  : "/3") +
                ")"}
            </span>
            <ul className="list-disc pl-4 py-1">
              {students.map((e, i) => {
                return (
                  <li key={e.name}>
                    {e.name.split(" ").slice(0, -4).join(" ")}
                  </li>
                );
              })}
              {Array.from({
                length:
                  (roomNo.slice(1) == "29" ||
                  roomNo.slice(1) == "01" ||
                  roomNo.slice(1) == "58" ||
                  roomNo.slice(1) == "30"
                    ? 4
                    : 3) - allotedStudents,
              }).map((_, i) => {
                return (
                  <li className="opacity-50" key={i}>
                    Not Alloted
                  </li>
                );
              })}
            </ul>
          </TooltipContent>
        </Tooltip>

        <DialogContent className="w-[300px] sm:w-[360px]">
          <DialogHeader>
            <DialogTitle className="flex gap-4 text-base items-center">
              <div
                className={`w-4 h-4 rounded bg-muted ${
                  allotedStudents === 1
                    ? "!bg-yellow-500"
                    : allotedStudents == 2
                    ? "!bg-blue-700"
                    : allotedStudents === 3
                    ? "!bg-green-700"
                    : ""
                }`}
              ></div>
              <span>Room: {roomNo}</span>
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="">
            <h4 className="text-xs tracking-wide font-medium opacity-75 text-muted-foreground">
              Currently booked
              {"(" +
                allotedStudents +
                (roomNo.slice(1) == "29" ||
                roomNo.slice(1) == "01" ||
                roomNo.slice(1) == "58" ||
                roomNo.slice(1) == "30"
                  ? "/4"
                  : "/3") +
                ")"}
            </h4>
          </div>
          <Separator />

          {students.map((stud, i) => {
            return (
              <CustomAccordion
                key={i}
                name={stud.name.split(" ").slice(0, -4).join(" ")}
                branch={stud.branch}
                email={stud.email}
                sNo={i + 1}
              />
            );
          })}
          <div className="">
            <h4 className="text-xs tracking-wide font-medium opacity-75 text-muted-foreground">
              Possibly Alloted
            </h4>
          </div>
          <Separator />

          {possiblyBookedStudents.map((stud, i) => {
            return (
              <div key={i}>
                <div className="flex gap-2 items-center text-sm">
                  <span>{i + 1}.</span>
                  <span className="">{stud.name}</span>
                </div>
                <div className="flex gap-4">
                  <Badge variant="outline" className={"opacity-70"}>
                    {stud.branch}
                  </Badge>
                </div>
              </div>
            );
          })}

          <div className="flex justify-end">
            {students.find((s) => s.email === session?.user?.email) ? (
              <Button
                disabled={
                  allotedStudents ==
                  (roomNo.slice(1) == "29" ||
                  roomNo.slice(1) == "01" ||
                  roomNo.slice(1) == "58" ||
                  roomNo.slice(1) == "30"
                    ? 4
                    : 3)
                    ? true
                    : false
                }
                onClick={handleUnbook}
                variant="outline"
              >
                Unbook
              </Button>
            ) : (
              <Button
                disabled={
                  allotedStudents ==
                    (roomNo.slice(1) == "29" ||
                    roomNo.slice(1) == "01" ||
                    roomNo.slice(1) == "58" ||
                    roomNo.slice(1) == "30"
                      ? 4
                      : 3) || session?.user?.isAlloted
                    ? true
                    : false
                }
                onClick={handleBook}
                variant="outline"
              >
                Book
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default RoomCell;
