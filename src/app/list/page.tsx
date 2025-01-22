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
          setLoading(false);
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
              setCurrency("USaD");
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
          <TabsTrigger value="residential" className="w-[40vw]">
            Residential Plans
          </TabsTrigger>
          <TabsTrigger value="commercial" className="w-[40vw]">
            Commercial Plans
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

{
  /* <AccordionItem value="item-1">
                <AccordionTrigger className="p-0 m-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full m-0 hover:underline">
                    Area upto 1400² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="my-10">
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={5499}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type1"}?pack=basic&floors=2&price=4999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={54999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type1"}?pack=full&floors=2&price=49999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={6999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type1"}?pack=basic&floors=3&price=5999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={65999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type1"}?pack=full&floors=3&price=59999`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={7999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type1"}?pack=basic&floors=4&price=6999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={77999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type1"}?pack=full&floors=4&price=69999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={8999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type1"}?pack=basic&floors=5&price=7999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={88999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type1"}?pack=full&floors=5&price=79999`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="p-0 m-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full m-0 hover:underline">
                    Area upto 2800² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="my-10">
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={8999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type2"}?pack=basic&floors=2&price=7999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={64999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type2"}?pack=full&floors=2&price=59999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={9999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type2"}?pack=basic&floors=3&price=8999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={75999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type2"}?pack=full&floors=3&price=69999`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={10999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type2"}?pack=basic&floors=4&price=9999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={87999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type2"}?pack=full&floors=4&price=79999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={16999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type2"}?pack=basic&floors=5&price=10999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={98999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type2"}?pack=full&floors=5&price=89999`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="p-0">
                  <h1 className="font-bold text-3xl p-4 text-center w-full hover:underline">
                    Area upto 4000² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="my-10">
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={15999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type3"}?pack=basic&floors=2&price=13999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={75999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type3"}?pack=full&floors=2&price=69999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={15999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type3"}?pack=basic&floors=3&price=14999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={87999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type3"}?pack=full&floors=3&price=79999`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={16999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type3"}?pack=basic&floors=4&price=15999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={98999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type3"}?pack=full&floors=4&price=89999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={17999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type3"}?pack=basic&floors=5&price=16999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={109999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type3"}?pack=full&floors=5&price=99999`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="p-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full border-black hover:underline">
                    Area upto 5400² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={17999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type4"}?pack=basic&floors=2&price=16999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={87999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type4"}?pack=full&floors=2&price=79999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={19599}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type4"}?pack=basic&floors=3&price=17999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={98999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type4"}?pack=full&floors=3&price=89999`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={19599}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type4"}?pack=basic&floors=4&price=18999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={109999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type4"}?pack=full&floors=4&price=99999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={20599}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type4"}?pack=basic&floors=5&price=19999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={119999}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type4"}?pack=full&floors=5&price=109999`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem> */
}
{
  /* <AccordionItem value="item-5">
                <AccordionTrigger className="p-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full border-black hover:underline">
                    Other Plans
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-scroll flex flex-wrap justify-center gap-2">
                    {otherPlans.map((otherPlan) => (
                      <div key={otherPlan.id}>
                        <ViewPrice
                          pack={`${otherPlan.package}`}
                          price={Number(otherPlan.price)}
                          features={`${otherPlan.features}`}
                          butto={`Proceed with ${otherPlan.package} Plan`}
                          floors={otherPlan.floors}
                          onClick={() => {
                            router.push(
                              `/list/${otherPlan.area}?pack=basic&floors=4&price=18999`
                            );
                          }}
                        />
                      </div>
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem> */
}

