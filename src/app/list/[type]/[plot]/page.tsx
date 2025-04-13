"use client";
import * as z from "zod";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { QuerySchema2, RectanglePlotSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRightIcon, CaretSortIcon } from "@radix-ui/react-icons";
import { Textarea } from "@/components/ui/textarea";
import FileUpload from "@/components/common/fileUpload";
import TrapPlot, { stepPercentages } from "@/components/common/trapPlot";
import { createJob } from "@/_actions/createJob";
import { getClientJobsWithSteps } from "@/_actions/getClientJobs";
import PentaPlot from "@/components/common/pentaPlot";
import { getRealUsers } from "@/_actions/getRealUsers";
import { Button } from "@/components/ui/button";
// import { useUploadThing } from "@/lib/uploadthing";
import { createStep } from "@/_actions/createStep";
import { Loading2 } from "@/components/common/loader2";
import { ArrowDownIcon, CheckIcon } from "lucide-react";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
// import React, { useState } from "react";
// import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
// import { useForm } from "react-hook-form";
// import { QuerySchema } from "@/lib";
// import * as z from "zod";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
// import { Input } from "../ui/input";
// import { Textarea } from "../ui/textarea";
// import { Button } from "../ui/button";
// import axios from "axios";
// import FormSuccess from "./formSuccess";
// import FormError from "./formError";
import { cn } from "@/lib/utils";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { createSiteVisit } from "@/_actions/createSiteVisit";
import SiteVisitComp from "@/components/common/siteVisit";
// import QueryForm from "@/components/common/queryForm";
import {
  Dialog,
  DialogContent,
  // DialogDescription,
  DialogHeader,
  DialogTitle,
  // DialogTrigger,
} from "@/components/ui/dialog";
// import UserForm from "@/components/common/userForm";
// import Image from "next/image";
type tParams = Promise<{ plot: string; type: string }>;

const directions = [
  {
    value: "north",
    label: "North",
  },
  {
    value: "south",
    label: "South",
  },
  {
    value: "east",
    label: "East",
  },
  {
    value: "west",
    label: "West",
  },
  {
    value: "northwest",
    label: "NorthWest",
  },
  {
    value: "southwest",
    label: "SouthWest",
  },
  {
    value: "northeast",
    label: "NorthEast",
  },
  {
    value: "southeast",
    label: "SouthEast",
  },
];
type FormValues = {
  A: number;
  B: number;
  floor: number;
  C: number;
  D: number;
  specifications: string | undefined;
  direction: string | undefined;
  phone: string | undefined;
  name: string | undefined;
  email: string | undefined;
  city?: string | undefined;
};

// type PayerInfo = {
//   name: {
//     given_name: string;
//     surname: string;
//   };
// };

// type PaymentDetails = {
//   payer: PayerInfo;
//   id: string; // PayPal transaction ID
//   status: string; // Payment status (e.g., 'COMPLETED', 'PENDING')
// };

