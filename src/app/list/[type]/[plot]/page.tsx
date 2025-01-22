"use client";
import * as z from "zod";
import React, { useEffect, useRef, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { RectanglePlotSchema } from "@/lib";
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
import TrapPlot, {
  RazorpayPaymentResponse,
  stepPercentages,
} from "@/components/common/trapPlot";
import { createJob } from "@/_actions/createJob";
import { getClientJobsWithSteps } from "@/_actions/getClientJobs";
import PentaPlot from "@/components/common/pentaPlot";
import { getRealUsers } from "@/_actions/getRealUsers";
import { Button } from "@/components/ui/button";
import { useUploadThing } from "@/lib/uploadthing";
import { createStep } from "@/_actions/createStep";
import { Loading2 } from "@/components/common/loader2";
import { CheckIcon, ChevronDownIcon } from "lucide-react";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { createSiteVisit } from "@/_actions/createSiteVisit";
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
];
export default function Calculated(props: { params: tParams }) {
  const [loading, setLoading] = useState(true);
  const [values, setValues] = useState<{ type: string; plot: string }>({
    type: "",
    plot: "",
  });
  useEffect(() => {
    props.params.then((e) => {
      if (e) {
        setValues({ type: e.type, plot: e.plot });
      }
    });
    getClientJobsWithSteps().then((e) => {
      if (e) {
        if (e === "Please login" || e === "Wrong token, please login again!") {
          window.location.replace("/unauthorized");
        }
        if (e !== "Please login" && e !== "Wrong token, please login again!") {
          setLoading(false);
          if (typeof e === "string") {
            console.log("as", e);
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

            console.log(e);
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
    gmail: string;
    name: string;
    password: string;
    otp: string | null;
    isVerified: boolean | null;
    otpExpiry: Date;
    type: string;
    Phone: string;
  }>();
  const { startUpload } = useUploadThing("pdfUploader");
  const [message, setMessage] = useState("");
  const [receipt, setReceipt] = useState("");
  const [isPending, startTransition] = useTransition();
  const [count, setCount] = useState(0);
  const [currency] = useState("INR");
  const [currentStep, setCurrentStep] = useState(1);
  const [imageUrl, setImageUrl] = useState("");
  const [value] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const router = useRouter();
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
    },
  });

  const handleSubmit = async (e: {
    A: number;
    B: number;
    floor: number;
    C: number;
    D: number;
    specifications: string;
    direction: string;
  }) => {
    if (user) {
      if (searchParams.get("property") !== null) {
        startTransition(() => {
          const handlePayment = async () => {
            if (currentStep > stepPercentages.length) {
              alert("All payments are completed!");
              return;
            }

            try {
              const response = await fetch("/api/payments/create-order", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  totalAmount: 100 * Number(searchParams.get("price")),
                  currency,
                  step: currentStep,
                }),
              });

              const order = await response.json();

              if (!order.id) {
                console.error("Failed to create order:", order);
                return;
              }

              const options = {
                key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
                amount: order.amount,
                currency: order.currency,
                name: "Make My Naksha",
                description: `Step ${currentStep} Payment`,
                order_id: order.id,
                handler: async (response: RazorpayPaymentResponse) => {
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
                    alert(`Step ${currentStep} payment successful!`);
                    // setReceipts((prev) => [...prev, order.receipt]); // Add receipt to the list
                    setCurrentStep((prevStep) => prevStep + 1); // Move to next step
                    createJob({
                      ...e,
                      plot: values.plot,
                      imageUrl: imageUrl,
                      price: Number(searchParams.get("price")),
                      type: values.type,
                      property: searchParams.get("property") || "Basic",
                    }).then((res) => {
                      console.log(res);
                      if (res) {
                        if (res !== "Error") {
                          if (res === "user not approved") {
                          } else if (res?.success && res?.job) {
                            createStep({
                              jobId: res.job?.id,
                              type: "full",
                              step: 1,
                            }).then((e) => {
                              if (e) {
                                if (e !== "Network error") {
                                  if (e !== "No such job exists") {
                                    fetch("/api/payments/receipt", {
                                      method: "POST",
                                      headers: {
                                        "Content-Type": "application/json",
                                      },
                                      body: JSON.stringify({
                                        payment_id: `${payment_id}`,
                                      }),
                                    }).then((rece) => {
                                      if (rece.ok) {
                                        rece.blob().then((blob) => {
                                          // Create a temporary download link for the Blob
                                          const file = new File(
                                            [blob],
                                            `receipt${user.gmail}1.pdf`,
                                            {
                                              type: "application/pdf",
                                            }
                                          );
                                          try {
                                            startUpload([file]).then(
                                              (uploadedFiles) => {
                                                if (
                                                  uploadedFiles &&
                                                  uploadedFiles[0]
                                                ) {
                                                  console.log(
                                                    "File uploaded successfully:",
                                                    uploadedFiles[0].url
                                                  );
                                                  // setLoading(false);
                                                  router.push(
                                                    `${window.location.pathname}/success?receipt=${uploadedFiles[0].url}`
                                                  );
                                                } else {
                                                  console.error(
                                                    "File upload failed"
                                                  );
                                                }
                                              }
                                            );
                                          } catch (error) {
                                            console.error(
                                              "Error uploading file:",
                                              error
                                            );
                                          }
                                        });
                                      }
                                    });
                                  } else {
                                    console.log("GG");
                                  }
                                }
                              }
                            });
                          } else if (res?.error) {
                            router.push(`${window.location.pathname}/error`);
                          }
                        }
                      }
                    });
                  } else {
                    alert("Payment verification failed!");
                  }
                },
                prefill: {
                  name: user.name,
                  email: `${user.gmail}`,
                  contact: user.Phone,
                },
                theme: {
                  color: "#3399cc",
                },
              };

              const razorpay = new window.Razorpay(options);
              razorpay.open();
              setLoading(true);
              return { success: "Payment started" };
            } catch (error) {
              console.error("Error initiating payment:", error);
              return { error: error };
            } finally {
            }
          };
          handlePayment().then((pay) => {
            if (pay && !pay.error) {
              console.log("success");
            }
          });
        });
      }
    }
  };
  const handleVisitPayment = async ({ price }: { price: number }) => {
    try {
      if (user) {
        const response = await fetch("/api/payments/create-order", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            totalAmount: 100 * price,
            currency,
          }),
        });

        const order = await response.json();
        console.log(order);
        if (!order.id) {
          console.error("Failed to create order:", order);
          return;
        }

        const options = {
          key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
          amount: order.amount,
          currency: order.currency,
          name: "Make My Naksha",
          description: `Premium Payment`,
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
              const visit = await createSiteVisit({
                userId: user.id,
                phone: user.Phone,
                gmail: user.gmail,
              });
              if (visit === "Success") {
                setMessage(
                  `Our team will contact you soon for further details `
                );

                fetch("/api/payments/receipt", {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    payment_id: `${payment_id}`,
                  }),
                }).then((rece) => {
                  if (rece.ok) {
                    rece.blob().then((blob) => {
                      const file = new File(
                        [blob],
                        `receipt${user.gmail}1.pdf`,
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
                            setReceipt(`${uploadedFiles[0].url}`);
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
              }
            } else {
              alert("Payment verification failed!");
            }
          },
          prefill: {
            name: user.name,
            email: `${user.gmail}`,
            contact: user.Phone,
          },
          theme: {
            color: "#3399cc",
          },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
        return { success: "Payment started" };
      }
      if (!user) {
        console.log("hey");

        setMessage("Please Login to continue!");
      }
    } catch (error) {
      console.error("Error initiating payment:", error);
      return { error: error };
    } finally {
    }
  };
  return loading ? (
    <div className="w-full h-screen flex items-center justify-center bg-white">
      <Loading2 loading={loading} />
    </div>
  ) : (
    user && (
      <div className="flex flex-col">
        <div>
          <Popover>
            <PopoverTrigger
              asChild
              className="flex items-center justify-center p-0 cursor-pointer"
            >
              <div className="text-black hover:underline hover:text-orange-500 px-2 py-2 text-xs md:text-base rounded-xla">
                <ChevronDownIcon />
                Want a site visit
              </div>
            </PopoverTrigger>
            <PopoverContent className="flex flex-col p-0 mt-4">
              <DropdownMenu>
                <DropdownMenuTrigger className="bg-gray-50 hover:bg-gray-100">
                  Trikuta Nagar-Jammu
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem
                      className="cursor-pointer border-b"
                      onClick={() => {
                        handleVisitPayment({ price: 1200 });
                      }}
                    >
                      Upto 5 km : Rs 1200
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      className="cursor-pointer border-b"
                      onClick={() => {
                        handleVisitPayment({ price: 1800 });
                      }}
                    >
                      Upto 10 km : Rs 1800
                    </DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </PopoverContent>
          </Popover>
          <div className="">
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
          </div>
          <div className="text-2xl text-center">or</div>
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
            </div>
            {values.plot === "plot1" && (
              <Card className="w-[90vw] md:w-[70vw] lg:w-[40vw]">
                <CardTitle>
                  <CardHeader>
                    <div ref={sec}>Fill in the details of the plot</div>
                  </CardHeader>
                </CardTitle>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)}>
                      <div className="grid w-[35vw] items-center gap-4">
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
                          name="drawing"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Upload a drawing</FormLabel>

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
                </CardContent>
              </Card>
            )}
            {values.plot === "plot2" && (
              <TrapPlot
                name={user.name}
                phone={user?.Phone}
                gmail={user?.gmail}
                floors={Number(searchParams.get("floors"))}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                // direction={[{ label: "North", value: "north" }]}
                price={Number(searchParams.get("price"))}
                type={values.type}
                setLoading={setLoading}
                property={`${searchParams.get("property")}`}
              />
            )}
            {values.plot === "plot3" && (
              <PentaPlot
                name={user.name}
                phone={user?.Phone}
                gmail={user?.gmail}
                floors={Number(searchParams.get("floors"))}
                setImageUrl={setImageUrl}
                imageUrl={imageUrl}
                // direction={[{ label: "North", value: "north" }]}
                price={Number(searchParams.get("price"))}
                type={values.type}
                setLoading={setLoading}
                property={`${searchParams.get("property")}`}
              />
            )}
          </div>
        )}

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
