"use client";

import { useRouter, useSearchParams } from "next/navigation";

const useModifySearchParam = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  return (key, value) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value); // Update or add the key-value pair
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };
};

export default useModifySearchParam;
