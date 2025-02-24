"use client";
import { addStars } from "@/_actions/adadStars";
import { addComment } from "@/_actions/addComments";
import { assignJob } from "@/_actions/assignJob";
import { completeJob } from "@/_actions/completeJob";
// import { assignOtherjob } from "@/_actions/assignOtherjob";
import { completeStep } from "@/_actions/completeStep";
import { deleteJob } from "@/_actions/deleteJob";
// import { getId } from "@/_actions/getId";
// import { onPaintingDelete } from "@/_actions/deletePainting";
// import { getJobs } from "@/_actions/getJobs";
// import { deleteUser } from "@/_actions/deleteUser";
import { getJobs } from "@/_actions/getJobs";
// import { getOtherJobs } from "@/_actions/getOtherJobs";
// import { getPaintings } from "@/_actions/getPaintings";
// import { getRequests } from "@/_actions/getRequests";
// import { notVerifiedUsers } from "@/_actions/getUnVerifiedUeses";
// import { getVisit } from "@/_actions/getVisits";
import { isRealUser } from "@/_actions/isReal";
// import { onDeleteVisit } from "@/_actions/onDeleteVisit";
// import { onOtherJobDelete } from "@/_actions/onOtherJobDelete";
// import { otherJobPdf } from "@/_actions/otherJobPdf";
import { publishJob } from "@/_actions/publishJob";
// import { publishOtherJob } from "@/_actions/publishOtherJob";
// import { publishPaint } from "@/_actions/publishPainting";
import { startStep } from "@/_actions/startStep";
// import { unPublishPainting } from "@/_actions/unpublicPainting";
import { unPblishJob } from "@/_actions/unPublishJob";
// import { unPublishOtherJob } from "@/_aaverify";
import { verifyJobs } from "@/_actions/verifyJob";
import { Loading2 } from "@/components/common/loader2";
import { PdfUploadForm } from "@/components/common/pdfUploadForm";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
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
import { useSession } from "next-auth/react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { File } from "lucide-react";
// import { pide } from "lucide-react";
// import { pide } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
// import { flushSync } from "react-dom";
// import { flushSync } from "react-dom";

// type Props = {};

