"use client";

import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

const ResultPage = () => {
  const searchParams = useSearchParams();
  return (
    <div className="h-screen flex flex-col gap-2 items-center justify-center">
      {searchParams.get("receipt") && (
        <a
          href={`${searchParams.get("receipt")}`}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:underline flex text-black font-bold text-[10px] sm:text-base lg:text-xl"
        >
          Receipt
        </a>
      )}
      <div>
        <Button
          onClick={() => {
            window.location.replace("/");
          }}
        >
          Go home
        </Button>
      </div>
    </div>
  );
};

const ResultPageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ResultPage />
    </Suspense>
  );
};

export default ResultPageWithSuspense;
