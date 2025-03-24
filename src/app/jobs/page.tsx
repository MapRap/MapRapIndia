"use client";
import { createRequest } from "@/_actions/createRequest";
// import { getId } from "@/_actions/getId";
import { getJobs } from "@/_actions/getJobs";
import { Loading2 } from "@/components/common/loader2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Clock, File } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const JobsPage = () => {
  const router = useRouter();
  const [message, setMessage] = useState("");
  const [jobs, setJobs] = useState<
    ({
      requests: {
        id: string;
        jobId: string;
        by: string;
        approved: boolean;
      }[];
    } & {
      id: string;
      type: string;
      direction: string;
      floors: number;
      price: number;
      plot: string;
      specifications: string | null;
      imageUrl: string;
      A: number;
      B: number;
      C: number;
      D: number;
      E: number | null;
      D1: number | null;
      D2: number | null;
      D3: number | null;
      D4: number | null;
      givenBy: string;
      isVerified: boolean | null;
      assignedTo: string | null;
      completed: boolean;
      publishable: boolean;
      expected: string | null;
      studentPrice: string | null;
    })[]
  >([]);
  const [logined, setLogin] = useState<boolean>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const getPublishableJobs = async () => {
      const Totaljobs = await getJobs();
      if (Totaljobs) {
        if (Totaljobs !== "No jobs") {
          setLoading(false);
          Totaljobs.map((job) => {
            if (job.publishable === true) {
              setJobs((prevJobs) => {
                // Check if the item already exists
                const exists = prevJobs.find(
                  (prevJob) => prevJob.id === job.id
                );
                if (exists) return prevJobs; // Return previous items if duplicate
                return [...prevJobs, job];
              });
            }
          });
        }
      }
    };
    getPublishableJobs();
  }, []);
  const session = useSession();
  const handleRequestJob = async (id: string) => {
    const user = session.data?.user;
    if (!session.data) {
      setLogin(false);
      return "";
    }
    setLogin(true);
    // console.log(user.id);
    if (!user) {
      return "NO user";
    }
    const data = await createRequest({ userId: user.id!, jobId: id });
    if (!data) {
      return "Please login again";
    }
    if (data === "Network error, please try again") {
      return { message: data };
    }
    if (
      data === "You have already made a Request, please wait for confirmation"
    ) {
      return { message: data };
    }
    // console.log(data);
    return {
      data: data,
      message: "Request sent! Please wait for the request to get approved",
    };
  };
  return (
    <div>
      {loading === true ? (
        <div className="h-screen w-screen flex items-center justify-center">
          <Loading2 loading={loading} />
        </div>
      ) : (
        // <div></div>
        //bg-[#e7eafb]
        <div className="bg-slate-300 h-full min-h-screen py-4">
          <div className="text-3xl text-center font-bold mt-10">
            <div className="flex items-center justify-center bg-[#9dc85e] gap-3 lg:gap-2 mx-4 h-[30vh] rounded-3xl">
              <img
                src="../cartoon4.webp"
                className="rounded-3xl ml-6 lg:mx-4 w-1/3 md:w-1/4 lg:w-[30vh]"
                width={300}
              />
              <div>
                <div className="text-sm md:text-xl">
                  Maprap isn{`'`}t just ours-it truly belongs to our online
                  employees.
                </div>
                <div className="text-[7px] lg:text-[15px] font-light md:ml-5 w-[50vw] md:text-sm leading-normal mr-2">
                  You will be ratead out of 5 star after every job. There are
                  perks for getting stars:
                  <div className="flex gap-4 opacity-75 ">
                    <div className="bg-amber-700 w-2/3 rounded-xl p-3 text-white py-1 ">
                      <div className="font-bold">Bronze : 20 stars</div>
                      You will be our first priority to assign job{" "}
                      {"(valid for 2 jobs)"}
                    </div>
                    <div className="bg-slate-300 rounded-xl w-2/3 text-black py-1 p-3">
                      <div className="font-bold">Silver : 40 stars</div>
                      You will be our first priority to assign job{" "}
                      {"(valid for 5 jobs)"}
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <div className="w-1/2 my-2 bg-yellow-500 rounded-xl py-1 opacity-75">
                      <div className="font-bold">Gold : 60+ stars</div>
                      You are our top priority
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center">
            {jobs.length === 0 ? (
              <div className="flex items-center justify-center h-screen text-3xl text-black">
                <div className=" p-4">
                  {!session.data?.user ? (
                    <div className="flex flex-col items-center gap-2">
                      <div>
                        Please Login as a student/professional to view available
                        jobs
                      </div>
                      <div
                        className="cursor-pointer w-fit h-min bg-blue-600 hover:bg-blue-700 text-white rounded-xl p-2 text-base"
                        onClick={() => {
                          window.location.replace("/auth/login");
                        }}
                      >
                        Please Login
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center flex-row gap-2">
                      <Clock />
                      Jobs will soon be available...
                    </div>
                  )}
                </div>
              </div>
            ) : (
              jobs.map((job) => (
                <Card
                  key={job.id}
                  className="my-2 w-[80vw] lg:w-[90vw] opacity-90 text-black h-fit p-4"
                >
                  <CardTitle className="my-0 py-0">
                    <CardHeader className="text-base text-green-600 sm:text-lg lg:text-xl my-0 pb-0 border-b-4 text-center">
                      {/* <div className="flex"> */}
                      <div>
                        {job.floors === 0
                          ? "Custom Job"
                          : `${job.floors} Floored ${job.type} Building`}
                      </div>
                      {/* </div> */}
                    </CardHeader>
                  </CardTitle>
                  <CardContent className="flex flex-wrap items-center gap-4 lg:gap-8 text-black py-0 h-fitaa font-semibold">
                    <div>
                      {/* <div>Plot : {`${job.plot}`}</div> */}
                      <div className="flex my-1 flex-wrap text-[8px] sm:text-sm h-fit ">
                        <div className="mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                          A : {`${job.A}`}
                        </div>
                        <div className=" mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                          B : {`${job.B}`}
                        </div>
                        <div className="mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                          C : {`${job.C}`}
                        </div>
                        <div className="mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                          D : {`${job.D}`}
                        </div>
                        {job.E && (
                          <div className="mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                            E : {`${job.E}`}
                          </div>
                        )}
                        {job.D1 && (
                          <div className="mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                            D1 : {`${job.D1}`}
                          </div>
                        )}
                        {job.D2 && (
                          <div className="mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                            D2 : {`${job.D2}`}
                          </div>
                        )}
                        {job.D3 && (
                          <div className="mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                            D3 : {`${job.D3}`}
                          </div>
                        )}
                        {job.D4 && (
                          <div className="border border-black mx-2 rounded-sm lg:rounded-lg p-1 w-[12vw] md:w-[8vw] lg:p-2">
                            D4 : {`${job.D4}`}
                          </div>
                        )}
                      </div>
                      <div className="pl-3 text-[12px] text-gray-700 md:text-base">
                        Direction : {`${job.direction}`}
                      </div>
                      <div className="pl-3 text-[12px] text-gray-700 md:text-base">
                        Specifications: {`${job.specifications}`}
                      </div>
                      {job.expected && (
                        <div className="pl-3 text-[12px] text-gray-700 md:text-base">
                          Task : {`${job.expected}`}
                        </div>
                      )}
                      {job.studentPrice && (
                        <div className="pl-3 text-[12px] text-gray-700 md:text-base">
                          Price : Rs {`${job.studentPrice}`}
                        </div>
                      )}
                      {job.requests.length < 5 && (
                        <div className="text-red-600 ">Only few requests</div>
                      )}
                      <Button
                        className="bg-blue-700 hover:bg-blue-800 mt-4 w-16 md:w-20 h-6"
                        onClick={() => {
                          handleRequestJob(job.id).then((e) => {
                            if (typeof e === "string") setMessage(e);
                            else if (e.data) {
                              e.data.map((req) => {
                                if (req.jobId === job.id) {
                                  setMessage(e.message);
                                  window.location.reload();
                                }
                              });
                            } else {
                              setMessage(e.message);
                            }
                          });
                        }}
                      >
                        <div className="text-[10px]">Request Job</div>
                      </Button>
                      {logined === false && (
                        <button
                          className="text-md text-red-600 hover:underline cursor-pointer px-2 py-1 rounded-xl"
                          onClick={() => {
                            router.push("/");
                          }}
                        >
                          {"Please login to continue !"}
                        </button>
                      )}
                      <div>
                        {job.requests.length === 0 ? "" : message}
                        {/* // job.requests.map((request) => request.jobId === job.id)
                      //   ? message
                      //   : ""} */}
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* <Image
                      src={`${job.imageUrl}`}
                      alt="gg"
                      loading="lazy"
                      width={500}
                      height={500}
                      className="m-2"
                      /> */}
                      {/* <Button onClick={()=>{

                    }}>
                      View Attachment <File />
                    </Button> */}
                      {/* <img
                      src={`../${job.plot}.png`}
                      alt="gg"
                      width={200}
                      height={200}
                      className="m-2"
                    /> */}
                      {job.imageUrl && (
                        <a
                          href={`${job.imageUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex text-black font-bold text-[7px] sm:text-base lg:text-xl"
                        >
                          View Attachment <File />
                        </a>
                      )}
                      <a
                        href={`../${job.plot}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex text-slate-800 border-2"
                      >
                        <img
                          src={`../${job.plot}.png`}
                          alt="gg"
                          width={150}
                          height={150}
                          className="m-2 w-1/3 lg:w-[25vh]"
                        />
                      </a>
                      <div></div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
