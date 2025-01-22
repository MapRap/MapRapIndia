"use client";
import { assignOtherjob } from "@/_actions/assignOtherjob";
import { getOtherJobs } from "@/_actions/getOtherJobs";
import { onOtherJobDelete } from "@/_actions/onOtherJobDelete";
import { otherJobPdf } from "@/_actions/otherJobPdf";
import { publishOtherJob } from "@/_actions/publishOtherJob";
import { unPublishOtherJob } from "@/_actions/unPublishOtherJob";
// import { AlertDialogHeader } from "@/components/ui/alert-dialog";
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

const OtherJobsAdminPage = () => {
  const [otherJobs, setOtherJobs] = useState<
    ({
      requests: {
        id: string;
        gmail: string;
        phone: string;
        otherJobId: string;
        by: string;
        approved: boolean;
        attachment: string;
      }[];
    } & {
      id: string;
      title: string;
      description: string;
      clientPrice: number;
      totalPrice: number;
      givenBy: string;
      imageUrl: string;
      published: boolean;
      paid: boolean;
    })[]
  >([]);
  const [totalPrice, setTotalPrice] = useState(0);
  useEffect(() => {
    getOtherJobs().then((e) => {
      if (e) {
        if (e !== "No Jobs") {
          // console.log(e);
          e.map((job) => {
            setOtherJobs((prevJobs) => {
              const exists = prevJobs.find((j) => j.id === job.id);
              if (exists) return prevJobs;
              return [...prevJobs, job];
            });
          });
        }
      }
    });
  }, [otherJobs, setOtherJobs]);
  const publishOtherJobs = async ({ OtherId }: { OtherId: string }) => {
    try {
      const data = await publishOtherJob({
        id: OtherId,
        totalPrice: totalPrice,
      });
      if (!data) {
        console.log("Error");
      } else if (data === "Timeout! Please try again") {
        console.log(data);
      } else if (data === "success") {
        return data;
      }
    } catch (err) {
      console.log(err);
    }
  };
  const unPubOther = async ({ id }: { id: string }) => {
    try {
      const success = await unPublishOtherJob({ id: id });
      if (!success) {
        console.log("Error");
      } else if (success === "Error! Please try again") {
        console.log(success);
      } else if (success === "success") {
        return success;
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteOther = async ({ id }: { id: string }) => {
    try {
      const result = await onOtherJobDelete({ id });
      if (result === "Error! Please try again") {
        console.log("error");
      } else if (result === "Succefully deleted painting") {
        window.location.reload();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      {/* <TabsContent value="other"> */}
      {otherJobs.length === 0
        ? "No Other Jobs"
        : otherJobs.map((other) => (
            <div key={other.id}>
              <Drawer>
                <DrawerTrigger className="font-bold">
                  {" "}
                  {other.title}
                </DrawerTrigger>
                <DrawerContent className="h-[90vh]">
                  <DrawerHeader>
                    <DrawerTitle></DrawerTitle>
                  </DrawerHeader>
                  <div className="p-0 h-full">
                    <Card className="h-full overflow-scroll">
                      <CardHeader>
                        <CardTitle>{other.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div>{other.description}</div>
                        <div>
                          <Image
                            src={`${other.imageUrl}`}
                            width={300}
                            height={300}
                            alt="painting"
                          />
                        </div>
                        <div className="my-2">
                          Client price : Rs {other.clientPrice}
                        </div>
                        <div className="my-2">
                          Total price : Rs {other.totalPrice}
                        </div>
                        <div className="my-2">Paid : {`${other.paid}`}</div>
                        <div className="my-2 overflow-scroll h-[20vh]">
                          Requests :{" "}
                          {other.requests.map((request) => (
                            <div key={request.id} className="flex-col">
                              <div>
                                Approved :{" "}
                                {request.approved &&
                                  ` ${request.gmail} | ${request.phone}`}
                              </div>
                              <div>
                                <Dialog>
                                  <DialogTrigger className="p-2 text-white rounded-xl hover:bg-blue-700 bg-blue-600">
                                    {`${request.gmail}`}
                                  </DialogTrigger>
                                  <DialogContent>
                                    <DialogHeader>
                                      <DialogTitle>
                                        Gmail : {request.gmail} | Phone :{" "}
                                        {request.phone}
                                        <div>
                                          <Button
                                            onClick={() => {
                                              assignOtherjob({
                                                id: request.id,
                                              }).then((e) => {
                                                if (e) {
                                                  if (e === "Success") {
                                                    window.location.reload();
                                                  }
                                                }
                                              });
                                            }}
                                          >
                                            Assign
                                          </Button>
                                        </div>
                                      </DialogTitle>
                                    </DialogHeader>
                                  </DialogContent>
                                </Dialog>
                              </div>
                            </div>
                          ))}
                        </div>
                        <Input
                          className="hover:border-slate-400"
                          placeholder="Add price"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            setTotalPrice(value);
                          }}
                        />
                        {other.published === false ? (
                          <Button
                            className="bg-blue-700 hover:bg-blue-800 m-2"
                            onClick={() => {
                              publishOtherJobs({
                                OtherId: other.id,
                              }).then((e) => {
                                if (e === "success") {
                                  window.location.reload();
                                }
                              });
                            }}
                          >
                            Publish Job
                          </Button>
                        ) : (
                          <Button
                            className="m-2 bg-red-600 hover:bg-red-700"
                            onClick={() => {
                              unPubOther({ id: other.id }).then((e) => {
                                if (e === "success") {
                                  window.location.reload();
                                }
                              });
                            }}
                          >
                            Unpublish Job
                          </Button>
                        )}
                        <Button
                          className="m-2 bg-red-600 hover:bg-red-700"
                          onClick={() => {
                            onDeleteOther({ id: other.id });
                          }}
                        >
                          Delete Job
                        </Button>
                        <div>
                          {other.requests.map((request) => {
                            if (request.approved === true) {
                              console.log(request.attachment);
                              if (request.attachment !== "") {
                                return (
                                  <div key={request.id}>
                                    <Button
                                      onClick={() => {
                                        otherJobPdf({
                                          id: request.otherJobId,
                                          pdf: request.attachment,
                                        }).then((e) => {
                                          if (e) {
                                            if (e === "Success") {
                                              window.location.reload();
                                            }
                                          }
                                        });
                                      }}
                                      className="mb-4"
                                    >
                                      Send to client
                                    </Button>
                                  </div>
                                );
                              }
                            }
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </DrawerContent>
              </Drawer>
            </div>
          ))}
      {/* </TabsContent> */}
    </div>
  );
};

export default OtherJobsAdminPage;
