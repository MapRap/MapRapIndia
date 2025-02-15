"use client";
import { getId } from "@/_actions/getId";
// import { createSiteVisit } from "@/_actions/createSiteVisit";
// import { getId } from "@/_actions/getId";
import { getOtherPlans } from "@/_actions/getOtherPlans";
import { Loading2 } from "@/components/common/loader2";
// import { RazorpayPaymentResponse } from "@/components/common/trapPlot";
import ViewPrice from "@/components/common/viewPrice";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuGroup,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { useUploadThing } from "@/lib/uploadthing";
// import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { flushSync } from "react-dom";
// import PlanPage from "../plans/page";

const List = () => {
  // const [user, setUser] = useState<
  //   | {
  //       id: string;
  //       gmail: string;
  //       name: string;
  //       password: string;
  //       otp: string | null;
  //       isVerified: boolean | null;
  //       otpExpiry: Date;
  //       type: string;
  //       Phone: string;
  //     }
  //   | undefined
  // >();
  const [loading, setLoading] = useState(true);
  const [currency, setCurrency] = useState("INR");

  const [plans, setPlans] = useState<
    {
      id: string;
      package: string;
      features: string;
      inr: string;
      area: string;
      floors: number;
      type: string;
      dollar: string;
      property: string;
    }[]
  >([]);
  const [areas, setAreas] = useState<
    {
      area: string;
      property: string;
    }[]
  >([]);
  //
  // const { startUpload } = useUploadThing("pdfUploader");
  const router = useRouter();
  useEffect(() => {
    getId()
      .then((i) => {
        if (i) {
          if (i !== "/unauthorized") {
            // setUser(i);
            // getClientJobsWithSteps().then((j) => {
            //   if (j) {
            //     if (typeof j !== "string") {
            //       setJob(j);
            //     }
            //   }
            // });
            if (i.country !== true) {
              // flushSync(() => {
              setCurrency("USD");
              // });
            }
          }
        }
      })
      .then(() => {
        getOtherPlans().then((e) => {
          if (e) {
            // setLoading(false);/
            if (e !== "Network Error") {
              e.map((p) => {
                setPlans((prevPlans) => {
                  // const exists = prevPlans.find((plan) => plan.id === p.id);
                  // if (exists) return prevPlans;
                  const updatedPlans = [...prevPlans, p];
                  updatedPlans.sort((a, b) => a.floors - b.floors);
                  return updatedPlans;
                });
                // })
                // e.map((p) => {
                setAreas((prevAreas) => {
                  const exists = prevAreas.find(
                    (a) => a.area === p.area && a.property === p.property
                  );
                  if (exists) return prevAreas;
                  const updatedAreas = [
                    ...prevAreas,
                    { area: p.area, property: p.property },
                  ];
                  updatedAreas.sort((a, b) => Number(a.area) - Number(b.area));
                  return updatedAreas;
                });
                setLoading(false);
              });
            }
          }
        });
      });
  }, []);
  console.log(currency);

  return loading ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div className="w-[98vw] p-0 m-0">
      <Tabs defaultValue="residential" className="text-center m-0">
        <TabsList className="text-black bg-slate-300">
          <TabsTrigger
            value="residential"
            className="text-xs md:text-sm md:w-[35vw] w-[20vw]"
          >
            {/* <div className="my-2"> */}
            Residential
            <br /> Plans
            {/* </div> */}
          </TabsTrigger>
          <TabsTrigger
            value="commercial"
            className="text-xs md:text-base md:w-[35vw] w-[20vw]"
          >
            Commercial
            <br /> Plans
          </TabsTrigger>
        </TabsList>

        <TabsContent value="residential">
          <div>
            <Accordion type="single" collapsible>
              {areas.map((item) => {
                if (item.property === "Residential") {
                  return (
                    <AccordionItem key={item.area} value={`${item.area}`}>
                      <AccordionTrigger className="p-0 m-0">
                        <h1 className="font-bold text-center text-3xl p-4 w-full m-0 hover:underline">
                          Area upto {item.area}² feet
                        </h1>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap justify-center gap-3">
                          {plans.map((plan) => {
                            if (plan.area === item.area) {
                              // console.log(plan.dollar);
                              if (
                                plan.property === "Residential" &&
                                plan.package === "Basic"
                              ) {
                                return (
                                  <div key={plan.id} className="m-2">
                                    <ViewPrice
                                      pack={plan.package}
                                      // price={Number(plan.inr)}
                                      features={plan.features}
                                      butto={`Proceed with ${plan.package} Plan`}
                                      floors={plan.floors}
                                      onClick={() => {
                                        router.push(
                                          `/list/${plan.area}?pack=${
                                            plan.package
                                          }&floors=${plan.floors}&price=${
                                            currency === "INR"
                                              ? plan.inr
                                              : plan.dollar
                                          }&property=${plan.property}`
                                        );
                                      }}
                                      currency={currency}
                                      property={`${plan.property}`}
                                      inr={plan.inr}
                                      dollar={plan.dollar}
                                    />
                                  </div>
                                );
                              }
                            }
                          })}
                          {plans.map((plan) => {
                            if (plan.area === item.area) {
                              if (
                                plan.property === "Residential" &&
                                plan.package === "Full"
                              ) {
                                return (
                                  <div key={plan.id}>
                                    <ViewPrice
                                      pack={plan.package}
                                      // price={Number(plan.inr)}
                                      features={plan.features}
                                      butto={`Proceed with ${plan.package} Plan`}
                                      floors={plan.floors}
                                      onClick={() => {
                                        router.push(
                                          `/list/${plan.area}?pack=${
                                            plan.package
                                          }&floors=${plan.floors}&price=${
                                            currency === "INR"
                                              ? plan.inr
                                              : plan.dollar
                                          }&property=${plan.property}`
                                        );
                                      }}
                                      currency={currency}
                                      property={`${plan.property}`}
                                      inr={plan.inr}
                                      dollar={plan.dollar}
                                    />
                                  </div>
                                );
                              }
                            }
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
              })}
            </Accordion>
          </div>
        </TabsContent>
        <TabsContent value="commercial">
          <div>
            <Accordion type="single" collapsible>
              {areas.map((item) => {
                if (item.property === "Commercial") {
                  return (
                    <AccordionItem key={item.area} value={`${item.area}`}>
                      <AccordionTrigger className="p-0 m-0">
                        <h1 className="font-bold text-center text-3xl p-4 w-full m-0 hover:underline">
                          Area upto {item.area}² feet
                        </h1>
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-wrap justify-center">
                          {plans.map((plan) => {
                            if (plan.area === item.area) {
                              if (
                                plan.property === "Commercial" &&
                                plan.package === "Basic"
                              ) {
                                return (
                                  <div key={plan.id}>
                                    <ViewPrice
                                      pack={plan.package}
                                      // price={Number(plan.inr)}
                                      features={plan.features}
                                      butto={`Proceed with ${plan.package} Plan`}
                                      floors={plan.floors}
                                      property={plan.property}
                                      currency={currency}
                                      onClick={() => {
                                        router.push(
                                          `/list/${plan.area}?pack=${
                                            plan.package
                                          }&floors=${plan.floors}&price=${
                                            currency === "INR"
                                              ? plan.inr
                                              : plan.dollar
                                          }&property=${plan.property}`
                                        );
                                      }}
                                      inr={plan.inr}
                                      dollar={plan.dollar}
                                    />
                                  </div>
                                );
                              }
                            }
                          })}
                          {plans.map((plan) => {
                            if (plan.area === item.area) {
                              if (
                                plan.property === "Commercial" &&
                                plan.package === "Full"
                              ) {
                                return (
                                  <div key={plan.id}>
                                    <ViewPrice
                                      pack={plan.package}
                                      // price={Number(plan.inr)}
                                      features={plan.features}
                                      butto={`Proceed with ${plan.package} Plan`}
                                      floors={plan.floors}
                                      currency={currency}
                                      onClick={() => {
                                        router.push(
                                          `/list/${plan.area}?pack=${
                                            plan.package
                                          }&floors=${plan.floors}&price=${
                                            currency === "INR"
                                              ? plan.inr
                                              : plan.dollar
                                          }&property=${plan.property}`
                                        );
                                      }}
                                      property={`${plan.property}`}
                                      inr={plan.inr}
                                      dollar={plan.dollar}
                                    />
                                  </div>
                                );
                              }
                            }
                          })}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  );
                }
              })}
            </Accordion>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default List;
