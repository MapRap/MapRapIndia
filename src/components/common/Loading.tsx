import React, { ReactNode } from "react";
import { Skeleton } from "../ui/skeleton";

export const Loading = (): ReactNode => {
  return (
    <div>
      <Skeleton className=" ml-9 h-[70vh] w-[40vw] rounded-xl" />
    </div>
  );
};
