
import React from "react";
import { readMultipleRooms } from "@/actions/roomAction";
import getSortedRoomsByRange from "@/utils/getSortedRoomsByRange";
import RoomCell from "./RoomCell";

const Building = async ({ floorNo }) => {
  const floorRooms = await readMultipleRooms({ floor: parseInt(floorNo) || 1 });

   function roomRange(start, end, r=true) {
    let a = getSortedRoomsByRange(
      floorRooms?.data,
      floorNo + start,
      floorNo + end,
      { sort: true, reverse: r }
    );
    a = JSON.parse(JSON.stringify(a))
    return a
  }


  return (
    <div className="flex-1 p-4 relative max-w-[100dvw] overflow-x-auto">
      <div className="absolute min-w-32 min-h-40 border rounded bg-background z-20 hidden"></div>
      <div className=" flex max-w-[860px] min-w-[700px] md:mx-auto mt-2  max-h-screen">
        <div className=" w-[19%] relative aspect-[65/232] flex border-l border-b border-t">
          <div className="w-[42%] h-full flex flex-col justify-end">
            {roomRange("11", "17").map((room) => {
              return (
                <RoomCell
                  key={room.roomNo}
                  className={"w-full aspect-[11/7] border-r border-t cell-l"}
                  data={room}
                />
              );
            })}

            <RoomCell
              key={floorNo + "10"}
              className={
                "w-full aspect-[11/7] border-t border-r border-b cell-l"
              }
              data={floorRooms?.data[9]}
            />
            <div className="w-full aspect-[11/4] "></div>
            {roomRange("06", "09").map((room) => {
              return (
                <RoomCell
                  key={room.roomNo}
                  className={"w-full aspect-[11/7] border-r border-t cell-l"}
                  data={room}
                />
              );
            })}
          </div>
          <div className="w-[16%] h-full"></div>
          <div className="w-[42%] h-full flex flex-col justify-end">
            <div className="w-full aspect-[11/2] border-r "></div>
            <div className="w-full aspect-[11/5] border-r"></div>

            {roomRange("18", "24", false).map((room) => {
              return (
                <RoomCell
                  key={room.roomNo}
                  className={
                    "w-full aspect-[11/7] border-l border-r border-t cell-l"
                  }
                  data={room}
                />
              );
            })}

            <div className="w-full aspect-[1/1] border-t border-l border-r border-b"></div>
            <div className="w-full aspect-[11/4]"></div>
            <div className="w-full aspect-[55/118] border-l border-r border-t"></div>
            <div className=""></div>
          </div>
        </div>

        <div className=" w-[31%] aspect-[105/232] flex flex-col justify-end">
          <div className="w-full aspect-[420/260] border-t border-b flex flex-col">
            <div className="w-full h-[42%] flex">
              {roomRange("25", "29", false).map((room) => {
                return (
                  <RoomCell
                    key={room.roomNo}
                    className={"h-full aspect-[7/11] border-b border-r cell"}
                    data={room}
                  />
                );
              })}
            </div>
            <div className="w-full h-[16%]"></div>
            <div className="w-full h-[42%] flex">
              {roomRange("01", "05").map((room) => {
                return (
                  <RoomCell
                    key={room.roomNo}
                    className={"h-full aspect-[7/11] border-t border-r cell"}
                    data={room}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full aspect-[420/123] "></div>
        </div>

        <div className=" w-[31%] aspect-[105/232] flex flex-col justify-end">
          <div className="w-full aspect-[420/260] border-t border-b flex flex-col">
            <div className="w-full h-[42%] flex justify-end">
              {roomRange("30", "34", false).map((room) => {
                return (
                  <RoomCell
                    key={room.roomNo}
                    className={"h-full aspect-[7/11] border-b border-l cell"}
                    data={room}
                  />
                );
              })}
            </div>
            <div className="w-full h-[16%]"></div>
            <div className="w-full h-[42%] flex justify-end">
              {roomRange("54", "58").map((room) => {
                return (
                  <RoomCell
                    key={room.roomNo}
                    className={"h-full aspect-[7/11] border-t border-l cell"}
                    data={room}
                  />
                );
              })}
            </div>
          </div>
          <div className="w-full aspect-[420/123]"></div>
        </div>

        <div className=" w-[19%] relative aspect-[65/232] flex border-r border-b border-t">
          <div className="w-[42%] h-full flex flex-col justify-end">
            <div className="w-full aspect-[11/5] border-l"></div>
            <div className="w-full aspect-[11/2] border-l"></div>
            {roomRange("35", "41").map((room) => {
              return (
                <RoomCell
                  key={room.roomNo}
                  className={
                    "w-full aspect-[11/7] border-l border-r border-t cell-r"
                  }
                  data={room}
                />
              );
            })}

            <div className="w-full aspect-[1/1] border-t border-l border-r border-b"></div>

            <div className="w-full aspect-[11/4]"></div>

            <div className="w-full aspect-[55/118] border-l border-r border-t"></div>
          </div>
          <div className="w-[16%] h-full"></div>

          <div className="w-[42%] h-full flex flex-col justify-end">
            {roomRange("42", "49",false).map((room) => {
              return (
                <RoomCell
                  key={room.roomNo}
                  className={"w-full aspect-[11/7] border-l border-t cell-r"}
                  data={room}
                />
              );
            })}

            <RoomCell
              key={floorNo + "50"}
              className={
                "w-full aspect-[11/7] border-t border-l border-b cell-r"
              }
              data={floorRooms?.data[49]}
            />
           
            <div className="w-full aspect-[11/4] "></div>

            {roomRange("51", "53", false).map((room) => {
              return (
                <RoomCell
                  key={room.roomNo}
                  className={"w-full aspect-[11/7] border-l border-t cell-r"}
                  data={room}
                />
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Building;
