import React, { ReactNode } from "react";
// import { Skeleton } from "../ui/skeleton";

import MoonLoader from "react-spinners/ClipLoader";

export const Loading2 = ({ loading }: { loading: boolean }): ReactNode => {
  return (
    <div>
      <MoonLoader size={50} color="#043066" loading={loading} />
      {/* <Skeleton className=" h-[70vh] w-[40vw] rounded-xl" /> */}
    </div>
  );
};
