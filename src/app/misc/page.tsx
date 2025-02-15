"use client";
import { addOtherJob } from "@/_actions/addOtherJob";
// import { addPainting } from "@/_actions/addPaintings";
// import { getId } from "@/_actions/getId";
import { getOtherJobs } from "@/_actions/getOtherJobs";
import { requestOtherJob } from "@/_actions/requestOtherJob";
// import { getPaintings } from "@/_actions/getPaintings";
// import { changeToPaid } from "@/_actions/paintingPaid";
// import { unPubliashPainting } from "@/_actions/unpublicPainting";
import FileUpload from "@/components/common/fileUpload";
import FormError from "@/components/common/formError";
import FormSuccess from "@/components/common/formSuccess";
import { Loading2 } from "@/components/common/loader2";
// import { PdfUploadForm } from "@/components/common/pdfUploadForm";
// import { RazorpayPaymentResponse } from "@/components/common/trapPlot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUploadThing } from "@/lib/uploadthing";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler?: (response: RazorpayPaymentResponse) => void;
}

export interface RazorpayPaymentResponse {
  razorpay_payment_id: string;
  razorpay_order_id: string;
  razorpay_signature: string;
}

interface RazorpayInstance {
  open: () => void;
}

const MiscPage = () => {
  const router = useRouter();
  const [img, setImageUrl] = useState<string>("");
  const [z, setZ] = useState(true);
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
  // }>();
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [currency] = useState("INR");
  const { startUpload } = useUploadThing("pdfUploader");
  const [jobs, setJobs] = useState<
    ({
      requests: {
        id: string;
        by: string;
        otherJobId: string;
        approved: boolean;
      }[];
    } & {
      id: string;
      givenBy: string;
      imageUrl: string;
      title: string;
      description: string;
      clientPrice: number;
      totalPrice: number;
      published: boolean;
      paid: boolean;
    })[]
  >([]);
  const [title, setTitle] = useState<string | undefined>();
  const [description, setDescription] = useState<string | undefined>();
  const [price, setPrice] = useState<number | undefined>(0);
  const session = useSession();
  useEffect(() => {
    setInterval(() => {
      if (
        message ===
        "You have already made a request! Please wait for the request to get approved"
      ) {
        setTimeout(() => {
          setMessage("");
        }, 4000);
      }
    }, 1000);
    getOtherJobs().then((e) => {
      if (e) {
        setLoading(false);
        if (e !== "No Jobs") {
          e.map((j) => {
            setJobs((prevJobs) => {
              const exists = prevJobs.find((job) => job.id === j.id);
              if (exists) return prevJobs;
              return [...prevJobs, j];
            });
          });
        }
      }
    });
    // getId().then((e) => {
    //   if (e === "/unauthorized") {
    //     console.log(e);
    //     // router.push("/unauthorized");
    //   } else {
    //     setUser(e);
    //   }
    // });
  }, []);
  const handlePayment = async ({ price }: { price: number }) => {
    if (session.data?.user) {
      try {
        if (!title || !description || !price || price === 0 || img === "") {
          setError("Please fill all the details");
        } else {
          const response = await fetch("/api/payments/create-order", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              totalAmount: 1000 * price,
              currency,
              step: 1,
            }),
          });

          const order = await response.json();

          if (!order.id) {
            console.error("Failed to create order:", order);
            return;
          }

          // Razorpay options
          const options = {
            key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
            amount: order.amount,
            currency: order.currency,
            name: "Make My Naksha",
            description: `Step ${1} Payment`,
            order_id: order.id,
            handler: async (response: RazorpayPaymentResponse) => {
              // Verify payment
              const payment_id = response.razorpay_payment_id;
              const verificationResponse = await fetch(
                "/api/payments/payment-verification",
                {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    razorpay_order_id: response.razorpay_order_id,
                    razorpay_payment_id: response.razorpay_payment_id,
                    razorpay_signature: response.razorpay_signature,
                  }),
                }
              );

              const verificationResult = await verificationResponse.json();
              console.log(verificationResult);

              if (verificationResult.success) {
                alert(`Payment successful!`);
                setLoading(true);
                fetch("/api/payments/receipt", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    payment_id: `${payment_id}`,
                  }),
                }).then((rece) => {
                  if (rece.ok) {
                    rece.blob().then((blob) => {
                      // Create a temporary download link for the Blob
                      const file = new File(
                        [blob],
                        `receipt-${session.data.user?.email}1.pdf`,
                        {
                          type: "application/pdf",
                        }
                      );
                      try {
                        startUpload([file]).then((uploadedFiles) => {
                          if (uploadedFiles && uploadedFiles[0]) {
                            console.log(
                              "File uploaded successfully:",
                              uploadedFiles[0].url
                            );
                            onSubmit().then(() => {});
                            // unPublishOtherJob({ id: id }).then((res) => {
                            //   if (res) {
                            //     if (res === "Error! Please try again") {
                            //       console.log("Error");
                            //     } else if (res === "success") {
                            //       // console.log()
                            //       changeOtherJobToPaid({ id }).then((paid) => {
                            //         if (paid === "Error! Please try again") {
                            //           console.log(paid);
                            //         } else if (paid === "Success") {
                            //           window.location.reload();
                            //         }
                            //       });
                            //     }
                            //   }
                            // });
                            // router.push(
                            //   `${window.location.pathname}/success?receipt=${uploadedFiles[0].url}`
                            // );
                          } else {
                            console.error("File upload failed");
                          }
                        });
                      } catch (error) {
                        console.error("Error uploading file:", error);
                      }
                    });
                  }
                });
              } else {
                alert("Payment verification failed!");
              }
            },
            prefill: {
              name: session.data.user.name!,
              email: `${session.data.user.email}`,
            },
            theme: {
              color: "#3399cc",
            },
          };

          const razorpay = new window.Razorpay(options);
          setZ(false);
          razorpay.open();
          return { success: "Payment started" };
        }
      } catch (error) {
        console.error("Error initiating payment:", error);
        return { error: error };
      } finally {
        // setIsProcessing(false);
      }
    }
  };
  const onSubmit = async () => {
    // console.log("KEn");
    if (!title || !description || !price || price === 0 || img === "") {
      setError("Please fill all the details");
    } else {
      // handlePayment({ price }).then(async (res) => {
      // if (res) {
      // console.log(res);
      // if (res.success) {
      const job = await addOtherJob({
        title,
        description,
        clientPrice: price,
        imageUrl: img,
      });
      if (!job) {
        setError("Network Error");
      } else if (job === "/unauthorized") {
        router.push("/unauthorized");
      } else if (job === "Error") {
        setError("Error! please try again");
      } else {
        console.log(job);
        setSuccess(
          "We have sent your painting for review! It will be soon be available"
        );
        setTimeout(() => {
          window.location.reload();
        }, 3000);
      }
      // }
      // }
      // });
    }
  };
  return loading ? (
    <div className="flex w-screen h-screen items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div>
      <div className="bg-[#b4cbc6] flex justify-around p-3 m-2 rounded-xl">
        <div>
          <Image
            src={`https://utfs.io/f/GH57qH88dIR197OPwWiqxReFDNpfQ6Xd8UbsBWthuVMHol5r`}
            width={300}
            height={300}
            alt="Painting"
          />
        </div>
        <div className="flex flex-col items-center justify-center">
          <div className="font-bold text-2xl w-[30vw] text-center">
            Discover All Types of Jobs in One Place : Your Ultimate Career Hub!
          </div>
          <div className="w-[35vw] text-center pt-2 text-sm">
            Explore endless career opportunities all in one place! From
            full-time jobs and part-time roles to internships and freelance
            projects, we bring every type of job together to match your
            aspirations. Your dream career starts here!
          </div>
          <Drawer>
            <DrawerTrigger className="m-2 bg-blue-700 hover:bg-blue-800 text-white p-2 cursor-pointer rounded-lg">
              {/* <Button className="m-2 bg-blue-70 hover:bg-blue-800"> */}
              Add Job
              {/* </Button>aaaaa */}
            </DrawerTrigger>
            <DrawerContent className={`h-4/5 ${z ? "z-50" : "z-10"}`}>
              <DrawerHeader>
                <DrawerTitle>Give details of your job</DrawerTitle>
              </DrawerHeader>
              <div className="m-2">
                <Input
                  onChange={(e) => {
                    setTitle(e.target.value);
                  }}
                  className="my-2 hover:border-slate-400"
                  placeholder="Enter title for the job"
                />
                <Textarea
                  onChange={(e) => {
                    setDescription(e.target.value);
                  }}
                  className="my-2 hover:border-slate-400"
                  placeholder="Enter description for the job"
                />
                <Input
                  placeholder="Enter price of the job in Indian Rupees"
                  type="number"
                  // disabled={isPending}
                  className="hover:border-slate-400 my-2"
                  onChange={(e) => {
                    const value = e.target.value ? Number(e.target.value) : 0;
                    // console.log(value);
                    setPrice(value);
                  }}
                />
                {/* <Button
                  className="bg-green-600 hover:bg-green-700 m-2 w-[10vw]"
                  onClick={() => {
                    if (price) {
                      handlePayment({
                        price: price,
                      });
                    }
                  }}
                >
                  Pay <ArrowRight />
                </Button> */}
                <FileUpload
                  endPoint="imageUploader"
                  onChange={(e) => {
                    if (e) {
                      setImageUrl(e);
                    }
                  }}
                  value={img}
                  setImageUrl={setImageUrl}
                />
                <FormSuccess message={success} />
                <FormError message={error} />
                <div className="flex justify-center">
                  <Button
                    className=""
                    onClick={() => {
                      if (price) {
                        handlePayment({ price: price }).then((e) => {
                          console.log(e);
                        });
                      }
                    }}
                  >
                    Add job
                  </Button>
                </div>
              </div>
            </DrawerContent>
          </Drawer>
        </div>
      </div>
      {jobs.length === 0 ? (
        <div className="text-center">No Other Jobs</div>
      ) : (
        jobs.map(
          (job) =>
            job.published === true && (
              <Card key={job.id} className="flex justify-around">
                <CardHeader>
                  <CardTitle>
                    <div className="m-2">{job.title}</div>
                    <Image
                      src={job.imageUrl}
                      width={190}
                      height={190}
                      alt={`${job.id}`}
                    />
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex justify-center items-center">
                  <div className="">
                    <div>{job.description}</div>
                    <div className="underline">Price : Rs {job.totalPrice}</div>
                  </div>
                </CardContent>
                <div className="flex items-center justify-center">
                  <Button
                    className="bg-green-600 hover:bg-green-700 m-2 w-[10vw]"
                    onClick={() => {
                      if (session.data?.user) {
                        // job.requests.map((request) => {
                        //   if (request.by === user.id) {
                        //     setMessage(
                        //       "You have already made a request! Please wait for the request "
                        //     );
                        //   }
                        // });
                        if (message === "") {
                          requestOtherJob({
                            id: job.id,
                            userId: session.data.user.id!,
                            gmail: session.data.user.email!,
                          }).then((e) => {
                            if (e) {
                              if (e === "Success") {
                                window.location.reload();
                              } else if (
                                e ===
                                "You have already made a request! Please wait for the request to get approved"
                              ) {
                                setMessage(e);
                              }
                            }
                          });
                        }
                      }
                      if (!session.data?.user) {
                        setMessage("Please login to continue");
                      }
                    }}
                  >
                    Request Job
                  </Button>
                  <div
                    className={`text-red-600 text-center text-sm w-[20vw] ${
                      message === "Please login to continue"
                        ? "hover:underline cursor-pointer"
                        : ""
                    }`}
                    onClick={() => {
                      if (message === "Please login to continue") {
                        window.location.replace("/");
                      }
                    }}
                  >
                    {message}
                  </div>
                </div>
              </Card>
            )
        )
      )}
    </div>
  );
};

export default MiscPage;
