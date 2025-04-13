"use client";
import React, { useState, useTransition } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import * as z from "zod";
import { Textarea } from "../ui/textarea";
import FileUpload from "./fileUpload";
import { PentaPlotSchema, QuerySchema2 } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import { createJob } from "@/_actions/createJob";
// import { useRouter } from "next/navigation";
import { ArrowRightIcon, CheckIcon } from "lucide-react";
import { Button } from "../ui/button";
import { createStep } from "@/_actions/createStep";
// import { useUploadThing } from "@/lib/uploadthing";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandItem, CommandList } from "../ui/command";
import { cn } from "@/lib/utils";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../ui/dialog";

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
  E?: number;
  D1?: number;
  D2?: number;
  D3?: number;
  D4?: number;
  specifications: string | undefined;
  direction: string | undefined;
  phone: string | undefined;
  name: string | undefined;
  email: string | undefined;
  city?: string | undefined;
};
// declare global {
//   interface Window {
//     Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
//   }
// }
type Props = {
  pack: string;
  floors: number;
  // directions: typeof directions;
  setImageUrl: React.Dispatch<React.SetStateAction<string>>;
  setRotate: React.Dispatch<React.SetStateAction<string>>;
  imageUrl: string;
  price: number;
  type: string;
  // direction: string;
  name: string;
  // phone: string;
  gmail: string | null;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  property: string;
};
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

// interface RazorpayPaymentResponse {
//   razorpay_payment_id: string;
//   razorpay_order_id: string;
//   razorpay_signature: string;
// }

