"use client"
import { useFloorNumberContext } from '@/context/FloorCountContext';
import React from 'react'

const Sidebar = () => {
    const { setFloorNo } = useFloorNumberContext()
    

  return (
    <aside className="w-44 flex flex-col py-4 max-lg:hidden mt-12">
        <h3 className='px-4 mb-6'>Floors</h3>
        <ul className='space-y-2'>
            <li value={7} onClick={(e)=>{
                setFloorNo(e.target.value);
                
            }} className='w-fill text-right pr-8 rounded-r-full border py-3'>7</li>
            <li value={6} onClick={(e)=>{
                setFloorNo(e.target.value);
                
            }} className='w-fill text-right pr-8 rounded-r-full border py-3'>6</li>
            <li value={5} onClick={(e)=>{
                setFloorNo(e.target.value);
                
            }} className='w-fill text-right pr-8 rounded-r-full border py-3'>5</li>
            <li value={4} onClick={(e)=>{
                setFloorNo(e.target.value);
                
            }} className='w-fill text-right pr-8 rounded-r-full border py-3'>4</li>
            <li value={3} onClick={(e)=>{
                setFloorNo(e.target.value);
                
            }} className='w-fill text-right pr-8 rounded-r-full border py-3'>3</li>
            <li value={2} onClick={(e)=>{
                setFloorNo(e.target.value);
                
            }} className='w-fill text-right pr-8 rounded-r-full border py-3'>2</li>
            <li value={1} onClick={(e)=>{
                setFloorNo(e.target.value);
                
            }} className='w-fill text-right pr-8 rounded-r-full border py-3'>1</li>
        </ul>
    </aside>
  );
}

export default Sidebar
