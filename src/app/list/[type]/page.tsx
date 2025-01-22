"use client";
import { getClientJobsWithSteps } from "@/_actions/getClientJobs";
import { Loading2 } from "@/components/common/loader2";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

type tParams = Promise<{ type: string }>;

export default function CalculatePage(props: { params: tParams }) {
  // const [jobs, setJobs] = useState(false);
  const [count, setCount] = useState(0);
  const [type, setType] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    props.params.then((e) => {
      if (e) {
        setType(e.type);
      }
    });
    // getId().then((id) => {
    //   if (id === "/unauthorized") {
    //     window.location.replace("/unauthorized");
    //   }
    // });
    getClientJobsWithSteps().then((e) => {
      if (e) {
        if (e === "Please login" || e === "Wrong token, please login again!") {
          window.location.replace("/unauthorized");
        }
        if (e !== "Please login" && e !== "Wrong token, please login again!") {
          setLoading(false);
          if (typeof e !== "string") {
            console.log(e);
            let g = 0;
            e.map(() => {
              g = g + 1;
            });
            if (g >= 3) {
              setCount(3);
            }
            // setJobs(true);
          }
        }
      }
    });
  }, [props.params, setCount]);
  console.log(count);
  const searchParams = useSearchParams();
  const router = useRouter();
  const [plot, setPlot] = useState("");
  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div className="z-40">
      {count > 2 ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="underline text-center">
            You already have assigned a number of jobs to user, please wait for
            jobs competion or use a different account
          </div>
          <Button
            className="bg-green-600 hover:bg-green-700 m-4"
            onClick={() => {
              router.push("/");
            }}
          >
            Go Home
          </Button>
        </div>
      ) : (
        <div>
          <h1 className="z-40 text-center font-bold p-8 text-lg md:text-2xl md:bg-black md:opacity-45 md:text-white lg:text-4xl">
            Select the type of plot that matches with your plot
          </h1>
          <div className="flex gap-5 justify-around ">
            <Card
              className={`cursor-pointer hover:border-slate-800 h-fit ${
                plot === "plot1" ? "border-slate-800 border-[4px]" : ""
              } `}
              onClick={() => {
                setPlot("plot1");
              }}
            >
              <CardContent>
                <img width={320} src="../plot1.png" alt="plot1" />
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer hover:border-slate-800 h-fit ${
                plot === "plot2" ? "border-slate-800 border-[4px]" : ""
              }`}
              onClick={() => {
                setPlot("plot2");
              }}
            >
              <CardContent>
                <img width={370} src="../plot2.png" alt="plot1" />
              </CardContent>
            </Card>
            <Card
              className={`cursor-pointer h-[70vh] hover:border-slate-800 h-fit ${
                plot === "plot3" ? "border-slate-800 border-[4px]" : ""
              }`}
              onClick={() => {
                setPlot("plot3");
              }}
            >
              <CardContent>
                <img width={350} src="../plot3.png" alt="plot1" />
              </CardContent>
            </Card>
          </div>
          <div className="text-center m-8">
            {plot === "" ? (
              <Button
                className="bg-green-500 w-32 hover:bg-green-500 cursor-not-allowed"
                disabled={true}
              >
                Next
              </Button>
            ) : (
              <Button
                className="bg-green-600 w-32 hover:bg-green-700 "
                onClick={() => {
                  router.push(
                    `/list/${type}/${plot}?pack=${searchParams.get(
                      "pack"
                    )}&floors=${searchParams.get(
                      "floors"
                    )}&price=${searchParams.get(
                      "price"
                    )}&property=${searchParams.get("property")}`
                  );
                }}
              >
                Next
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