const AdminPage = () => {
  // const [logins, setLogin] = useState<
  //   {
  //     id: string;
  //     name: string;
  //     gmail: string;
  //     Proof: string | null;
  //     isReal: boolean | null;
  //     type: string;
  //   }[]
  // >([]);
  // console.log(logins);
  const [done, setDone] = useState("");
  const [jobs, setJobs] = useState<
    ({
      requests: {
        id: string;
        jobId: string;
        by: string;
        approved: boolean;
        stars: string | null;
      }[];
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
        onGmail: string | null;
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
      D3: number | null;
      D4: number | null;
      D2: number | null;
      givenBy: string;
      isVerified: boolean | null;
      assignedTo: string | null;
      completed: boolean;
      publishable: boolean;
      name: string;
      phone: string;
      expected: string | null;
      studentPrice: string | null;
    })[]
  >([]);
  const [requestUser, setRequestUser] = useState<
    {
      id: string;
      name: string;
      gmail: string;
      Proof: string | null;
      isReal: boolean | null;
      type: string;
      payment: string | null;
    }[]
  >([]);
  // const [paintings, setPaintings] = useState<
  //   {
  //     id: string;
  //     title: string;
  //     description: string;
  //     clientPrice: number;
  //     totalPrice: number;
  //     givenBy: string;
  //     imageUrl: string;
  //     published: boolean;
  //     paid: boolean;
  //   }[]
  // >([]);
  // const [otherJobs, setOtherJobs] = useState<
  //   ({
  //     requests: {
  //       id: string;
  //       gmail: string;
  //       phone: string;
  //       otherJobId: string;
  //       by: string;
  //       approved: boolean;
  //       attachment: string;
  //     }[];
  //   } & {
  //     id: string;
  //     title: string;
  //     description: string;
  //     clientPrice: number;
  //     totalPrice: number;
  //     givenBy: string;
  //     imageUrl: string;
  //     published: boolean;
  //     paid: boolean;
  //   })[]
  // >([]);
  // const [visits, setVisits] = useState<
  //   {
  //     id: string;
  //     userId: string;
  //     phone: string;
  //     gmail: string;
  //   }[]
  // >([]);
  // const [totalPrice, setTotalPrice] = useState(0);
  const [erro] = useState("");
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
  const [task, setTask] = useState("");
  const [comment, setComment] = useState("");
  const [studentPrice, setStudentPrice] = useState("");
  // const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [stars, setStars] = useState("");
  const [message, setMessage] = useState("");
  const session = useSession();
  useEffect(() => {
    // notVerifiedUsers().then((e) => {
    //   if (e) {
    //     if (e !== "No new users") {
    //       setLogin(e);
    //     }
    //   }
    // });

    // session.data?.user.id?.then((e) => {
    //   if (e) {
    //     if (e !== "/unauthorized") {
    //       setUser(e);
    //     }
    //   }
    // });
    // const assign = async () => {
    // if (jobs.length === 0) {
    // console.log(count);
    // if (count < 5) {
    // setCount(count + 1);
    getJobs().then((a) => {
      if (a) {
        if (a !== "No jobs") {
          // flushSync(() => {
          setJobs(a);

          // hasFetchedData.current = true;
          // });
          // console.log("GG");
          // if (count < 5) {
          // if (jobs.length !== 0) {
          console.log("hey");
          a.map((e) => {
            // e.steps.map((step) => {
            // if (step) {
            //   setSteps((prevSteps) => {
            //     const exists = prevSteps.find(
            //       (userStep) =>
            //         userStep.id === e.id &&
            //         userStep.completed === e.completed
            //     );
            //     if (exists) return prevSteps;
            //     return [...prevSteps, step];
            //   });
            // }
            // });
            e.requests.map((request) => {
              isRealUser(request.by).then((e) => {
                console.log("E", e);
                if (e) {
                  if (e !== "no such user!") {
                    if (e.isReal === true) {
                      console.log("adfd", e);
                      setRequestUser((prevUsers) => {
                        const exists = prevUsers.find(
                          (user) => user.id === e.id
                        );
                        if (exists) return prevUsers;
                        return [...prevUsers, e];
                      });
                    }
                  }
                }
              });
            });
          });
          // }
          // }
        }
      }
      setLoading(false);
    });
    // getOtherJobs().then((e) => {
    //   if (e) {
    //     if (e !== "No Jobs") {
    //       // console.log(e);
    //       e.map((job) => {
    //         setOtherJobs((prevJobs) => {
    //           const exists = prevJobs.find((j) => j.id === job.id);
    //           if (exists) return prevJobs;
    //           return [...prevJobs, job];
    //         });
    //       });
    //     }
    //   }
    // });
    // }
    // };
    // getVisit().then((e) => {
    //   if (e) {
    //     if (e !== "Error") {
    //       e.map((visit) => {
    //         setVisits((prevVisits) => {
    //           const exists = prevVisits.find((v) => v.id === visit.id);
    //           if (exists) return prevVisits;
    //           return [...prevVisits, visit];
    //         });
    //       });
    //     }
    //   }
    // });
    // getPaintings().then((e) => {
    //   if (e) {
    //     if (e !== "No paintings") {
    //       e.map((paint) => {
    //         setPaintings((prevPaintings) => {
    //           const exists = prevPaintings.find((p) => p.id === paint.id);
    //           if (exists) return prevPaintings;
    //           return [...prevPaintings, paint];
    //         });
    //       });
    //     }
    //   }
    // });
    // assign();
    // console.log(requestUser);
  }, [setJobs]);

  // const publishPainting = async ({ paintingId }: { paintingId: string }) => {
  //   try {
  //     const data = await publishPaint({
  //       id: paintingId,
  //       totalPrice: totalPrice,
  //     });
  //     if (!data) {
  //       console.log("Error");
  //     } else if (data === "Timeout! Please try again") {
  //       console.log(data);
  //     } else if (data === "success") {
  //       return data;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const publishOtherJobs = async ({ OtherId }: { OtherId: string }) => {
  //   try {
  //     const data = await publishOtherJob({
  //       id: OtherId,
  //       totalPrice: totalPrice,
  //     });
  //     if (!data) {
  //       console.log("Error");
  //     } else if (data === "Timeout! Please try again") {
  //       console.log(data);
  //     } else if (data === "success") {
  //       return data;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const unPub = async ({ id }: { id: string }) => {
  //   try {
  //     const success = await unPublishPainting({ id: id });
  //     if (!success) {
  //       console.log("Error");
  //     } else if (success === "Error! Please try again") {
  //       console.log(success);
  //     } else if (success === "success") {
  //       return success;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const unPubOther = async ({ id }: { id: string }) => {
  //   try {
  //     const success = await unPublishOtherJob({ id: id });
  //     if (!success) {
  //       console.log("Error");
  //     } else if (success === "Error! Please try again") {
  //       console.log(success);
  //     } else if (success === "success") {
  //       return success;
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  // const onDelete = async ({ id }: { id: string }) => {
  //   try {
  //     const result = await onPaintingDelete({ id });
  //     if (result === "Error! Please try again") {
  //       console.log("error");
  //     } else if (result === "Succefully deleted painting") {
  //       window.location.reload();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };
  // const onDeleteOther = async ({ id }: { id: string }) => {
  //   try {
  //     const result = await onOtherJobDelete({ id });
  //     if (result === "Error! Please try again") {
  //       console.log("error");
  //     } else if (result === "Succefully deleted painting") {
  //       window.location.reload();
  //     }
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  const handleAssign = async ({
    userId,
    jobId,
  }: {
    userId: string;
    jobId: string;
  }) => {
    try {
      const job = await assignJob({ userId, jobId });
      if (!job) {
        return "Job Deleted";
      }
      if (job === "Job deleted") {
        return "Job Deleted";
      }
      return "Assigned job";
    } catch (err) {
      console.log(err);
    }
  };
  // jobs.map((job) => {
  //   job.steps.map((step) => {
  //     console.log(step.completed);
  //   });
  // });
  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div>
      <div className="text-center text-xl">Admin Page</div>
      <div className="text-2xl flex-wrap justify-center items-center gap-4 text-center m-2 flex">
        <Button
          onClick={() => {
            window.location.replace("/admin/otherJobs");
          }}
        >
          Go to otherJobs Admin Page
        </Button>
        <Button
          onClick={() => {
            window.location.replace("/admin/interior");
          }}
        >
          Go to interior Admin Page
        </Button>
        {session.data &&
          session.data.user &&
          session.data.user.type === "owner" && (
            <Button
              onClick={() => {
                window.location.replace("/admin/addAdmin");
              }}
            >
              Edit other admins
            </Button>
          )}
        <Button
          onClick={() => {
            window.location.replace("/admin/otherJobs");
          }}
        >
          Go to site visit Page
        </Button>
        <Button
          onClick={() => {
            window.location.replace("/admin/logins");
          }}
        >
          Go to New Logins Page
        </Button>
        <div className="flex gap-3">
          {session.data &&
            session.data.user &&
            session.data.user.type === "owner" && (
              <Button
                onClick={() => {
                  window.location.replace("/admin/addPlan");
                }}
              >
                Add new Area plans
              </Button>
            )}
          <Button
            onClick={() => {
              window.location.replace("/admin/createJob");
            }}
          >
            Create Job
          </Button>
          <Button
            onClick={() => {
              window.location.replace("/admin/paintings");
            }}
          >
            Go to Paintings Admin Page
          </Button>
        </div>
      </div>
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
                <DrawerTrigger className="font-bold w-screen">
                  <div>
                    {`${job.floors} floored ${job.type} Building by ${job.name} | Phone:${job.phone} | Completed : ${job.completed}`}
                  </div>
                </DrawerTrigger>
                <DrawerContent className="">
                  <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                  </DrawerHeader>
                  <div className="h-[80vh] overflow-scroll">
                    <div className="font-bold text-center underline text-2xl">{`${job.floors} floored ${job.type} Building`}</div>
                    <div className="flex flex-col">
                      {/* <div> */}
                      {job.price && job.price !== 0 && (
                        <div className="border-2 m-1 border-slate-400 rounded-md h-8 p-1">
                          Price : Rs {`${job.price}`}
                        </div>
                      )}

                      <div className="border-2 m-1 border-slate-400 rounded-md h-8 p-1">
                        Plot : {`${job.plot}`}
                      </div>
                      <div className="flex">
                        {job.A !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            A : {`${job.A}`}
                          </div>
                        )}
                        {job.B !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            B : {`${job.B}`}
                          </div>
                        )}
                        {job.C !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            C : {`${job.C}`}
                          </div>
                        )}
                        {job.D !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            D : {`${job.D}`}
                          </div>
                        )}
                        {job.E && job.E !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            E : {`${job.E}`}
                          </div>
                        )}
                        {job.D1 && job.D1 !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            D1 : {`${job.D1}`}
                          </div>
                        )}
                        {job.D2 && job.D2 !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            D2 : {`${job.D2}`}
                          </div>
                        )}
                        {job.D3 && job.D3 !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            D3 : {`${job.D3}`}
                          </div>
                        )}
                        {job.D4 && job.D4 !== 0 && (
                          <div className="border-2 m-1 border-slate-400 h-8 p-1 rounded-md div-2">
                            D4 : {`${job.D4}`}
                          </div>
                        )}
                      </div>
                      <div>Direction : {`${job.direction}`}</div>
                      <div>Specifications: {`${job.specifications}`}</div>
                      {/* {job.premium && <div> Premium</div>} */}
                      {/* <div>Interior Plan : {job.interior}</div> */}
                      {job.expected && (
                        <div>Task for student : {job.expected}</div>
                      )}
                      {job.studentPrice && (
                        <div>Student Price: {job.studentPrice}</div>
                      )}
                      <div className="flex gap-2 flex-wrap ">
                        <Input
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
                        />
                      </div>
                      <div className="flex">
                        {job.isVerified === true ? (
                          job.publishable === false && (
                            <Button
                              className="bg-blue-700 hover:bg-blue-800 mt-4"
                              onClick={() => {
                                publishJob(job.id, task, studentPrice).then(
                                  () => {
                                    setJobs((prevJobs) =>
                                      prevJobs.map((prevJob) =>
                                        prevJob.id === job.id
                                          ? {
                                              ...prevJob,
                                              publishable: true,
                                            }
                                          : { ...prevJob }
                                      )
                                    );
                                  }
                                );
                              }}
                            >
                              Publish Job
                            </Button>
                          )
                        ) : (
                          <Button
                            onClick={() => {
                              verifyJobs(job.id).then(() => {
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
                              completeJob({ id: job.id }).then((e) => {
                                if (e) {
                                  if (e === "Success") {
                                    window.location.reload();
                                  }
                                }
                              });
                            }}
                          >
                            Complete Job
                          </Button>
                        )}
                        <Button
                          className="bg-red-600 hover:bg-red-700 m-4 w-32"
                          onClick={() => {
                            deleteJob(job.id).then(() => {
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
                        <div>
                          {job.publishable === true && (
                            <Button
                              className="bg-red-600 hover:bg-red-700 m-4"
                              onClick={() => {
                                unPblishJob(job.id).then(() => {
                                  setJobs((prevJobs) =>
                                    prevJobs.map((prevJob) =>
                                      prevJob.id === job.id
                                        ? {
                                            ...prevJob,
                                            publishable: false,
                                          }
                                        : { ...prevJob }
                                    )
                                  );
                                });
                              }}
                            >
                              UnPublish Job
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-wrap items-center justify-center">
                      {job.imageUrl && (
                        <Image
                          src={`${job.imageUrl}`}
                          alt="gg"
                          loading="lazy"
                          width={500}
                          height={500}
                          className="m-2"
                        />
                      )}
                      {job.plot && (
                        <img
                          src={`../${job.plot}.png`}
                          alt="gg"
                          width={300}
                          height={300}
                          className="m-2"
                        />
                      )}
                    </div>

                    <div>
                      <div>
                        Assigned:
                        {`${job.requests.map((e) => {
                          const exists = e.by === job.assignedTo;
                          if (exists)
                            return requestUser.map((e) => {
                              return `${e.name},${e.gmail},${e.payment}`;
                            });
                        })}`}
                      </div>
                      Requests:
                      <div>
                        {job.requests.map((request) => (
                          <Dialog key={request.id}>
                            <DialogTrigger
                              className={`${
                                Number(request.stars) < 20 && "bg-blue-600"
                              } ${
                                Number(request.stars) === null && "bg-blue-600"
                              } ${
                                Number(request.stars) < 40 &&
                                Number(request.stars) > 20 &&
                                "bg-amber-800"
                              }   ${
                                Number(request.stars) < 60 &&
                                Number(request.stars) > 40 &&
                                "bg-slate-400"
                              }
                               ${
                                 Number(request.stars) > 60 && "bg-yellow-600"
                               } p-3 m-2 div-4 rounded-xl text-white hover:bg-blue-700`}
                            >
                              {`${requestUser.map((user) => {
                                const exists = user.id === request.by;
                                if (exists) return user.gmail;
                              })}`}
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>
                                  <div>
                                    Name:
                                    {`${requestUser.map((user) => {
                                      const exists = user.id === request.by;
                                      if (exists) return user.name;
                                    })}`}
                                  </div>
                                  <div>
                                    Gmail:
                                    {`${requestUser.map((user) => {
                                      const exists = user.id === request.by;
                                      if (exists) return user.gmail;
                                    })}`}
                                  </div>
                                  <div>
                                    Payment :{" "}
                                    {`${requestUser.map((user) => {
                                      const exists = user.id === request.by;
                                      if (exists) return user.payment;
                                    })}`}
                                  </div>
                                </DialogTitle>
                              </DialogHeader>
                              <DialogDescription className="leading-loose text-gray-600">
                                Type:
                                {`${requestUser.map((user) => {
                                  const exists = user.id === request.by;
                                  if (exists) return user.type;
                                })}`}
                                <br></br>
                                Give rating out of 5 star
                                <Input
                                  placeholder="Rating"
                                  className="border-black m-2"
                                  onChange={(e) => {
                                    setStars(e.target.value);
                                  }}
                                />
                                <Button
                                  className="m-4"
                                  onClick={() => {
                                    addStars({
                                      id: request.by,
                                      stars: stars,
                                    }).then((e) => {
                                      if (e) {
                                        if (e === "Success") {
                                          setDone("Done");
                                        }
                                      }
                                    });
                                  }}
                                >
                                  Give Rating
                                </Button>
                                <Button
                                  onClick={() => {
                                    setDone("");
                                    handleAssign({
                                      userId: request.by,
                                      jobId: job.id,
                                    }).then((e) => {
                                      if (e) window.location.reload();
                                    });
                                  }}
                                >
                                  Assign
                                </Button>
                                <br></br>
                                {done}
                              </DialogDescription>
                            </DialogContent>
                          </Dialog>
                        ))}
                      </div>
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

                                    <div>
                                      Comments: {`${st.comments}`}
                                      <div className="flex gap-2 flex-wrap">
                                        Change Comment :
                                        <Input
                                          placeholder="Enter other comment"
                                          onChange={(e) => {
                                            setComment(e.target.value);
                                          }}
                                        />
                                        <Button
                                          onClick={() => {
                                            addComment({
                                              jobId: st.jobId,
                                              comment: comment,
                                            }).then((e) => {
                                              if (e) {
                                                if (e === "Success") {
                                                  window.location.reload();
                                                }
                                              }
                                            });
                                          }}
                                        >
                                          Add comment
                                        </Button>
                                      </div>
                                    </div>
                                  </div>
                                  <div className="flex justify-between flex-wrap">
                                    {st.onGmail && (
                                      <div className="flex">
                                        Attachment : {st.onGmail}
                                      </div>
                                    )}
                                    <div>
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
                                    </div>
                                    {st.completed === false && (
                                      <div className="mt-3">
                                        <div>
                                          <PdfUploadForm jobId={st.id} />
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
                                              completeStep({
                                                id: st.id,
                                              }).then((res) => {
                                                if (!res) {
                                                  setMessage("error");
                                                } else if (
                                                  res ===
                                                  "No such order, please make a request"
                                                ) {
                                                  setMessage(res);
                                                } else {
                                                  startStep({
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
                                </div>
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

export default AdminPage;
