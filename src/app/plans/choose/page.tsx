"use client";
import { createFirstInteriorStep } from "@/_actions/createFirstInteriorStep";
// import { createFirstInteriorStep } from "@/_actions/CreateFirstInteriorStep";
import { createInterioJob } from "@/_actions/createInteriorPlan";
// import { getClientJobsWithSteps } from "@/_actions/getClientJobs";
// import { getId } from "@/_actions/getId";
import FileUpload from "@/components/common/fileUpload";
import { Loading2 } from "@/components/common/loader2";
// import { InteriorPdfUploadForm } from "@/components/common/interiorDesignUploadForm";
// import { RazorpayPaymentResponse } from "@/components/common/trapPlot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { FormLabel } from "@/coaaaaaaaaaaaaaamponents/ui/form";
import { Input } from "@/components/ui/input";
// import { useUploadThing } from "@/lib/uploadthing";
import { useSession } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import React, { Suspense, useEffect, useState, useTransition } from "react";

// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
//   }
// }

// const stepPayments = [25, 25, 25, 25];

// interface RazorpayOptions {
//   key: string;
//   amount: number;
//   currency: string;
//   name?: string;
//   description?: string;
//   order_id: string;
//   prefill?: {
//     name?: string;
//     email?: string;
//     contact?: string;
//   };
//   theme?: {
//     color?: string;
//   };
//   handler?: (response: RazorpayPaymentResponse) => void;
// }

