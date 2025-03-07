"use client"
import { ArrowLeft } from 'lucide-react';
import React from 'react'
import { Button } from './button';
import { useRouter } from 'next/navigation';

const PushBackBtn = () => {
    const router = useRouter()
  return (
    <Button variant="ghost" size="sm" onClick={()=> router.back(  )} className="p-2 border focus:bg-muted">
      <ArrowLeft size={18} />
    </Button>
  );
}

export default PushBackBtn
