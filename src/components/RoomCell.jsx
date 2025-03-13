"use client";
import React, { useEffect, useState } from "react";
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
import {
  manageRoomStudents,
  readSingleRoom,
  updateRoom,
} from "@/actions/roomAction";
import { toast } from "react-toastify";
import { bookRoom, unbookRoom } from "@/actions/bookingAction";
import { updateSession } from "@/utils/updateSession";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import useModifySearchParam from "@/hooks/useModifySearchParam";

const RoomCell = ({ className, data: initialData, session }) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  let localEmail = session?.user?.email;
  const router = useRouter();
  const modifySearchParams = useModifySearchParam();
  const { update } = useSession();
  const [LocalData, setLocalData] = useState(initialData);
  const [singleAccordianOpen, setSingleAccordianOpen] = useState({idx:undefined, isOpen:false});

  let {
    allotedStudents,
    roomNo,
    floor,
    isBooked,
    possiblyBookedStudents,
    students,
    capacity,
  } = LocalData;

  const handleBook = async () => {
    try {
      setLoading(true);

      if (!session?.user?.email) {
        toast.error("Authentication required");
        setLoading(false);
        return;
      }

      const result = await bookRoom(roomNo, session.user.email);

      if (result.success) {
        await update({
          isAlloted: true,
          roomAlloted: parseInt(roomNo),
        });

        const st = {
          ...session?.user,
          isAlloted: true,
          roomAlloted: parseInt(roomNo),
        };

        setLocalData((prev) => ({
          ...prev,
          allotedStudents: allotedStudents + 1,
          isBooked: allotedStudents + 1 === capacity,
          students: [...prev.students, st],
        }));
        router.refresh();

        setOpen(false);
        toast.success(`Room ${roomNo} booked successfully!`);
      } else {
        toast.error(result.error);
      }
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false);
    }
  };

  const handleUnbook = async () => {
   try {
     setLoading(true);

     if (!session?.user?.email) {
       toast.error("Authentication required");
       setLoading(false);
       return;
     }
     const result = await unbookRoom(session.user.email);

     if (result.success) {
       await update({
         isAlloted: false,
         roomAlloted: 0,
       });

       setLocalData((prev) => ({
         ...prev,
         allotedStudents: allotedStudents - 1,
         isBooked: allotedStudents - 1 === capacity,
         students: prev.students.filter((s) => s.email !== session.user.email),
       }));
       router.refresh();
       
       setOpen(false);
       toast.success(`Room ${roomNo} unbooked successfully!`);

     } else {
       toast.error(result.error);
     }
   } catch (error) {
      console.log(error)
   }finally{
       setLoading(false);

   }
  };

  const handleFindFloor = () => {
    if (floor !== parseInt(session?.user?.roomAlloted / 100)) {
      modifySearchParams(
        "floor",
        parseInt(session?.user?.roomAlloted / 100).toString()
      );
    } else {
      setOpen(false);
    }
  };

  return (
    <TooltipProvider>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) setSingleAccordianOpen({idx: undefined, isOpen: false});
        }}
      >
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <div
                className={`${className} cursor-pointer ${
                  parseInt(roomNo) === session?.user?.roomAlloted ||
                  students.find((e) => e.email === localEmail)
                    ? "bg-secondary hover:bg-secondary"
                    : ""
                }`}
              >
                {roomNo}
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
              {allotedStudents !== 0 &&
                students.map((e, i) => {
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
                    ? "!bg-green-600"
                    : allotedStudents === 4
                    ? "!bg-green-800"
                    : ""
                }`}
              ></div>
              <span>Room: {roomNo}</span>
            </DialogTitle>
            <DialogDescription className="hidden"></DialogDescription>
          </DialogHeader>
          <Separator />
          <div className="">
            <h4 className="mini-font">
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
                isUser={parseInt(roomNo) !== session?.user?.roomAlloted}
                isCapacity={capacity === allotedStudents}
                idx={i}
                setSingleAccordianOpen={(e) => setSingleAccordianOpen(e)}
                singleAccordianOpen={singleAccordianOpen}
                roomNo={roomNo}
                userRoomNo={session?.user?.roomAlloted}
              />
            );
          })}
          <div className="">
            <h4 className="mini-font">Possibly Alloted</h4>
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

          <div className="flex justify-end items-center gap-4">
            {students.find((s) => s.email === session?.user?.email) ? (
              <Button
                disabled={loading}
                onClick={handleUnbook}
                variant="outline"
              >
                <Loader2
                  className={`animate-spin  ${!loading ? "hidden" : ""}`}
                />
                Unbook
              </Button>
            ) : (
              <>
                <div
                  className={`mini-font flex-1 ${
                    !session?.user?.roomAlloted && "hidden"
                  }`}
                >
                  Already Booked Room:{" "}
                  <span
                    onClick={handleFindFloor}
                    className="text-foreground/80 underline underline-offset-4 hover:underline hover:underline-offset-4 hover:text-foreground cursor-pointer"
                  >
                    {session?.user?.roomAlloted}
                  </span>
                </div>
                <Button
                  disabled={
                    allotedStudents ==
                      (roomNo.slice(1) == "29" ||
                      roomNo.slice(1) == "01" ||
                      roomNo.slice(1) == "58" ||
                      roomNo.slice(1) == "30"
                        ? 4
                        : 3) ||
                    session?.user?.isAlloted ||
                    loading
                      ? true
                      : false
                  }
                  onClick={handleBook}
                  variant="outline"
                >
                  <Loader2
                    className={`animate-spin ${!loading ? "hidden" : ""}`}
                  />
                  Book
                </Button>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default RoomCell;
