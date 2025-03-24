"use client";
// import { deleteNotPaid } from "@/_actions/deleteNotPaid";
import { getClientInteriorJobs } from "@/_actions/getClientaInteriorJobs";
import { getClientJobsWithSteps } from "@/_actions/getClientJobs";
import { getClientOtherJobs } from "@/_actions/getClientOtherJobs";
import { Loading2 } from "@/components/common/loader2";
// import { stepPercentages } from "@/components/common/trapPlot";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { File } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const ProjectPage = () => {
  const [isJob, setIsJob] = useState(false);
  const [otherJobs, setOtherJobs] = useState<
    {
      id: string;
      title: string;
      description: string;
      clientPrice: number;
      totalPrice: number;
      givenBy: string;
      imageUrl: string;
      published: boolean;
      paid: boolean;
      attachments: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);
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
      initialPayment: boolean;
    })[]
  >([]);
  const [interiorJobs, setInteriorJobs] = useState<
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
        totalSteps: number;
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
    })[]
  >([]);
  useEffect(() => {
    getClientJobsWithSteps().then((e) => {
      if (e) {
        if (e !== "Please login" && e !== "Wrong token, please login again!") {
          if (typeof e !== "string") {
            setIsJob(true);
            console.log(e);
            setJobs(e);
          }
        }
      }
    });
    getClientOtherJobs().then((e) => {
      if (e) {
        setLoading(false);
        if (e !== "Network Error") {
          if (e !== "Please login to continue") {
            setIsJob(true);
            setOtherJobs(e);
          }
        }
      }
    });
    getClientInteriorJobs().then((e) => {
      console.log("fd", e);
      if (e) {
        if (e !== "Network Error") {
          if (e !== "No jobs") {
            if (e !== "Wrong token, please login again!") {
              setIsJob(true);
              setInteriorJobs(e);
            }
          }
        }
      }
    });
  }, []);
  const handlePayment = async ({
    currentStep,
    price,
    stepId,
  }: {
    currentStep: number;
    price: number;
    stepId: string;
  }) => {
    let totalSteps = 2;
    // let stepAmount = request.totalAmount;
    if (price > 10000 && price < 20000) {
      totalSteps = 3;
    } else if (price > 20000) {
      totalSteps = 4;
    }
    // const stepAmount=amount*0.9;
    // if (totalSteps === 2) {
    //   stepAmount = amount * TwoStepsArr[step - 1];
    // } else if (totalSteps === 3) {
    //   stepAmount = amount * ThreeStepsArr[step - 1];
    // } else {
    //   stepAmount = amount * FourStepsArr[step - 1];
    // }
    if (currentStep > totalSteps) {
      alert("All payments are completed!");
      return;
    }
    // const stepPercentage = stepPercentages[currentStep - 1];
    // const stepAmount = Math.round((price * stepPercentage) / 100); // Calculate amount for this step

    try {
      // setIsProcessing(true);
      const currency = "INR";
      // Create order for the current step
      const response = await fetch("/api/payments/phonepe", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount: price,
          currency,
          step: currentStep,
          // totalSteps: steps,
          stepId: stepId,
        }),
      });
      const order = await response.json();
      if (!order) {
        console.error("Failed to create order");
        window.location.replace("/installments/failure");
        // return;
      }
      if (!order.message) {
        console.error("Failed to create order");
        window.location.replace("/installments/failure");
        // return;
      }
      window.location.href = `${order.message}`;
      // const options = {
      //   key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
      //   amount: order.amount,
      //   currency: order.currency,
      //   name: "Your Website Name",
      //   description: `Step ${currentStep} Payment`,
      //   order_id: order.id,
      //   handler: async (response: RazorpayPaymentResponse) => {
      //     // Verify payment
      //     const payment_id = response.razorpay_payment_id;
      //     const verificationResponse = await fetch(
      //       "/api/payments/payment-verification",
      //       {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           razorpay_order_id: response.razorpay_order_id,
      //           razorpay_payment_id: response.razorpay_payment_id,
      //           razorpay_signature: response.razorpay_signature,
      //         }),
      //       }
      //     );

      //     const verificationResult = await verificationResponse.json();

      //     if (verificationResult.success) {
      //       // console.log(verificationResponse);
      //       alert(`Step ${currentStep} payment successful!`);
      //       // setReceipts((prev) => [...prev, order.receipt]); // Add receipt to the list
      //       console.log(payment_id);
      //       const rece = await fetch("/api/payments/receipt", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({ payment_id: `${payment_id}` }),
      //       });
      //       // if (rece) {
      //       //   const receiptData = await rece.json();

      //       //   if (receiptData?.receiptUrl) {
      //       //     // Create a hidden anchor element to trigger the download
      //       //     const link = document.createElement("a");
      //       //     link.href = receiptData.receiptUrl; // Assuming receiptData.receiptUrl is the URL of the receipt file
      //       //     link.download = "receipt.pdf"; // You can modify the file name if needed
      //       //     document.body.appendChild(link);
      //       //     link.click(); // Programmatically click the link to download
      //       //     document.body.removeChild(link); // Clean up the link element
      //       //   }
      //       //   setReceipts(order.receipt);
      //       // }
      //       if (rece.ok) {
      //         const blob = await rece.blob(); // Get the response as a Blob (binary data)

      //         // Create a temporary download link for the Blob
      //         const link = document.createElement("a");
      //         const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
      //         link.href = url;
      //         link.download = "receipt.pdf"; // Set the default download file name
      //         link.click(); // Trigger the download
      //         window.URL.revokeObjectURL(url); // Clean up the URL object
      //       }
      // startStepProp({ id: stepId }).then((changed) => {
      //         if (changed) {
      //           if (changed === "Successfully strted the step") {
      //             window.location.reload();
      //           }
      //         }
      //       });
      //       // setCurrentStep((prevStep) => prevStep + 1); // Move to next step
      //     } else {
      //       alert("Payment verification failed!");
      //     }
      //   },
      //   prefill: {
      //     name: "John Doe",
      //     email: "john.doe@example.com",
      //     contact: "9999999999",
      //   },
      //   theme: {
      //     color: "#3399cc",
      //   },
      // };

      // const razorpay = new window.Razorpay(options);
      // razorpay.open();
      setLoading(true);
      return { success: "Payment started" };
    } catch (error) {
      console.error("Error initiating payment:", error);
      return { error: error };
    } finally {
      return { success: "Payment Completed" };
      // setIsProcessing(false);
    }
  };
  const handleInteriorPayment = async ({
    currentStep,
    price,
    stepId,
  }: {
    currentStep: number;
    price: number;
    stepId: string;
  }) => {
    // startInteriorStepProp({ id: stepId });
    // const stepPercentage = stepPercentages[currentStep - 1];
    // const stepAmount = Math.round((price * stepPercentage) / 100); // Calculate amount for this step

    let totalSteps = 2;
    // let stepAmount = request.totalAmount;
    if (price > 10000 && price < 20000) {
      totalSteps = 3;
    } else if (price > 20000) {
      totalSteps = 4;
    }
    // const stepAmount=amount*0.9;
    // if (totalSteps === 2) {
    //   stepAmount = amount * TwoStepsArr[step - 1];
    // } else if (totalSteps === 3) {
    //   stepAmount = amount * ThreeStepsArr[step - 1];
    // } else {
    //   stepAmount = amount * FourStepsArr[step - 1];
    // }
    if (currentStep > totalSteps) {
      alert("All payments are completed!");
      return;
    }
    // const stepPercentage = stepPercentages[currentStep - 1];
    // const stepAmount = Math.round((price * stepPercentage) / 100); // Calculate amount for this step

    try {
      // setIsProcessing(true);
      const currency = "INR";
      // Create order for the current step
      const response = await fetch("/api/payments/interior/step", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          totalAmount: price,
          currency,
          step: currentStep,
          // totalSteps: steps,
          stepId: stepId,
        }),
      });
      const order = await response.json();
      if (!order) {
        console.error("Failed to create order");
        window.location.replace("/interiorStatus/stepFailure");
        // return;
      }
      if (!order.message) {
        console.error("Failed to create order");
        window.location.replace("/interiorStatus/stepFailure");
        // return;
      }
      window.location.href = `${order.message}`;
      // const options = {
      //   key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
      //   amount: order.amount,
      //   currency: order.currency,
      //   name: "Your Website Name",
      //   description: `Step ${currentStep} Payment`,
      //   order_id: order.id,
      //   handler: async (response: RazorpayPaymentResponse) => {
      //     // Verify payment
      //     const payment_id = response.razorpay_payment_id;
      //     const verificationResponse = await fetch(
      //       "/api/payments/payment-verification",
      //       {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({
      //           razorpay_order_id: response.razorpay_order_id,
      //           razorpay_payment_id: response.razorpay_payment_id,
      //           razorpay_signature: response.razorpay_signature,
      //         }),
      //       }
      //     );

      //     const verificationResult = await verificationResponse.json();

      //     if (verificationResult.success) {
      //       // console.log(verificationResponse);
      //       alert(`Step ${currentStep} payment successful!`);
      //       // setReceipts((prev) => [...prev, order.receipt]); // Add receipt to the list
      //       console.log(payment_id);
      //       const rece = await fetch("/api/payments/receipt", {
      //         method: "POST",
      //         headers: { "Content-Type": "application/json" },
      //         body: JSON.stringify({ payment_id: `${payment_id}` }),
      //       });
      //       // if (rece) {
      //       //   const receiptData = await rece.json();

      //       //   if (receiptData?.receiptUrl) {
      //       //     // Create a hidden anchor element to trigger the download
      //       //     const link = document.createElement("a");
      //       //     link.href = receiptData.receiptUrl; // Assuming receiptData.receiptUrl is the URL of the receipt file
      //       //     link.download = "receipt.pdf"; // You can modify the file name if needed
      //       //     document.body.appendChild(link);
      //       //     link.click(); // Programmatically click the link to download
      //       //     document.body.removeChild(link); // Clean up the link element
      //       //   }
      //       //   setReceipts(order.receipt);
      //       // }
      //       if (rece.ok) {
      //         const blob = await rece.blob(); // Get the response as a Blob (binary data)

      //         // Create a temporary download link for the Blob
      //         const link = document.createElement("a");
      //         const url = window.URL.createObjectURL(blob); // Create a URL for the Blob
      //         link.href = url;
      //         link.download = "receipt.pdf"; // Set the default download file name
      //         link.click(); // Trigger the download
      //         window.URL.revokeObjectURL(url); // Clean up the URL object
      //       }
      // startStepProp({ id: stepId }).then((changed) => {
      //         if (changed) {
      //           if (changed === "Successfully strted the step") {
      //             window.location.reload();
      //           }
      //         }
      //       });
      //       // setCurrentStep((prevStep) => prevStep + 1); // Move to next step
      //     } else {
      //       alert("Payment verification failed!");
      //     }
      //   },
      //   prefill: {
      //     name: "John Doe",
      //     email: "john.doe@example.com",
      //     contact: "9999999999",
      //   },
      //   theme: {
      //     color: "#3399cc",
      //   },
      // };

      // const razorpay = new window.Razorpay(options);
      // razorpay.open();
      setLoading(true);
      return { success: "Payment started" };
    } catch (error) {
      console.error("Error initiating payment:", error);
      return { error: error };
    } finally {
      return { success: "Payment Completed" };
      // setIsProcessing(false);
    }
  };
  return loading ? (
    <div className="w-screen h-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div>
      {jobs && otherJobs ? (
        isJob ? (
          <div>
            <div className="flex justify-around items-center text-3xl font-bold text-center bg-[#e8be41]">
              <Image
                src="https://utfs.io/f/GH57qH88dIR1gpOxCqVwROfQm9tqMC4WryKaujx6YJVDkENz"
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
                  Welcome to your personalized project dashboard! Here, you can
                  easily view and manage all your projects. Stay organized,
                  track your progress, and quickly access project details from
                  one central location. Everything you need is just a click
                  away. Keep your projects on track!
                </div>
              </div>
            </div>
            <div className="bg-neutral-200">
              <div className="text-xl text-center">Exterior Plans</div>
              <div className="flex flex-wrap items-center justify-center">
                {jobs.map((job) => {
                  return (
                    <Card
                      key={job.id}
                      className="my-2 border-2 w-fit border-black opacity-90 m-2 hover:bg-[#fce7f3]  bg-[#ffe4e6] text-black shadow-xl h-full"
                    >
                      <CardTitle className="my-0 py-0 rounded-xl bg-white">
                        <CardHeader className="text-xl my-0 p-0 border-b-4 rounded-xl">
                          {/* <div className="flex"> */}
                          <div className="flex justify-center">
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
                          <div className="text-center">
                            {job.floors === 0
                              ? "Custom Job"
                              : `${job.floors} Floored ${job.type} Building`}
                          </div>
                          {/* </div> */}
                        </CardHeader>
                      </CardTitle>
                      <CardContent className="flex flex-wrap justify-center items-center gap-8 text-black py-0 font-semibold mt-2">
                        <div>
                          {/* <div>Plot : {`${job.plot}`}</div> */}
                          <div className="flex my-1 flex-wrap">
                            <div className="border border-black mx-2 rounded-lg p-2">
                              A : {`${job.A}`}
                            </div>
                            <div className="border border-black mx-2 rounded-lg p-2">
                              B : {`${job.B}`}
                            </div>
                            <div className="border border-black mx-2 rounded-lg p-2">
                              C : {`${job.C}`}
                            </div>
                            <div className="border border-black mx-2 rounded-lg p-2">
                              D : {`${job.D}`}
                            </div>
                            {job.E && job.E !== 0 && <div>E:{`${job.E}`}</div>}
                            {job.D1 && job.D1 !== 0 && (
                              <div className="border border-black mx-2 rounded-lg p-2">
                                D1 : {`${job.D1}`}
                              </div>
                            )}
                            {job.D2 && job.D2 !== 0 && (
                              <div className="border border-black mx-2 rounded-lg p-2">
                                D2 : {`${job.D2}`}
                              </div>
                            )}
                            {job.D3 && job.D3 !== 0 && (
                              <div className="border border-black mx-2 rounded-lg p-2">
                                D3 : {`${job.D3}`}
                              </div>
                            )}
                            {job.D4 && job.D4 !== 0 && (
                              <div className="border border-black mx-2 rounded-lg p-2">
                                D4 : {`${job.D4}`}
                              </div>
                            )}
                          </div>
                          <div className="pl-3">
                            Direction : {`${job.direction}`}
                          </div>
                          <div className="pl-3">
                            Specifications: {`${job.specifications}`}
                          </div>
                          {job.price !== 0 && (
                            <div className="pl-3">
                              Total price: Rs. {job.price}
                            </div>
                          )}
                          {/* {job.completed && ( */}
                          <div className="pl-3">
                            Completed : {`${job.completed}`}
                          </div>
                          {/* )} */}
                          <div className="pl-3">
                            Current Phase :
                            {job.steps.map((e) => {
                              if (e.completed !== true) return e.currentStep;
                            })}{" "}
                          </div>
                          {job.imageUrl && (
                            <a
                              href={`${job.imageUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline flex text-black font-bold"
                            >
                              View Attachment <File />
                            </a>
                          )}
                          <div className="overflow-y-scroll md:w-[30vw] w-[60vw] h-[30vh] ">
                            Details:
                            {job.steps.map((step) => (
                              <Card key={step.id} className="m-2">
                                <CardHeader>
                                  <CardTitle>
                                    Phase:{step.currentStep}
                                  </CardTitle>
                                </CardHeader>
                                <CardContent>
                                  <div>Started : {`${step.started}`}</div>
                                  <div>Completed: {`${step.completed}`}</div>
                                  {step.attachments && (
                                    <Dialog>
                                      <DialogTrigger className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md my-2">
                                        {" "}
                                        View Document
                                      </DialogTrigger>
                                      <DialogContent>
                                        <DialogHeader>
                                          <DialogTitle></DialogTitle>
                                        </DialogHeader>
                                        <iframe
                                          src={step.attachments!}
                                          width="100%"
                                          height="600px"
                                          style={{ border: "none" }}
                                          title="PDF Viewer"
                                        />
                                      </DialogContent>
                                    </Dialog>
                                  )}

                                  {!step.started && (
                                    <Button
                                      className="bg-blue-600 hover:bg-blue-700 w-full text-xs my-2"
                                      onClick={() => {
                                        handlePayment({
                                          currentStep: step.currentStep,
                                          price: job.price,
                                          stepId: step.id,
                                        }).then((e) => {
                                          if (
                                            e?.success === "Payment Successful"
                                          ) {
                                            console.log("done");
                                          }
                                        });
                                      }}
                                    >
                                      Pay now to start Phase{" "}
                                      {`${step.currentStep}`}
                                    </Button>
                                  )}
                                </CardContent>
                              </Card>
                            ))}
                          </div>
                        </div>
                        <div className="flex items-center gap-3"></div>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
              <div>
                <div className="text-xl text-center border-t-2 border-black">
                  Interior Plans
                </div>
                <div className="flex flex-wrap items-center justify-center">
                  {interiorJobs.map((job) => {
                    return (
                      <Card
                        // </div>
                        key={job.id}
                        className="my-2 border-4 opacity-90 hover:bg-slate-100 text-black h-full p-4"
                      >
                        <CardTitle className="my-0 py-0">
                          <CardHeader className="text-xl my-0 pb-0">
                            {/* <div className="flex"> */}
                            <div>{`Interior ${job.property} Building`}</div>
                            {/* </div> */}
                          </CardHeader>
                        </CardTitle>
                        <CardContent className="flex-col  justify-center items-center text-black py-0 font-semibold">
                          <div className="flex flex-col gap-4">
                            {/* <div>Plot : {`${job.plot}`}</div> */}

                            <div className="pl-3">
                              Specifications: {`${job.specifications}`}
                            </div>
                            <div className="pl-3">
                              Total price: Rs. {job.price}
                            </div>
                            <div className="pl-3">
                              Current Phase :
                              {job.steps.map((e) => {
                                if (e.totalSteps < e.currentStep) {
                                  return "Completed";
                                }
                                if (e.completed !== true) return e.currentStep;
                              })}{" "}
                            </div>
                            <div className="pl-3">
                              Completed : {`${job.completed}`}
                            </div>
                            <a
                              href={`${job.imageUrl}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="hover:underline flex text-black font-bold"
                            >
                              View Attachment <File />
                            </a>
                            <div className="overflow-y-scroll md:w-[30vw] w-[60vw] h-[30vh]">
                              Details:
                              {job.steps.map(
                                (step) =>
                                  step.currentStep < 5 && (
                                    <Card
                                      key={step.id}
                                      className="m-2 bg-slate-200"
                                    >
                                      <CardHeader>
                                        <CardTitle className="">
                                          Phase:{step.currentStep}
                                        </CardTitle>
                                      </CardHeader>
                                      <CardContent>
                                        <div>Started : {`${step.started}`}</div>
                                        <div>
                                          Completed: {`${step.completed}`}
                                        </div>
                                        {step.attachments && (
                                          <Dialog>
                                            <DialogTrigger className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md my-2">
                                              {" "}
                                              View Document
                                            </DialogTrigger>
                                            <DialogContent>
                                              <DialogHeader>
                                                <DialogTitle></DialogTitle>
                                              </DialogHeader>
                                              <iframe
                                                src={step.attachments!}
                                                width="100%"
                                                height="600px"
                                                style={{ border: "none" }}
                                                title="PDF Viewer"
                                              />
                                            </DialogContent>
                                          </Dialog>
                                        )}
                                        {!step.started && (
                                          <Button
                                            className="bg-blue-600 hover:bg-blue-700 m-2"
                                            onClick={() => {
                                              handleInteriorPayment({
                                                currentStep: step.currentStep,
                                                price: Number(job.price),
                                                stepId: step.id,
                                              }).then((e) => {
                                                if (
                                                  e?.success ===
                                                  "Payment Successful"
                                                ) {
                                                  console.log("done");
                                                }
                                              });
                                            }}
                                          >
                                            Pay now to start Phase{" "}
                                            {`${step.currentStep}`}
                                          </Button>
                                        )}
                                      </CardContent>
                                    </Card>
                                  )
                              )}
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>

              <div>
                {otherJobs.map((otherJob) => (
                  <Card key={otherJob.id}>
                    <CardHeader>
                      <CardTitle>{otherJob.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div>{otherJob.description}</div>
                      {otherJob.attachments !== "" && (
                        <div>
                          <Dialog>
                            <DialogTrigger className="bg-green-500 hover:bg-green-600 text-white p-2 rounded-md my-2">
                              {" "}
                              View Document
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle></DialogTitle>
                              </DialogHeader>
                              <iframe
                                src={otherJob.attachments!}
                                width="100%"
                                height="600px"
                                style={{ border: "none" }}
                                title="PDF Viewer"
                              />
                            </DialogContent>
                          </Dialog>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="flex w-screen h-screen justify-center items-center">
            You have not given any projects
            <Button>Assign project</Button>
          </div>
        )
      ) : (
        <div>No jobs</div>
      )}
    </div>
  );
};

export default ProjectPage;