{
  /* <AccordionItem value="item-1">
                <AccordionTrigger className="p-0 m-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full m-0 hover:underline">
                    Area upto 1400² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="my-10">
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={13999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type5"}?pack=basic&floors=2&price=12999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={110000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type5"}?pack=full&floors=2&price=100000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={14599}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type5"}?pack=basic&floors=3&price=13999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={120000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type5"}?pack=full&floors=3&price=110000`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={15599}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type5"}?pack=basic&floors=4&price=14999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={130000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type5"}?pack=full&floors=4&price=120000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={16599}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type5"}?pack=basic&floors=5&price=15999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={140000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type5"}?pack=full&floors=5&price=130000`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2">
                <AccordionTrigger className="p-0 m-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full m-0 hover:underline">
                    Area upto 2800² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="my-10">
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={21999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type6"}?pack=basic&floors=2&price=19999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={250000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type6"}?pack=full&floors=2&price=250000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={20999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type6"}?pack=basic&floors=3&price=20999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={260000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type6"}?pack=full&floors=3&price=260000`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={21999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type6"}?pack=basic&floors=4&price=21999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={270000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type6"}?pack=full&floors=4&price=270000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={22999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type6"}?pack=basic&floors=5&price=22999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={280000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type6"}?pack=full&floors=5&price=280000`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger className="p-0">
                  <h1 className="font-bold text-3xl p-4 text-center w-full hover:underline">
                    Area upto 5400² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="my-10">
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={29999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type7"}?pack=basic&floors=2&price=29999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={300000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type7"}?pack=full&floors=2&price=300000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={30999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type7"}?pack=basic&floors=3&price=30999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={310000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type7"}?pack=full&floors=3&price=310000`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={31999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type7"}?pack=basic&floors=4&price=31999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={320000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type7"}?pack=full&floors=4&price=320000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={32999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type7"}?pack=basic&floors=5&price=32999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={330000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type7"}?pack=full&floors=5&price=330000`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4">
                <AccordionTrigger className="p-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full border-black hover:underline">
                    Area upto 10890² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={39999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type8"}?pack=basic&floors=2&price=39999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={350000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type8"}?pack=full&floors=2&price=350000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={40999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type8"}?pack=basic&floors=3&price=40999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={360000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type8"}?pack=full&floors=3&price=360000`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={41999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type8"}?pack=basic&floors=4&price=41999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={370000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type8"}?pack=full&floors=4&price=370000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={42999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type8"}?pack=basic&floors=5&price=42999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={380000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type8"}?pack=full&floors=5&price=380000`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5">
                <AccordionTrigger className="p-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full border-black hover:underline">
                    Area upto 16335² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={49999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type9"}?pack=basic&floors=2&price=49999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={400000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type9"}?pack=full&floors=2&price=400000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={50999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type9"}?pack=basic&floors=3&price=50999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={410000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type9"}?pack=full&floors=3&price=410000`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={51999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type9"}?pack=basic&floors=4&price=51999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={420000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type9"}?pack=full&floors=4&price=420000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={52999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type9"}?pack=basic&floors=5&price=52999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={430000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type9"}?pack=full&floors=5&price=430000`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-6">
                <AccordionTrigger className="p-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full border-black hover:underline">
                    Area upto 21780² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={59999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type10"}?pack=basic&floors=2&price=59999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={450000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type10"}?pack=full&floors=2&price=450000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={60999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type10"}?pack=basic&floors=3&price=60999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={460000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type10"}?pack=full&floors=3&price=460000`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={61999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type10"}?pack=basic&floors=4&price=61999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={470000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type10"}?pack=full&floors=4&price=470000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={62999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type10"}?pack=basic&floors=5&price=62999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={480000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type10"}?pack=full&floors=5&price=480000`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-7">
                <AccordionTrigger className="p-0">
                  <h1 className="font-bold text-center text-3xl p-4 w-full border-black hover:underline">
                    Area upto 27225² feet
                  </h1>
                </AccordionTrigger>
                <AccordionContent>
                  <div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={69999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type11"}?pack=basic&floors=2&price=69999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={500000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={2}
                        onClick={() => {
                          router.push(
                            `/list/${"type11"}?pack=full&floors=2&price=500000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={70999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type11"}?pack=basic&floors=3&price=70999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={510000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={3}
                        onClick={() => {
                          router.push(
                            `/list/${"type11"}?pack=full&floors=3&price=510000`
                          );
                        }}
                      />
                    </div>
                    <div className="flex flex-wrap w-[98.5vw] justify-center gap-2">
                      <ViewPrice
                        pack="Basic"
                        price={71999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type11"}?pack=basic&floors=4&price=71999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={520000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                Elevations | Plumbing Drawings | Electrical Drawings | Joinery
              Drawings"
                        butto="Proceed with Full Package"
                        floors={4}
                        onClick={() => {
                          router.push(
                            `/list/${"type11"}?pack=full&floors=4&price=520000`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Basic"
                        price={72999}
                        features="Layout Plan"
                        butto="Proceed with Basic Plan"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type11"}?pack=basic&floors=5&price=72999`
                          );
                        }}
                      />
                      <ViewPrice
                        pack="Full"
                        price={530000}
                        features="Working Drawings Structure Drawings | 3D - Views | 2D -
                  Elevations | Plumbing Drawings | Electrical Drawings | Joinery
                  Drawings"
                        butto="Proceed with Full Package"
                        floors={5}
                        onClick={() => {
                          router.push(
                            `/list/${"type11"}?pack=full&floors=5&price=530000`
                          );
                        }}
                      />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem> */
}
