"use client";
import { addOnGmailText } from "@/_actions/addOnGmailText";
import { getAssignedJobs } from "@/_actions/getAssignedJobs";
import { getId } from "@/_actions/getId";
import { getOtherAssignedJobs } from "@/_actions/getOtherAssignedJobs";
// import { uploadPdfLink } from "@/_actions/uploadPdfLink";
import { Loading2 } from "@/components/common/loader2";
// import { uploadPdfLink } from "@/_actions/uploadPdfLink";
// import { PdfUploadForm } from "@/components/common/pdfUploadForm";
import { PdfUploadFormForOtherJobs } from "@/components/common/pdfUploadOther";
import { Button } from "@/components/ui/button";
// import { Button } from "@/components/ui/button";
// import PdfUploadForm from "@/components/common/pdfUploadForm";
// import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent } from "@radix-ui/react-tabs";
import { File } from "lucide-react";
import Image from "next/image";
// import Image from "next/image";
import React, { useEffect, useState } from "react";

const AssignedPage = () => {
  const [erro] = useState("");
  const [loading, setLoading] = useState(true);
  const [attach, setAttach] = useState("");
  const [otherJobs, setOtherJobs] = useState<
    {
      id: string;
      title: string;
      description: string;
      clientPrice: number;
      totalPrice: number;
      attachments: string;
      givenBy: string;
      imageUrl: string;
      published: boolean;
      paid: boolean;
    }[]
  >([]);
  const [jobs, setJobs] = useState<
    ({
      steps: {
        type: string;
        comments: string | null;
        currentStep: number;
        id: string;
        completed: boolean;
        jobId: string;
        receipt: string | null;
        attachments: string | null;
        started: boolean;
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
    })[]
  >([]);

  const [user, setUser] = useState<{
    id: string;
    gmail: string;
    name: string;
    password: string;
    otp: string | null;
    isVerified: boolean | null;
    otpExpiry: Date;
    type: string;
    Phone: string;
    paymentId: string;
    country: boolean;
    stars: string | null;
  }>();

  useEffect(() => {
    getId().then((e) => {
      if (e) {
        if (e !== "/unauthorized") {
          setUser(e);
        }
      }
    });
    getAssignedJobs().then((e) => {
      if (e) {
        setLoading(false);
        if (e !== "Login Again!") {
          if (e !== "Request failed") {
            if (e !== "No Jobs assigned to you") {
              setJobs(e);
            }
          }
        }
      }
    });
    getOtherAssignedJobs().then((e) => {
      if (e) {
        setLoading(false);
        if (e !== "Login Again!") {
          if (e !== "Request failed") {
            if (e !== "No Jobs assigned to you") {
              setOtherJobs(e);
            }
          }
        }
      }
    });
  }, []);

  return loading ? (
    <div className="flex w-screen h-screen items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div>
      <div className="flex justify-around items-center text-3xl font-bold text-center bg-[#9ac6d0]">
        <Image
          src="https://utfs.io/f/GH57qH88dIR19jnc5aiqxReFDNpfQ6Xd8UbsBWthuVMHol5r"
          alt="gg"
          loading="lazy"
          width={300}
          height={300}
          className="m-0 w-1/3 lg:w-1/5"
        />
        <div className="flex flex-col w-1/2">
          <div className=" text-lg lg:text-3xl">
            All Your Projects, One Place!
          </div>
          <div className="text-[7px] lg:text-sm  font-normal w-full leading-normal">
            Welcome to your personalized project dashboard! Here, you can easily
            view and manage all the projects assigned to you. Stay organized,
            track your progress, and quickly access project details from one
            central location. Whether you{"'"}re leading a team or contributing
            to a project, everything you need is just a click away. Keep your
            projects on track and ensure timely completion with ease!
          </div>
          {user && (
            <div className="text-lg">
              <div>Current Stars : {user.stars ? user.stars : 0}</div>
              Tier :{" "}
              {user.stars
                ? (Number(user.stars) < 20 && "Basic") ||
                  (Number(user.stars) > 20 &&
                    Number(user.stars) < 40 &&
                    "Bronze") ||
                  (Number(user.stars) > 40 &&
                    Number(user.stars) < 60 &&
                    "Silver") ||
                  (Number(user.stars) > 60 && "Gold")
                : 0}
            </div>
          )}
        </div>
      </div>
      <Tabs>
        <TabsList className="w-[98vw]">
          <TabsTrigger value="jobs" className="w-full">
            Jobs
          </TabsTrigger>
          <TabsTrigger value="otherJobs" className="w-full">
            Other
          </TabsTrigger>
        </TabsList>
        <TabsContent value="jobs">
          {jobs.map((job) => (
            <Card key={job.id} className="border-slate-400 w-[98vw]">
              <CardTitle>
                <CardHeader>{`${job.floors} Floored ${job.type} Building`}</CardHeader>
              </CardTitle>
              <CardContent>
                <div className="flex flex-wrap justify-around">
                  <div>
                    <div className="font-bold text-xl underline text-center">
                      Assigned
                    </div>
                    <div>Plot : {`${job.plot}`}</div>
                    <div className="flex my-1">
                      <div className="border mx-2 rounded-lg p-2">
                        A : {`${job.A}`}
                      </div>
                      <div className="border mx-2 rounded-lg p-2">
                        B : {`${job.B}`}
                      </div>
                      <div className="border mx-2 rounded-lg p-2">
                        C : {`${job.C}`}
                      </div>
                      <div className="border mx-2 rounded-lg p-2">
                        D : {`${job.D}`}
                      </div>

                      {job.E && (
                        <div className="border mx-2 rounded-lg p-2">
                          E : {`${job.E}`}
                        </div>
                      )}
                      {job.D1 && (
                        <div className="border mx-2 rounded-lg p-2">
                          D1 : {`${job.D1}`}
                        </div>
                      )}
                      {job.D2 && (
                        <div className="border mx-2 rounded-lg p-2">
                          D2 : {`${job.D2}`}
                        </div>
                      )}
                      {job.D3 && (
                        <div className="border mx-2 rounded-lg p-2">
                          D3 : {`${job.D3}`}
                        </div>
                      )}
                      {job.D4 && (
                        <div className="border mx-2 rounded-lg p-2">
                          D4 : {`${job.D4}`}
                        </div>
                      )}
                    </div>
                    <div>Direction : {`${job.direction}`}</div>
                    <div>Specifications: {`${job.specifications}`}</div>
                    <div className="flex">
                      <a
                        href={`${job.imageUrl}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex text-black font-bold"
                      >
                        View Attachment <File />
                      </a>
                      <a
                        href={`../${job.plot}.png`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="hover:underline flex text-slate-800"
                      >
                        <img
                          src={`../${job.plot}.png`}
                          alt="gg"
                          width={150}
                          height={150}
                          className="m-2"
                        />
                      </a>
                    </div>
                  </div>
                  <div>
                    <div className="font-bold text-xl underline text-center">
                      Uploaded
                    </div>

                    {job.steps.map((step) => (
                      <div
                        key={step.id}
                        className="border-2 rounded-md p-4 m-3 hover:bg-slate-200"
                      >
                        <div>Comments : {step.comments}</div>
                        <div className="mb-3">Phase:{step.currentStep}</div>
                        Attachments:{" "}
                        {step.started && step.attachments !== null && (
                          <div className="mb-3"></div>
                        )}
                        {step.started && !step.completed && (
                          <div>
                            <div>
                              <Input
                                onChange={(e) => {
                                  setAttach(e.target.value);
                                }}
                              />
                              <Button
                                onClick={() => {
                                  addOnGmailText({
                                    jobId: step.jobId,
                                    text: attach,
                                  }).then((e) => {
                                    if (e) {
                                      if (e !== "Error") {
                                        window.location.reload();
                                      }
                                    }
                                  });
                                }}
                              >
                                Submit
                              </Button>
                            </div>
                            <div>{erro}</div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
        <TabsContent value="otherJobs">
          {otherJobs.map((job) => (
            <Card key={job.id} className="border-slate-400 w-[98vw]">
              <CardTitle>
                <CardHeader>{`${job.title}`}</CardHeader>
              </CardTitle>
              <CardContent>
                <div className="flex flex-wrap justify-around">
                  <div>
                    <div className="mx-2 rounded-lg p-2">{job.description}</div>
                  </div>
                  <div className="flex">
                    <a
                      href={`${job.imageUrl}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:underline flex text-black font-bold"
                    >
                      View Attachment <File />
                    </a>
                  </div>
                  {/* </div> */}
                  <div>
                    <div className="font-bold text-xl underline text-center">
                      {/* Uploaded */}
                      <PdfUploadFormForOtherJobs jobId={job.id} />
                      {/* <Button>Send To Client</Button> */}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AssignedPage;