export default function Calculated(props: { params: tParams }) {
  const [loading, setLoading] = useState(true);
  // const [scriptLoaded, setScriptLoaded] = useState(false);

  const [values, setValues] = useState<{ type: string; plot: string }>({
    type: "",
    plot: "",
  });
  // const addPayPalScript = () => {
  //   if (window.paypal) {
  //     // setScriptLoaded(true);
  //     return;
  //   }
  //   const script = document.createElement("script");
  //   script.src =
  //     "https://www.paypal.com/sdk/js?client-id=YOUR_PAYPAL_CLIENT_ID";
  //   script.type = "text/javascript";
  //   // script.onload = () => setScriptLoaded(true);
  //   script.async = true;
  //   document.body.appendChild(script);
  // };
  useEffect(() => {
    props.params.then((e) => {
      if (e) {
        setValues({ type: e.type, plot: e.plot });
      }
    });
    // addPayPalScript();
    getClientJobsWithSteps().then((e) => {
      if (e) {
        if (e === "Please login" || e === "Wrong token, please login again!") {
          window.location.replace("/auth/login");
        }
        if (e !== "Please login" && e !== "Wrong token, please login again!") {
          setLoading(false);
          if (typeof e === "string") {
            // console.log("as", e);
            getRealUsers(e).then((u) => {
              if (u) {
                if (u === "no such user!") {
                  console.log(u);
                } else {
                  setUser(u);
                }
              }
            });
          } else if (e[0] !== undefined) {
            let g = 0;
            e.map(() => {
              g = g + 1;
            });
            if (g >= 3) {
              setCount(3);
            }

            // console.log(e);
            getRealUsers(e[0].givenBy).then((u) => {
              if (u) {
                if (u === "no such user!") {
                  console.log(u);
                } else {
                  setUser(u);
                }
              }
            });
          }
        }
      }
    });
  }, []);
  const sec = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const [user, setUser] = useState<{
    id: string;
    email: string | null;
    name: string | null;
    password: string | null;
    otp: string | null;
    emailVerified: Date | null;
    otpExpiry: Date | null;
    type: string;
    Phone: string | null;
  }>();
  // const { startUpload } = useUploadThing("pdfUploader");
  const [message, setMessage] = useState("");
  console.log(message);
  // const [receipt] = useState("");
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [currency] = useState("INR");
  const [currentStep] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [value] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  const [rotate, setRotate] = useState("0");
  // const paypalRef = useRef<HTMLDivElement>(null);
  const scrollToForm = () => {
    sec.current?.scrollIntoView({ behavior: "smooth" });
  };
  const form = useForm<z.infer<typeof RectanglePlotSchema>>({
    resolver: zodResolver(RectanglePlotSchema),
    defaultValues: {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      floor: Number(searchParams.get("floors")),
      direction: "north",
      phone: "",
      specifications: "",
      drawing: "",
    },
  });
  // const [error, setError] = useState<string>("");
  // const [success, setSuccess] = useState<string>("");
  const form2 = useForm<z.infer<typeof QuerySchema2>>({
    resolver: zodResolver(QuerySchema2),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      requirement: "",
      city: "",
    },
  });
  const onSubmit = (e: {
    A: number;
    B: number;
    floor: number;
    C: number;
    D: number;
    specifications: string;
    direction: string;
    phone: string;
  }) => {
    setFormData({
      ...e,
      name: user!.name || "",
      email: user!.email || "",
    });
    setIsDialogOpen(true);
  };
  console.log(values.type);
  const handleSubmit = async () => {
    if (user) {
      if (searchParams.get("property") !== null) {
        startTransition(() => {
          const handlePayment = async () => {
            if (currentStep > stepPercentages.length) {
              alert("All payments are completed!");
              return;
            }
            try {
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

              // const prismaLoad = {
              //   ...e,
              //   plot: values.plot,
              //   imageUrl: imageUrl,
              //   price: Number(searchParams.get("price")),
              //   type: values.type,
              //   property: searchParams.get("property") || "Basic",
              // };
              if (formData?.city) {
                createJob({
                  A: formData!.A,
                  B: formData!.B,
                  C: formData!.C,
                  D: formData!.D,
                  direction: formData!.direction,
                  specifications: formData!.specifications,
                  floor: Number(searchParams.get("floors")),
                  plot: values.plot,
                  imageUrl: imageUrl,
                  price: Number(searchParams.get("price")),
                  type: values.type,
                  property: searchParams.get("property") || "Residential",
                  city: formData.city,
                  phone: formData.phone,
                  name: formData.name,
                  email: formData.email,
                }).then((j) => {
                  // console.log("dsfa", j);
                  if (j) {
                    if (j !== "Error") {
                      if (j !== "user not approved") {
                        createStep({
                          jobId: j.job!.id,
                          type: "full",
                          steps: steps,
                          step: 1,
                        }).then(async (res) => {
                          if (res) {
                            if (res !== "Network error") {
                              if (res !== "No such job exists") {
                                const response = await fetch(
                                  "/api/payments/stepPayments",
                                  {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      totalAmount: Number(
                                        searchParams.get("price")
                                      ),
                                      currency,
                                      step: currentStep,
                                      totalSteps: steps,
                                      jobId: j.job!.id,
                                    }),
                                  }
                                );
                                const order = await response.json();
                                if (!order) {
                                  console.error("Failed to create order");
                                  window.location.replace("/payment/failure");
                                  // return;
                                }
                                if (!order.message) {
                                  console.error("Failed to create order");
                                  window.location.replace("/payment/failure");
                                  // return;
                                }
                                window.location.href = `${order.message}`;
                              }
                            }
                          }
                        });
                      }
                    }
                  }
                });
              }
              if (!formData?.city) {
                createJob({
                  A: formData!.A,
                  B: formData!.B,
                  C: formData!.C,
                  D: formData!.D,
                  direction: formData!.direction,
                  specifications: formData!.specifications,
                  // ...formData!,
                  floor: Number(searchParams.get("floors")),
                  plot: values.plot,
                  imageUrl: imageUrl,
                  price: Number(searchParams.get("price")),
                  type: values.type,
                  property: searchParams.get("property") || "Residential",
                }).then((j) => {
                  console.log("dsfa", j);
                  if (j) {
                    if (j !== "Error") {
                      if (j !== "user not approved") {
                        createStep({
                          jobId: j.job!.id,
                          type: "full",
                          steps: steps,
                          step: 1,
                        }).then(async (res) => {
                          if (res) {
                            if (res !== "Network error") {
                              if (res !== "No such job exists") {
                                const response = await fetch(
                                  "/api/payments/stepPayments",
                                  {
                                    method: "POST",
                                    headers: {
                                      "Content-Type": "application/json",
                                    },
                                    body: JSON.stringify({
                                      totalAmount: Number(
                                        searchParams.get("price")
                                      ),
                                      currency,
                                      step: currentStep,
                                      totalSteps: steps,
                                      jobId: j.job!.id,
                                    }),
                                  }
                                );
                                const order = await response.json();
                                if (!order) {
                                  console.error("Failed to create order");
                                  window.location.replace("/payment/failure");
                                  // return;
                                }
                                if (!order.message) {
                                  console.error("Failed to create order");
                                  window.location.replace("/payment/failure");
                                  // return;
                                }
                                window.location.href = `${order.message}`;
                              }
                            }
                          }
                        });
                      }
                    }
                  }
                });
              }

              //   key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
              //   amount: order.amount,
              //   currency: order.currency,
              //   name: "Make My Naksha",
              //   description: `Step ${currentStep} Payment`,
              //   order_id: order.id,
              //   handler: async (response: RazorpayPaymentResponse) => {
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
              //     // console.log(verificationResult);
              //     if (verificationResult.success) {
              //       alert(`Step ${currentStep} payment successful!`);
              //       // setReceipts((prev) => [...prev, order.receipt]); // Add receipt to the list
              //       setCurrentStep((prevStep) => prevStep + 1); // Move to next step
              // createJob({
              // }).then((res) => {
              //         console.log(res);
              //         if (res) {
              //           if (res !== "Error") {
              //             if (res === "user not approved") {
              //             } else if (res?.success && res?.job) {
              //               createStep({
              //                 jobId: res.job?.id,
              //                 type: "full",
              //                 step: 1,
              //               }).then((e) => {
              //                 if (e) {
              //                   if (e !== "Network error") {
              //                     if (e !== "No such job exists") {
              //                       fetch("/api/payments/receipt", {
              //                         method: "POST",
              //                         headers: {
              //                           "Content-Type": "application/json",
              //                         },
              //                         body: JSON.stringify({
              //                           payment_id: `${payment_id}`,
              //                         }),
              //                       }).then((rece) => {
              //                         if (rece.ok) {
              //                           rece.blob().then((blob) => {
              //                             // Create a temporary download link for the Blob
              //                             const file = new File(
              //                               [blob],
              //                               `receipt${user.email}1.pdf`,
              //                               {
              //                                 type: "application/pdf",
              //                               }
              //                             );
              //                             try {
              //                               startUpload([file]).then(
              //                                 (uploadedFiles) => {
              //                                   if (
              //                                     uploadedFiles &&
              //                                     uploadedFiles[0]
              //                                   ) {
              //                                     console.log(
              //                                       "File uploaded successfully:",
              //                                       uploadedFiles[0].url
              //                                     );
              //                                     // setLoading(false);
              //                                     router.push(
              //                                       `${window.location.pathname}/success?receipt=${uploadedFiles[0].url}`
              //                                     );
              //                                   } else {
              //                                     console.error(
              //                                       "File upload failed"
              //                                     );
              //                                   }
              //                                 }
              //                               );
              //                             } catch (error) {
              //                               console.error(
              //                                 "Error uploading file:",
              //                                 error
              //                               );
              //                             }
              //                           });
              //                         }
              //                       });
              //                     } else {
              //                       console.log("GG");
              //                     }
              //                   }
              //                 }
              //               });
              //             } else if (res?.error) {
              //               router.push(`${window.location.pathname}/error`);
              //             }
              //           }
              //         }
              //       });
              //     } else {
              //       alert("Payment verification failed!");
              //     }
              //   },
              //   prefill: {
              //     name: user.name!,
              //     email: `${user.email}`,
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
            }
          };
          // if (!selected)
          // if (selected) {
          handlePayment().then((pay) => {
            if (pay && !pay.error) {
              console.log("success");
            }
          });
          // }
        });
      }
    }
  };
  const onSubmit2 = (e: {
    name: string;
    phone: string;
    email: string;
    city: string;
    requirement: string;
  }) => {
    setFormData(() => {
      return {
        A: 0,
        B: 0,
        C: 0,
        D: 0,
        email: e.email,
        city: e.city,
        specifications: e.requirement,
        phone: e.phone,
        name: e.name,
        floor: Number(searchParams.get("floors")),
        direction: undefined,
      };
    });
    setIsDialogOpen(true);
  };

  // const onPayClick = (e: {
  //   A: number;
  //   B: number;
  //   floor: number;
  //   C: number;
  //   D: number;
  //   specifications: string;
  //   direction: string;
  // }) => {
  //   // const handleCustomPayButtonClick = () => {
  //   if (window.paypal) {
  //     // Trigger PayPal button to start the payment process
  //     window.paypal
  //       .Buttons({
  //         createOrder: (data, actions) => {
  //           // Create an order with PayPal
  //           return actions.order.create({
  //             purchase_units: [
  //               {
  //                 amount: {
  //                   value: "10.00", // Specify the order amount
  //                   currency_code: "USD",
  //                 },
  //                 description: "Payment for Order #12345", // Optional order description
  //               },
  //             ],
  //           });
  //         },
  //         onApprove: (data, actions) => {
  //           // Capture the payment once the user approves it
  //           return actions.order.capture().then((details) => {
  //             // Type assertion: we know 'details' is of type 'PaymentDetails'
  //             const paymentDetails = details as PaymentDetails;
  //             alert(
  //               "Payment completed by " + paymentDetails.payer.name.given_name
  //             );
  //             // Send payment details to the backend for processing (e.g., create an order in the DB)
  //           });
  //         },
  //         onCancel: (data) => {
  //           alert("Payment was cancelled");
  //           console.log(data);
  //         },
  //         onError: (err) => {
  //           console.error("Error occurred during payment:", err);
  //           alert("An error occurred while processing your payment.");
  //         },
  //       })
  //       .render("#paypal-button-container");
  //   }
  //   // };
  // };
  if (formData) console.log("ds", formData);

  // console.log(rotate);
  return loading ? (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <Loading2 loading={loading} />
    </div>
  ) : (
    user && (
      <div className="flex flex-col">
        <div className="bg-white opacity-80">
          <SiteVisitComp
            user={user}
            currency={currency}
            setMessage={setMessage}
          />
          {/* <div className="">
            <div className="flex justify-center text-center text-green-600 bg-green-300">
              {message}{" "}
              {receipt !== "" && (
                <a
                  href={`${receipt}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline flex text-black font-bold"
                >
                  Receipt
                </a>
              )}
            </div>
          </div> */}
          <div className="text-2xl text-center">OR</div>
        </div>
        {count < 3 && (
          <div className="flex flex-col lg:flex-row items-center lg:iteme-start gap-10 justify-center mt-4">
            <div className="flex items justify-center flex-col">
              <img
                width={400}
                height={400}
                className="rounded-3xl cursor-pointer"
                src={`../../${values.plot}.png`}
                alt=""
                onClick={scrollToForm}
              />
              <div className="flex flex-col items-center">
                <div className="mt-4">
                  <ArrowDownIcon className="w-20" />
                </div>
                <div
                  className="transition-transform mt-4"
                  style={{ transform: `rotate(${rotate}deg)` }}
                >
                  <img
                    width={200}
                    height={200}
                    className={`rounded-full mt-2 `}
                    src={`../../compass.jpg`}
                    alt=""
                  />
                </div>
              </div>
            </div>
            {values.plot === "plot1" && (
              <Card
                className="w-[90vw] md:w-[70vw] lg:w-[40vw]"
                // id="paypal-button-container"
              >
                <CardTitle>
                  <CardHeader>
                    <div ref={sec}>Fill in the details of the plot</div>
                  </CardHeader>
                </CardTitle>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                      <div className="grid w-[35vw] items-center gap-4">
                        <FormField
                          control={form.control}
                          name="direction"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Enter Direction</FormLabel>
                              <FormControl>
                                <Popover open={open} onOpenChange={setOpen}>
                                  <PopoverTrigger asChild>
                                    <Button
                                      variant="outline"
                                      role="combobox"
                                      aria-expanded={open}
                                      className="w-[200px] justify-between ml-3"
                                    >
                                      {field.value
                                        ? directions.find(
                                            (direction) =>
                                              direction.value === field.value
                                          )?.label
                                        : "Enter Direction..."}
                                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                  </PopoverTrigger>
                                  <PopoverContent>
                                    <Command>
                                      <CommandList>
                                        {directions.map((direction) => (
                                          <CommandItem
                                            key={direction.value}
                                            onSelect={() => {
                                              field.onChange(direction.value);
                                              if (direction.value === "north") {
                                                setRotate("0");
                                              }
                                              if (direction.value === "south") {
                                                setRotate("180");
                                              }
                                              if (direction.value === "east") {
                                                setRotate("270");
                                              }
                                              if (direction.value === "west") {
                                                setRotate("90");
                                              }
                                              if (
                                                direction.value === "northwest"
                                              ) {
                                                setRotate("45");
                                              }
                                              if (
                                                direction.value === "northeast"
                                              ) {
                                                setRotate("315");
                                              }
                                              if (
                                                direction.value === "southeast"
                                              ) {
                                                setRotate("225");
                                              }
                                              if (
                                                direction.value === "southwest"
                                              ) {
                                                setRotate("135");
                                              }
                                              setOpen(false);
                                            }}
                                          >
                                            {direction.label}
                                            <CheckIcon
                                              className={cn(
                                                "ml-auto h-4 w-4",
                                                value === direction.value
                                                  ? "opacity-100"
                                                  : "opacity-0"
                                              )}
                                            />
                                          </CommandItem>
                                        ))}
                                      </CommandList>
                                    </Command>
                                  </PopoverContent>
                                </Popover>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="A"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{"Length (A) in feet"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter the length of the plot"
                                  type="number"
                                  disabled={isPending}
                                  className="hover:border-slate-400"
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? Number(e.target.value)
                                      : 0;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="B"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{"Breadth (B) in feet"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter the breadth of the plot"
                                  type="number"
                                  disabled={isPending}
                                  className="hover:border-slate-400"
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? Number(e.target.value)
                                      : 0;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="C"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{"Breadth (C) in feet"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter the length of the plot"
                                  type="number"
                                  disabled={isPending}
                                  className="hover:border-slate-400"
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? Number(e.target.value)
                                      : 0;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="D"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{"Length (D) in feet"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter the breadth of the plot"
                                  type="number"
                                  disabled={isPending}
                                  className="hover:border-slate-400"
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? Number(e.target.value)
                                      : 0;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                        <FormField
                          control={form.control}
                          name="floor"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Floors</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder={
                                    "Enter the number of Floors (Including ground floor)"
                                  }
                                  type="number"
                                  disabled={true}
                                  className="hover:border-slate-400"
                                  onChange={(e) => {
                                    const value = e.target.value
                                      ? Number(e.target.value)
                                      : 0;
                                    field.onChange(value);
                                  }}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="specifications"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>
                                {
                                  "Customizations(If you want a one to one session for custom design you can contact us by filling the below form)"
                                }
                              </FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  placeholder="Enter the description of each floor for customization"
                                  disabled={isPending}
                                  className="hover:border-slate-400"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>{"Enter your phone number"}</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  placeholder="Enter your phone number"
                                  disabled={isPending}
                                  className="hover:border-slate-400"
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form.control}
                          name="drawing"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="">
                                Share your plot{`'`}s reference image, <br />
                                dimensions, or any helpful details to ensure
                                accurate measurements and prefect design
                              </FormLabel>
                              <FormControl>
                                <FileUpload
                                  endPoint="imageUploader"
                                  onChange={field.onChange}
                                  value={field.value}
                                  setImageUrl={setImageUrl}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                        <Button disabled={isPending} type="submit">
                          Pay Now <ArrowRightIcon />
                        </Button>
                      </div>
                    </form>
                  </Form>

                  <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    {/* <DialogTrigger>Pay</DialogTrigger> */}
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Package Details</DialogTitle>
                      </DialogHeader>
                      {formData && (
                        // <DialogDescription>
                        <div>
                          <div>
                            {/* <div>Plot : {`${job.plot}`}</div> */}
                            <div className="flex my-1 flex-wrap">
                              {formData.A !== 0 && (
                                <div className="border border-black mx-2 rounded-lg p-2">
                                  <div>A : {`${formData.A}`}</div>
                                </div>
                              )}
                              {formData.B !== 0 && (
                                <div className="border border-black mx-2 rounded-lg p-2">
                                  <div>B : {`${formData.B}`}</div>
                                </div>
                              )}
                              {formData.C !== 0 && (
                                <div className="border border-black mx-2 rounded-lg p-2">
                                  <div>C : {`${formData.C}`}</div>
                                </div>
                              )}
                              {formData.D !== 0 && (
                                <div className="border border-black mx-2 rounded-lg p-2">
                                  <div>D : {`${formData.D}`}</div>
                                </div>
                              )}
                              {/* {formData.E && formData.E !== 0 && <div>E:{`${formData.E}`}</div>}
                            {formData.D1 && job.D1 !== 0 && (
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
                            )} */}
                            </div>
                            {formData.direction && (
                              <div className="pl-3">
                                Direction : {`${formData.direction}`}
                              </div>
                            )}
                            {formData.specifications &&
                              formData.specifications !== "" && (
                                <div className="pl-3">
                                  Specifications: {`${formData.specifications}`}
                                </div>
                              )}
                            {searchParams.get("price") && (
                              <div className="pl-3">
                                Total price: Rs. {searchParams.get("price")}
                              </div>
                            )}
                            {searchParams.get("pack") && (
                              <div className="pl-3">
                                Package : {searchParams.get("pack")}
                              </div>
                            )}
                            {searchParams.get("pack") && (
                              <div className="pl-3 font-semibold">
                                {searchParams.get("pack") === "Basic" &&
                                  "Stage 1: 50% advance payment for the initial design.Stage 2: After revision,the remaining 50% payment is required before the final plan is sent."}
                              </div>
                            )}
                            {searchParams.get("pack") && (
                              <div className="pl-3 font-semibold">
                                {searchParams.get("pack") === "Full" && (
                                  <div className="">
                                    <u>Stage 1: Initial Advance (25%)</u>
                                    <div>
                                      Upon receiving 25%, we provide layout
                                      plans with two revisions.
                                    </div>
                                    <u>Stage 2: Second Advance (25%)</u>
                                    <div>
                                      After receiving another 25%, we deliver
                                      structural drawings and a rough 3D view.
                                    </div>
                                    <u>Stage 3: Third Advance (25%)</u>
                                    <div>
                                      Once the next 25% is received, we provide
                                      the final 3D view.
                                    </div>
                                    <u>Stage 4: Final Advance (25%)</u>
                                    <div>
                                      After the final 25%, we deliver plumbing
                                      details, door-window details, and final
                                      structural drawings.
                                    </div>
                                    This ensures clarity and transparency
                                    throughout the project.
                                  </div>
                                )}
                              </div>
                            )}
                            {formData.name !== "" && (
                              <div className="pl-3">
                                Name:{`${formData.name}`}
                              </div>
                            )}
                            {formData.city && formData.city !== "" && (
                              <div className="pl-3">
                                City:{`${formData.city}`}
                              </div>
                            )}
                            {/* {formData.specifications !== "" && (
                              <div>Name:{`${formData.name}`}</div>
                            )} */}
                            {searchParams.get("floors") && (
                              <div className="pl-3">
                                Floors : {searchParams.get("floors")}
                              </div>
                            )}
                            {searchParams.get("property") && (
                              <div className="pl-3">
                                Type : {searchParams.get("property")}
                              </div>
                            )}

                            {/* {imageUrl!=="" && (
                          <a
                          href={`${imageUrl}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline flex text-black font-bold"
                        >
                          View Attachment <File />
                        </a>
                          )} */}
                          </div>
                          <div className="flex justify-end gap-2 mt-4">
                            <Button
                              variant="outline"
                              onClick={() => setIsDialogOpen(false)}
                            >
                              Cancel
                            </Button>
                            <Button onClick={handleSubmit}>Pay Now</Button>
                          </div>
                        </div>
                        // </DialogDescription>
                      )}
                    </DialogContent>
                  </Dialog>
                </CardContent>
              </Card>
            )}
            {values.plot === "plot2" && (
              <TrapPlot
                pack={`${searchParams.get("pack")}`}
                name={user.name!}
                // phone={user?.Phone}
                gmail={user?.email}
                floors={Number(searchParams.get("floors"))}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                // direction={[{ label: "North", value: "north" }]}

                price={Number(searchParams.get("price"))}
                type={values.type}
                setLoading={setLoading}
                property={`${searchParams.get("property")}`}
                setRotate={setRotate}
              />
            )}
            {values.plot === "plot3" && (
              <PentaPlot
                pack={`${searchParams.get("pack")}`}
                name={user.name!}
                gmail={user?.email}
                floors={Number(searchParams.get("floors"))}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                // direction={[{ label: "North", value: "north" }]}
                price={Number(searchParams.get("price"))}
                type={values.type}
                setLoading={setLoading}
                property={`${searchParams.get("property")}`}
                setRotate={setRotate}
              />
            )}
          </div>
        )}
        {values.plot === "plot1" && (
          <div className="flex text-2xl text-center items-center justify-center my-4">
            OR
          </div>
        )}
        <div>
          {/* const handleSubmit = async (e: {
    name: string;
    phone: string;
    email: string;
    requirement: string;
    city: string;
  }) => {
    try {
      // startTransition(() => {
      axios
        .post("/api/queryMail", {
          to: e.email,
          subject: "MapRap Query",
          text: `name:${e.name}  | Phone:${e.phone}  | city:${e.city}  | requirement : ${e.requirement}`,
          requirement: `${e.requirement}`,
        })
        .then((res) => {
          if (res) {
            // window.location.reload();
            setSuccess("Our Team will soon contact you");
          } else {
            setError("Error! Please try again");
          }
          // });
        });
    } catch (err) {
      console.log(err);
    }
  }; */}
          {/* return ( */}
          {values.plot === "plot1" && (
            <div className="flex justify-center m-4">
              <Card className="w-3/4 lg:w-1/2 hover:bg-gray-50">
                <CardHeader>
                  <CardTitle className="text-center">
                    Share Your Info - We{`'`}ll Handle the Rest!
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-col items-center">
                  <Form {...form2}>
                    <form
                      onSubmit={form2.handleSubmit(onSubmit2)}
                      className="w-full"
                    >
                      <div className="grid w-full justify-center items-center gap-4">
                        <FormField
                          control={form2.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem className="lg:w-[30vw]">
                              <FormLabel>Name</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="name"
                                  className="hover:border-slate-400"
                                  placeholder="Enter your name"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="phone"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Phone</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="name"
                                  className="hover:border-slate-400"
                                  placeholder="Enter your phone number"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="email"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Gmail</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="name"
                                  className="hover:border-slate-400"
                                  placeholder="Enter your Gmail"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="city"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>City</FormLabel>
                              <FormControl>
                                <Input
                                  {...field}
                                  type="name"
                                  className="hover:border-slate-400"
                                  placeholder="Enter your City"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        <FormField
                          control={form2.control}
                          name="requirement"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Requirement</FormLabel>
                              <FormControl>
                                <Textarea
                                  {...field}
                                  className="hover:border-slate-400"
                                  placeholder="Enter your Requirement"
                                />
                              </FormControl>
                            </FormItem>
                          )}
                        />
                        {/* <FormSuccess message={success} /> */}
                        {/* <FormError message={error} /> */}
                        <Button className="bg-green-500 hover:bg-green-600">
                          Pay Now
                        </Button>
                      </div>
                    </form>
                  </Form>
                  <div className="text-slate-600 text-[10px] lg:text-xs w-3/4 lg:w-1/2 mt-10 text-center">
                    By submitting this form, you consent to our team contacting
                    you.
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {/* ); */}

          {/* <UserForm buttonText="Contact Us" head="Consult With Our Experts" /> */}
        </div>
        {count > 2 && (
          <div className="flex flex-col items-center justify-center h-screen">
            <div className="underline">
              You already have assigned a number of jobs to user, please wait
              for jobs competion or use a different account
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
        )}
      </div>
    )
  );
}
