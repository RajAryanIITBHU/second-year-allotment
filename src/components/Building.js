"use client"
import { useFloorNumberContext } from '@/context/FloorCountContext';
import React from 'react'

const Building = ({floor}) => {

    const {floorNo} = useFloorNumberContext()
  return (
    <div className="flex-1 p-4 relative">
      <div className="w-[65%] flex  max-w-screen-xl mx-auto mt-2 ">
        <div className=" w-[19%] relative aspect-[65/232] flex border-l border-b border-t">
          <div className="w-[42%] h-full flex flex-col justify-end">
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>

            <div className="w-full aspect-[11/7] border-t border-r border-b"></div>
            <div className="w-full aspect-[11/4] "></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-r border-t"></div>
          </div>
          <div className="w-[16%] h-full"></div>
          <div className="w-[42%] h-full flex flex-col justify-end">
            <div className="w-full aspect-[11/2] border-r "></div>
            <div className="w-full aspect-[11/5] border-r"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[1/1] border-t border-l border-r border-b"></div>
            <div className="w-full aspect-[11/4]"></div>
            <div className="w-full aspect-[55/118] border-l border-r border-t"></div>
            <div className=""></div>
          </div>
        </div>

        <div className=" w-[31%] aspect-[105/232] flex flex-col justify-end">
          <div className="w-full aspect-[420/260] border-t border-b flex flex-col">
            <div className="w-full h-[42%] flex">
              <div className="h-full aspect-[7/11] border-b border-r"></div>
              <div className="h-full aspect-[7/11] border-b border-r"></div>
              <div className="h-full aspect-[7/11] border-b border-r"></div>
              <div className="h-full aspect-[7/11] border-b border-r"></div>
              <div className="h-full aspect-[7/11] border-b border-r"></div>
            </div>
            <div className="w-full h-[16%]"></div>
            <div className="w-full h-[42%] flex">
              <div className="h-full aspect-[7/11] border-t border-r"></div>
              <div className="h-full aspect-[7/11] border-t border-r"></div>
              <div className="h-full aspect-[7/11] border-t border-r"></div>
              <div className="h-full aspect-[7/11] border-t border-r"></div>
              <div className="h-full aspect-[7/11] border-t border-r"></div>
            </div>
          </div>
          <div className="w-full aspect-[420/123] "></div>
        </div>

        <div className=" w-[31%] aspect-[105/232] flex flex-col justify-end">
          <div className="w-full aspect-[420/260] border-t border-b flex flex-col">
            <div className="w-full h-[42%] flex justify-end">
              <div className="h-full aspect-[7/11] border-b border-l text-center hover:bg-secondary text-sm font-medium pt-1 flex flex-col relative items-center gap-2">
                {floorNo + "30"}
                <span className="w-[40%] aspect-square bg-muted"></span>
              </div>
              <div className="h-full aspect-[7/11] border-b border-l text-center hover:bg-secondary text-sm font-medium pt-1 flex flex-col relative items-center gap-2">
                {floorNo + "31"}
                <span className="w-[40%] aspect-square bg-muted"></span>
              </div>
              <div className="h-full aspect-[7/11] border-b border-l text-center hover:bg-secondary text-sm font-medium pt-1 flex flex-col relative items-center gap-2">
                {floorNo + "32"}
                <span className="w-[40%] aspect-square bg-muted"></span>
              </div>
              <div className="h-full aspect-[7/11] border-b border-l text-center hover:bg-secondary text-sm font-medium pt-1 flex flex-col relative items-center gap-2">
                {floorNo + "33"}
                <span className="w-[40%] aspect-square bg-muted"></span>
              </div>
              <div className="h-full aspect-[7/11] border-b border-l text-center hover:bg-secondary text-sm font-medium pt-1 flex flex-col relative items-center gap-2">
                {floorNo + "34"}
                <span className="w-[40%] aspect-square bg-muted"></span>
              </div>
            </div>
            <div className="w-full h-[16%]"></div>
            <div className="w-full h-[42%] flex justify-end">
              <div className="h-full aspect-[7/11] border-t border-l text-center text-sm font-medium pt-1">
                {floorNo + "58"}
              </div>
              <div className="h-full aspect-[7/11] border-t border-l text-center text-sm font-medium pt-1">
                {floorNo + "57"}
              </div>
              <div className="h-full aspect-[7/11] border-t border-l text-center text-sm font-medium pt-1">
                {floorNo + "56"}
              </div>
              <div className="h-full aspect-[7/11] border-t border-l text-center text-sm font-medium pt-1">
                {floorNo + "55"}
              </div>
              <div className="h-full aspect-[7/11] border-t border-l text-center text-sm font-medium pt-1">
                {floorNo + "54"}
              </div>
            </div>
          </div>
          <div className="w-full aspect-[420/123]"></div>
        </div>

        <div className=" w-[19%] relative aspect-[65/232] flex border-r border-b border-t">
          <div className="w-[42%] h-full flex flex-col justify-end">
            <div className="w-full aspect-[11/5] border-l"></div>
            <div className="w-full aspect-[11/2] border-l"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-r border-t"></div>
            <div className="w-full aspect-[1/1] border-t border-l border-r border-b"></div>

            <div className="w-full aspect-[11/4]"></div>

            <div className="w-full aspect-[55/118] border-l border-r border-t"></div>
          </div>
          <div className="w-[16%] h-full"></div>

          <div className="w-[42%] h-full flex flex-col justify-end">
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7]  border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-t border-l border-b"></div>
            <div className="w-full aspect-[11/4] "></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
            <div className="w-full aspect-[11/7] border-l border-t"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Building
