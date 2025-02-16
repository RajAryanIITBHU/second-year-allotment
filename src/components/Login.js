import { signIn } from '@/auth';
import React from 'react'

const Login = () => {
  return (
    <div className="w-full relative h-[100dvh] flex justify-center items-center">
        <div className="w-full max-w-md h-[300px] shadow border rounded p-4 flex flex-col -mt-8 ">
            <span className='text-center text-xl font-semibold'>Login</span>

        </div>
    </div>
  );
}

export default Login
