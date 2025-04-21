"use client";
import { completeInteriorJob } from "@/_actions/completeInteriorJob";
import { completeInteriorStep } from "@/_actions/completeInteriorStep";
// import { completeStep } from "@/_actions/completeStep";
import { deleteInteriorJob } from "@/_actions/deleteInteriorJob";
// import { deleteJob } from "@/_actions/deleteJob";
// import { getId } from "@/_actions/getId";
import { getAllInteriorJobs } from "@/_actions/getInteriorJobs";
import { reminderInteriorMessage } from "@/_actions/reminderInteriorMessage";
import { startInteriorStep } from "@/_actions/startInteriorStep";
// import { startStep } from "@/_actions/startStep";
import { verifyInteriorJobs } from "@/_actions/verifyInteriorJobs";
// import { verifyJobs } from "@/_actions/verifyJob";
import { InteriorPdfUploadForm } from "@/components/common/interiorDesignUploadForm";
import { Loading2 } from "@/components/common/loader2";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const InteriorAdminPage = () => {
  // const [jobs,setJobs]=useState<>([])
  const [message, setMessage] = useState("");
  const [erro] = useState("");
  const [jobs, setJobs] = useState<
    ({
      steps: {
        id: string;
        completed: boolean;
        type: string;
        jobId: string;
        started: boolean | null;
        currentStep: number;
        receipt: string | null;
        attachments: string | null;
        comments: string | null;
      }[];
    } & {
      id: string;
      specifications: string | null;
      floors: number | null;
      property: string;
      area: string;
      givenBy: string;
      price: string;
      isVerified: boolean | null;
      assignedTo: string | null;
      completed: boolean;
      imageUrl: string;
      publishable: boolean;
      attachment: string | null;
      phone: string;
      name: string;
      plan: string;
      studentPrice: string | null;
      remind: boolean;
      remindMessage: string | null;
    })[]
  >([]);
  const [reminder, setReminder] = useState("");
  const [loading, setLoading] = useState(true);
  // const [user, setUser] = useState<{
  //   id: string;
  //   gmail: string;
  //   name: string;
  //   password: string;
  //   otp: string | null;
  //   isVerified: boolean | null;
  //   otpExpiry: Date;
  //   type: string;
  //   Phone: string;
  //   paymentId: string;
  //   country: boolean;
  // }>();
  useEffect(() => {
    getAllInteriorJobs().then((e) => {
      if (e) {
        setLoading(false);
        if (e !== "Network Error") {
          setJobs(e);
        }
      }
    });
    // getId().then((e) => {
    //   if (e) {
    //     if (e !== "/unauthorized") {
    //       setUser(e);
    //     }
    //   }
    // });
  }, []);
  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div>
      <div className="text-center text-xl">Admin Page</div>
      {/* <Tabs> */}
      {/* <TabsList className="flex items-center justify-center"> */}
      {/* <TabsTrigger value="New Jobs" className="w-1/3"> */}

      <div className="text-3xl text-center border-b-4">Jobs</div>
      {/* </TabsTrigger> */}
      {/* </TabsList> */}
      {/* <TabsContent value="New Jobs"> */}
      <div>
        {jobs.length === 0
          ? "No new jobs"
          : jobs.map((job) => (
              // <div key={job.id}>
              <Drawer key={job.id}>
                <DrawerTrigger
                  className={`font-bold w-screen ${
                    job.remind ? "text-red-600" : ""
                  }`}
                >{`${job.property} Building by ${job.name} Phone:${job.phone}`}</DrawerTrigger>
                <DrawerContent className="">
                  <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                  </DrawerHeader>
                  <div className="h-[80vh] overflow-scroll">
                    <div className="font-bold text-center underline text-2xl">{`${job.property} Building  | Completed : ${job.completed}`}</div>
                    <div className="flex flex-col">
                      {/* <div> */}
                      <div className="border-2 m-1 border-slate-400 rounded-md h-8 p-1">
                        Price : Rs {`${job.price}`}
                      </div>
                      <div className="border-2 m-1 border-slate-400 rounded-md h-8 p-1">
                        specifications : {`${job.specifications}`}
                      </div>

                      <div>Area : {`${job.area}`}</div>
                      <div>Specifications: {`${job.specifications}`}</div>
                      <div>Plan : {`${job.plan}`}</div>
                      {/* {job.premium && <div> Premium</div>} */}
                      {/* <div>Interior Plan : {job.interior}</div> */}
                      {/* <div className="flex gap-2 flex-wrap "> */}
                      {/* <Input
                          placeholder="Enter task for the student"
                          onChange={(e) => {
                            setTask(e.target.value);
                          }}
                        />
                        <Input
                          placeholder="Enter price for student"
                          onChange={(e) => {
                            setStudentPrice(e.target.value);
                          }}
                        /> */}
                      {/* </div> */}
                      <div className="flex">
                        {job.isVerified === false && (
                          <Button
                            onClick={() => {
                              verifyInteriorJobs(job.id).then(() => {
                                setJobs((prevJobs) =>
                                  prevJobs.map((prevJob) =>
                                    prevJob.id === job.id
                                      ? { ...prevJob, isVerified: true }
                                      : { ...prevJob }
                                  )
                                );
                              });
                            }}
                            className="bg-green-600 hover:bg-green-700 mt-4"
                          >
                            Verify Job
                          </Button>
                        )}
                        {job.completed ? (
                          `Completed : ${job.completed}`
                        ) : (
                          <Button
                            className="bg-blue-600 hover:bg-blue-700 m-4 w-32"
                            onClick={() => {
                              completeInteriorJob({ id: job.id });
                            }}
                          >
                            Complete Job
                          </Button>
                        )}
                        <Button
                          className="bg-red-600 hover:bg-red-700 m-4 w-32"
                          onClick={() => {
                            deleteInteriorJob(job.id).then(() => {
                              setJobs((prevJobs) =>
                                prevJobs.filter(
                                  (prevJob) => prevJob.id !== job.id
                                )
                              );
                            });
                          }}
                        >
                          Reject Job
                        </Button>
                      </div>
                    </div>
                    {job.imageUrl && (
                      <div className="flex flex-wrap items-center justify-center">
                        <Image
                          src={`${job.imageUrl}`}
                          alt="gg"
                          loading="lazy"
                          width={500}
                          height={500}
                          className="m-2"
                        />
                      </div>
                    )}

                    {job.remind && (
                      <div>
                        <div className="flex text-red-600 w-full items-center justify-center flex-row gap-2">
                          Reminder Message :{" "}
                          <Input
                            placeholder="Enter message to send to the client"
                            onChange={(e) => {
                              setReminder(e.target.value);
                            }}
                            className="w-1/2 text-black"
                          />
                          <Button
                            onClick={async () => {
                              reminderInteriorMessage({
                                id: job.id,
                                text: reminder,
                              }).then((e) => {
                                if (e) {
                                  if (e === "Success") {
                                    window.location.reload();
                                  }
                                }
                              });
                            }}
                          >
                            Send Client this message
                          </Button>
                        </div>
                      </div>
                    )}
                    <div>
                      <div>
                        {job.steps.map((st) => (
                          <div key={st.id}>
                            <Card className="m-2">
                              <CardHeader>
                                <CardTitle>Phase Details:</CardTitle>
                              </CardHeader>
                              <CardContent>
                                <div className="flex flex-col justify-around">
                                  <div className="flex justify-between">
                                    <div>Phase: {st.currentStep}</div>
                                    <div>Type: {st.type}</div>
                                    <div>Started : {`${st.started}`}</div>
                                    <div className="text-black">
                                      Completed :
                                      {st.completed ? " true" : " false"}
                                    </div>
                                  </div>
                                  {st.attachments && (
                                    <div key={st.id}>
                                      <Dialog>
                                        <DialogTrigger className="bg-green-500 hover:bg-green-600 text-white div-2 rounded-md p-2 m-2">
                                          {" "}
                                          View Document
                                        </DialogTrigger>
                                        <DialogContent>
                                          <DialogHeader>
                                            <DialogTitle></DialogTitle>
                                          </DialogHeader>
                                          <iframe
                                            src={st.attachments!}
                                            width="100%"
                                            height="600px"
                                            style={{
                                              border: "none",
                                            }}
                                            title="PDF Viewer"
                                          />
                                        </DialogContent>
                                      </Dialog>
                                    </div>
                                  )}
                                  {/* </div> */}
                                  {st.completed === false && (
                                    <div className="mt-3">
                                      <div>
                                        <InteriorPdfUploadForm jobId={st.id} />
                                      </div>
                                      <div>{erro}</div>
                                    </div>
                                  )}
                                  <div>
                                    {st.completed === false &&
                                      st.attachments && (
                                        <Button
                                          className="mt-2"
                                          onClick={() => {
                                            completeInteriorStep({
                                              id: st.id,
                                              jobId: job.id,
                                            }).then((res) => {
                                              if (!res) {
                                                setMessage("error");
                                              } else if (
                                                res ===
                                                "No such order, please make a request"
                                              ) {
                                                setMessage(res);
                                              } else {
                                                startInteriorStep({
                                                  id: res.id,
                                                }).then((ste) => {
                                                  if (!ste) {
                                                    setMessage("Error gg");
                                                  } else if (
                                                    ste ===
                                                    "Error! Please try again"
                                                  ) {
                                                    setMessage(ste);
                                                  } else {
                                                    setMessage(
                                                      "Pdf sent to client!"
                                                    );
                                                  }
                                                });
                                              }
                                            });
                                          }}
                                        >
                                          Complete step
                                        </Button>
                                      )}
                                    <div className="m-2 font-semibold text-sm">
                                      {message}
                                    </div>
                                  </div>
                                </div>
                                {/* </div> */}
                              </CardContent>
                            </Card>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </DrawerContent>
              </Drawer>
            ))}
      </div>
      {/* </TabsContent> */}
      {/* </Tabs> */}
    </div>
  );
};

export default InteriorAdminPage;
