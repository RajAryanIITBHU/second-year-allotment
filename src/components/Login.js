import { signIn } from '@/auth';
import React from 'react'
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import { FaGoogle } from "react-icons/fa6";

const Login = () => {
  return (
    <div className="w-full relative h-[100dvh] flex justify-center items-center">
      <div className="w-full max-w-sm h-fit shadow border rounded p-4 flex flex-col -mt-8 gap-4">
        <span className="text-center text-xl font-semibold">Login</span>
        <Separator  className="mb-4"/>
        <Button onClick={async ()=>{
            "use server"
            await signIn("google", {redirectTo: "/"});
            
        }} variant="ghost" className="w-full py-2 rounded border flex gap-2 items-center">
          <FaGoogle />
          <span className='font-medium'>Sign In with Google</span>
        </Button>
        <Separator className="mt-4"/>
      </div>
    </div>
  );
}

export default Login
