"use client"
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { toast } from 'react-toastify';

const ErrorHandler = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const error = searchParams.get("error");

  useEffect(() => {
    if (error === "AccessDenied") {
      toast.error("Access Denied! Please use an Institute email.");
      router.replace("/", undefined, { shallow: true }); // Remove error from URL
    }
  }, [error, router]);

  return null;
};

export default ErrorHandler
