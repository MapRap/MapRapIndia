"use client";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

// type Props = {
//   params: {
//     done: string;
//   };
// };
type tParams = Promise<{ done: string }>;

const SubmitPage = (props: { params: tParams }) => {
  const searchParams = useSearchParams();
  const [done, setDone] = useState("");

  useEffect(() => {
    props.params.then((e) => {
      if (e) {
        setDone(e.done);
      }
    });
    // getJobs()
  });
  // const { done } = await props.params;
  const router = useRouter();
  return (
    <div className="text-xl flex justify-center items-center h-screen flex-col">
      {done === "success" ? (
        <div>
          <div className="text-center">
            Thank you for your request! It{`'`}s now under review by our team
            and we will have a solution for you soon
          </div>
          <div className="flex justify-center">
            <a
              href={`${searchParams.get("receipt")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:underline flex text-black font-bold"
            >
              Receipt
            </a>
          </div>
        </div>
      ) : (
        `Thank you for your request! It's now under review by our team and we will have a solution for you soon`
      )}
      <div>
        <Button
          className="bg-green-600 hover:bg-green-700 m-4"
          onClick={() => {
            router.push("/");
          }}
        >
          Go Home
        </Button>
      </div>
    </div>
  );
};

export default SubmitPage;