// interface RazorpayInstance {
//   open: () => void;
// }
const ChooseAraePage = () => {
  // const [jobs, setJobs] = useState<
  //   {
  //     id: string;
  //     type: string;
  //     direction: string;
  //     floors: number;
  //     price: number;
  //     plot: string;aaaaaaaaaaaaaaaaaaaaaaaaaa
  //     specifications: string | null;
  //     imageUrl: string;
  //     A: number;
  //     B: number;
  //     C: number;
  //     D: number;
  //     E: number | null;
  //     D1: number | null;
  //     D2: number | null;
  //     D3: number | null;
  //     D4: number | null;
  //     givenBy: string;
  //     isVerified: boolean | null;
  //     assignedTo: string | null;
  //     completed: boolean;
  //     publishable: boolean;
  //     area: string;
  //   }[]
  // >([]);
  const [currency] = useState("INR");
  const [loading, setLoading] = useState(true);
  const [specifications, setSpecifications] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [isPending, startTransition] = useTransition();
  const [area, setArea] = useState(0);
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
  // const { startUpload } = useUploadThing("pdfUploader");
  const searchParams = useSearchParams();
  const session = useSession();
  useEffect(() => {
    // getId().then((e) => {
    //   if (e) {
    //     setLoading(false);
    //     if (e !== "/unauthorized") {
    //       setUser(e);
    //     }
    //   }
    // });
    if (session) {
      setLoading(false);
    }
  }, []);
  const handleSub = async () => {
    startTransition(async () => {
      await handlePayment();
    });
  };
  const handlePayment = async () => {
    try {
      if (session.data) {
        if (session.data.user.id !== undefined) {
          // })
          // if (job) {
          // let area: string | undefined;
          // if (job?.type === searchParams.get("property")) {
          // if (job.area !== "") {
          // for (const key in areaList) {
          //   if (key === job.area) {
          //     area = `${areaList[key as keyof typeof areaList]}`;
          //   }
          // }
          if (area !== 0) {
            let steps = 2;
            if (
              Number(searchParams.get("price")) > 10000 &&
              Number(searchParams.get("price")) < 20000
            ) {
              steps = 3;
            }
            if (Number(searchParams.get("price")) > 20000) {
              steps = 4;
            }
            // const newArea = Number(area);
            // if (newArea !== 0) {
            // console.log();
            const totalPrice = Number(searchParams.get("price")) * area;
            // console.log("Area", totalPrice);

            createInterioJob({
              userId: session.data.user.id!,
              name: session.data.user.name!,
              property: searchParams.get("property") || "Residential",
              plan: searchParams.get("title") || "platinum",
              specifications: specifications || "",
              price: totalPrice.toString(),
              imageUrl: imageUrl,
              area: `${area}` || "1400",
            }).then((e) => {
              if (e) {
                if (e !== "Error") {
                  createFirstInteriorStep({
                    jobId: e.id,
                    type: `${e.property} ${e.plan}`,
                    steps: steps,
                    // receipt: uploadedFiles[0].url,
                  }).then(async (res) => {
                    if (res) {
                      if (res !== "Error") {
                        const response = await fetch(
                          "/api/payments/interior/start",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                            },
                            body: JSON.stringify({
                              totalAmount: totalPrice,
                              currency,
                              step: 1,
                              totalSteps: steps,
                              jobId: e.id,
                            }),
                          }
                        );
                        const order = await response.json();
                        // console.log(order);
                        if (!order) {
                          console.error("Failed to create order");
                          window.location.replace("/interiorStatus/failure");
                          // return;
                        }
                        if (!order.message) {
                          console.error("Failed to create order");
                          window.location.replace("/interiorStatuss/failure");
                        }
                        window.location.href = `${order.message}`;
                      }
                    }
                  });
                }

                setLoading(true);
                return { success: "Payment started" };
                // }
              } else {
                setMessage("Please enter valid area");
              }
            });
          }
        }
      }
      if (!session.data?.user) {
        console.log("hey");
        setMessage("Please Login to continue!");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      return { error: error };
    } finally {
      // setIsProcessing(false);
    }
  };
  return loading ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div>
      {/* <Suspense fallback={<div>Loading...</div>}> */}
      {/* {jobs.length === 0 ? (
        <div>You have not assigned a job Please assign a job to continue</div>
      ) : ( */}
      {/* jobs.map((job) => { */}
      {/* if (job.type === searchParams.get("property")) */}
      {/* return ( */}
      <div>
        <Card className="m-4">
          <CardHeader>
            <CardTitle>
              <div className="m-2">Enter area of your plot {"(in feet)"}</div>
              <Input
                placeholder="Area"
                onChange={(e) => {
                  const value = e.target.value ? Number(e.target.value) : 0;
                  setArea(value);
                }}
                className="m-4"
              />
              <div className="m-2">Enter specifications afor your building</div>
              <Input
                placeholder="Specifications"
                onChange={(e) => {
                  setSpecifications(e.target.value);
                }}
                className="m-4"
              />
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div>{searchParams.get("property")} Building</div>
            <div>Price : Rs. {searchParams.get("price")} / sq. Feet</div>
            {/* <Button className="m-2" onClick={()=>{
              setTotalPrice(Number(searchParams.get("price"))*Number())
            }}>Calculate Total Price</Button> */}
            <div>
              Total Price : Rs. {`${Number(searchParams.get("price")) * area}`}{" "}
              / sq. Feet
            </div>
            <div>
              <FileUpload
                endPoint="imageUploader"
                onChange={(e) => {
                  if (e) {
                    setImageUrl(e);
                  }
                }}
                value={imageUrl}
                setImageUrl={setImageUrl}
              />
            </div>
            <Button
              className="bg-blue-600 hover:bg-blue-700 m-2"
              disabled={isPending}
              onClick={async () => {
                if (searchParams.get("price")) {
                  await handleSub();
                  // handlePayment({
                  //   price: Number(searchParams.get("price")),
                  // });
                }
              }}
            >
              Pay
            </Button>
            <div
              className={`text-red-600 m-2 text-sm ${
                message === "Please Login to continue!"
                  ? "cursor-pointer hover:underline"
                  : ""
              }`}
              onClick={() => {
                if (message === "Please Login to continue!") {
                  window.location.replace("/");
                }
              }}
            >
              {message}
            </div>
          </CardContent>
        </Card>
      </div>
      {/* ); */}
      {/* })
       )} */}
      {/* </Suspense> */}
    </div>
  );
};

const ChooseAraePageWithSuspense = () => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChooseAraePage />
    </Suspense>
  );
};

export default ChooseAraePageWithSuspense;