// interface RazorpayInstance {
//   open: () => void;
// }
export const stepPercentages = [10, 30, 30, 30];
const PentaPlot = ({
  pack,
  floors,
  setImageUrl,
  imageUrl,
  price,
  type,
  // direction,
  // name,
  // phone,
  // gmail,
  setLoading,
  property,
  setRotate,
}: Props) => {
  // console.log("type=", type);
  // const router = useRouter();
  // const { startUpload } = useUploadThing("pdfUploader");
  const [isPending, startTransition] = useTransition();
  const [currentStep] = useState(1); // Tracks the current step
  const [currency] = useState("INR"); // Tracks
  const [value] = React.useState("");
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [formData, setFormData] = useState<FormValues | null>(null);
  // const [rotate, setRotate] = useState("0");
  const [open, setOpen] = React.useState(false);
  const form = useForm<z.infer<typeof PentaPlotSchema>>({
    resolver: zodResolver(PentaPlotSchema),
    defaultValues: {
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      D1: 0,
      D2: 0,
      D3: 0,
      D4: 0,
      floor: floors,
      direction: "north",
      phone: "",
      specifications: "",
      drawing: "",
    },
  });
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
    D1: number;
    D2: number;
    D3: number;
    D4: number;
    E: number;
    specifications: string;
    direction: string;
    phone: string;
  }) => {
    setFormData({
      ...e,
      name: "",
      email: "",
    });
    setIsDialogOpen(true);
  };
  const handleSubmit = async () => {
    startTransition(() => {
      const handlePayment = async () => {
        if (currentStep > stepPercentages.length) {
          alert("All payments are completed!");
          return;
        }

        try {
          // const response = await fetch("/api/payments/create-order", {
          //   method: "POST",
          //   headers: {
          //     "Content-Type": "application/json",
          //   },
          //   body: JSON.stringify({
          //     totalAmount: 100 * price,
          //     currency,
          //     step: currentStep,
          //   }),
          // });

          // const order = await response.json();

          // if (!order.id) {
          //   console.error("Failed to create order:", order);
          //   return;
          // }

          // // Razorpay options
          // const options = {
          //   key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
          //   amount: order.amount,
          //   currency: order.currency,
          //   name: "Make My Naksha",
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
          //     console.log(verificationResult);

          //     if (verificationResult.success) {
          //       alert(`Step ${currentStep} payment successful!`);
          //       // setReceipts((prev) => [...prev, order.receipt]); // Add receipt to the list
          //       setCurrentStep((prevStep) => prevStep + 1); // Move to next step
          //       // console.log("type=", type);
          //       createJob({
          //         ...e,
          //         plot: "plot3",
          //         imageUrl: imageUrl,
          //         price: price,
          //         type: type,
          //         property: property,
          //         // direction: direction,
          //       }).then((res) => {
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
          //                               `receipt${gmail}1.pdf`,
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
          //     name: name,
          //     email: `${gmail}`,
          //   },
          //   theme: {
          //     color: "#3399cc",
          //   },
          // };

          // const razorpay = new window.Razorpay(options);
          // razorpay.open();
          let steps = 2;
          if (Number(price) > 10000 && Number(price) < 20000) {
            steps = 3;
          }
          if (Number(price) > 20000) {
            steps = 4;
          }
          if (formData?.city) {
            createJob({
              A: formData!.A,
              B: formData!.B,
              floor: floors,
              C: formData!.C,
              D: formData!.D,
              E: formData!.E,
              D1: formData!.D1,
              D2: formData!.D2,
              D3: formData!.D3,
              D4: formData!.D4,
              direction: formData!.direction,
              specifications: formData!.specifications,
              plot: "plot3",
              imageUrl: imageUrl,
              price: Number(price),
              type: type,
              city: formData.city,
              phone: formData.phone,
              name: formData.name,
              email: formData.email,
              property: property || "Basic",
            }).then((j) => {
              if (j) {
                if (j !== "Error") {
                  if (j !== "user not approved") {
                    createStep({
                      jobId: j.job!.id,
                      type: "full",
                      step: 1,
                      steps: steps,
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
                                  totalAmount: Number(price),
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
              floor: floors,
              C: formData!.C,
              D: formData!.D,
              E: formData!.E,
              D1: formData!.D1,
              D2: formData!.D1,
              D3: formData!.D1,
              D4: formData!.D1,
              direction: formData!.direction,
              specifications: formData!.specifications,
              plot: "plot3",
              imageUrl: imageUrl,
              price: Number(price),
              type: type,
              property: property || "Residential",
            }).then((j) => {
              if (j) {
                if (j !== "Error") {
                  if (j !== "user not approved") {
                    createStep({
                      jobId: j.job!.id,
                      type: "full",
                      step: 1,
                      steps: steps,
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
                                  totalAmount: Number(price),
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

          setLoading(true);
          return { success: "Payment started" };
        } catch (error) {
          console.error("Error initiating payment:", error);
          return { error: error };
        } finally {
          // setIsProcessing(false);
        }
        // startTransition(() => {
      };
      handlePayment().then((pay) => {
        if (pay && !pay.error) {
          console.log("success");
        }
      });
    });
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
        floor: floors,
        direction: undefined,
      };
    });
    setIsDialogOpen(true);
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Card className="w-[90vw] md:[70vw] lg:w-[35vw]">
        <CardTitle>
          <CardHeader>
            <div>Fill in the details of the plot</div>
          </CardHeader>
        </CardTitle>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full justify-center items-center gap-4">
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
                                      if (direction.value === "northwest") {
                                        setRotate("45");
                                      }
                                      if (direction.value === "northeast") {
                                        setRotate("315");
                                      }
                                      if (direction.value === "southeast") {
                                        setRotate("225");
                                      }
                                      if (direction.value === "southwest") {
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
                  name="E"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Length (E) in feet"}</FormLabel>
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
                  name="D1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Diagonal (D1) in feet"}</FormLabel>
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
                  name="D2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Diagonal (D2) in feet"}</FormLabel>
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
                />{" "}
                <FormField
                  control={form.control}
                  name="D3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Diagonal (D3) in feet"}</FormLabel>
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
                />{" "}
                <FormField
                  control={form.control}
                  name="D4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Diagonal (D4) in feet"}</FormLabel>
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
                />{" "}
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
                      <FormLabel>{"Customizations"}</FormLabel>
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
                      <FormLabel className="w-3/4">
                        Share your plot{`'`}s reference image, dimensions, or
                        any helpful details to ensure accurate measurements and
                        a perfect design
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
                <Button disabled={isPending}>
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
                      {formData.E && formData.E !== 0 && (
                        <div className="border border-black mx-2 rounded-lg p-2">
                          E:{`${formData.E}`}
                        </div>
                      )}
                      {formData.D1 && formData.D1 !== 0 && (
                        <div className="border border-black mx-2 rounded-lg p-2">
                          D1 : {`${formData.D1}`}
                        </div>
                      )}
                      {formData.D2 && formData.D2 !== 0 && (
                        <div className="border border-black mx-2 rounded-lg p-2">
                          D2 : {`${formData.D2}`}
                        </div>
                      )}
                      {formData.D3 && formData.D3 !== 0 && (
                        <div className="border border-black mx-2 rounded-lg p-2">
                          D3 : {`${formData.D3}`}
                        </div>
                      )}
                      {formData.D4 && formData.D4 !== 0 && (
                        <div className="border border-black mx-2 rounded-lg p-2">
                          D4 : {`${formData.D4}`}
                        </div>
                      )}
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
                    {price && (
                      <div className="pl-3">Total price: Rs. {`${price}`}</div>
                    )}
                    {pack && <div className="pl-3">Package : {pack}</div>}
                    {pack && (
                      <div className="pl-3 font-semibold">
                        {pack === "Basic" &&
                          "Stage 1: 50% advance payment for the initial design.Stage 2: After revision,the remaining 50% payment is required before the final plan is sent."}
                      </div>
                    )}
                    {pack && (
                      <div className="pl-3 font-semibold">
                        <div>{}</div>
                        {pack === "Full" && (
                          <div className="">
                            <u>Stage 1: Initial Advance (25%)</u>
                            <div>
                              Upon receiving 25%, we provide layout plans with
                              two revisions.
                            </div>
                            <u>Stage 2: Second Advance (25%)</u>
                            <div>
                              After receiving another 25%, we deliver structural
                              drawings and a rough 3D view.
                            </div>
                            <u>Stage 3: Third Advance (25%)</u>
                            <div>
                              Once the next 25% is received, we provide the
                              final 3D view.
                            </div>
                            <u>Stage 4: Final Advance (25%)</u>
                            <div>
                              After the final 25%, we deliver plumbing details,
                              door-window details, and final structural
                              drawings.
                            </div>
                            This ensures clarity and transparency throughout the
                            project.
                          </div>
                        )}
                      </div>
                    )}
                    {formData.name !== "" && (
                      <div className="pl-3">Name:{`${formData.name}`}</div>
                    )}
                    {formData.city && formData.city !== "" && (
                      <div className="pl-3">City:{`${formData.city}`}</div>
                    )}
                    {/* {formData.specifications !== "" && (
                                      <div>Name:{`${formData.name}`}</div>
                                    )} */}
                    {floors && (
                      <div className="pl-3">Floors : {`${floors}`}</div>
                    )}
                    {type && <div className="pl-3">Type : {`${type}`}</div>}

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
      <div className="flex text-2xl text-center items-center justify-center my-4">
        OR
      </div>
      <div className="flex justify-center w-max mt-4">
        <Card className="w-full hover:bg-gray-50">
          <CardHeader>
            <CardTitle className="text-center">
              Share Your Info - We{`'`}ll Handle the Rest!
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center">
            <Form {...form2}>
              <form onSubmit={form2.handleSubmit(onSubmit2)} className="w-full">
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
              By submitting this form, you consent to our team contacting you.
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PentaPlot;
