"use client";
import { addPlan } from "@/_actions/addOtherPlans";
import { getOtherPlans } from "@/_actions/getOtherPlans";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { addAreaPlans } from "@/_actions/addPlans";
import { Button } from "@/components/ui/button";
import {
  Card,
  //   CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import EditPriceCard from "@/components/common/editPriceCard";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
// import { Tabs } from "@radix-ui/react-tabs";
import React, { useEffect, useState } from "react";
// import { Aladin } from "next/font/google";

const AddPlanPage = () => {
  const router = useRouter();
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
  const [pack, setPack] = useState("");
  const [property, setProperty] = useState("");
  const [features, setFeatures] = useState("");
  const [inr, setInr] = useState("");
  const [dollar, setDollar] = useState("");
  const [area, setArea] = useState("");
  const [floors, setFloors] = useState(0);
  const [error, setError] = useState("");
  useEffect(() => {
    getOtherPlans().then((e) => {
      if (e) {
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
  }, []);
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle>Add Plan</CardTitle>
          {/* <CardDescription> */}
          {/* <div> */}
          <div>
            Package:{" "}
            <Input
              type="text"
              className="hover:border-slate-400"
              onChange={(e) => {
                setPack(e.target.value);
              }}
            />
          </div>
          <div>
            Price {"(in ₹)"}:{" "}
            <Input
              type="text"
              className="hover:border-slate-400"
              onChange={(e) => {
                setInr(e.target.value);
              }}
            />
          </div>
          <div>
            Price {"(in $)"}:{" "}
            <Input
              type="text"
              className="hover:border-slate-400"
              onChange={(e) => {
                setDollar(e.target.value);
              }}
            />
          </div>
          <div>
            Features:{" "}
            <Input
              type="text"
              className="hover:border-slate-400"
              onChange={(e) => {
                setFeatures(e.target.value);
              }}
            />
          </div>
          <div>
            Area{" "}
            <Input
              type="text"
              className="hover:border-slate-400"
              onChange={(e) => {
                setArea(e.target.value);
              }}
            />
          </div>
          <div>
            Floors {"(Including Ground Floor)"}{" "}
            <Input
              type="number"
              className="hover:border-slate-400"
              onChange={(e) => {
                const value = e.target.value ? Number(e.target.value) : 0;
                setFloors(value);
              }}
            />
          </div>
          <div>
            Residential/Commercial{" "}
            <Input
              className="hover:border-slate-400"
              onChange={(e) => {
                setProperty(e.target.value);
              }}
            />
          </div>
          <div>
            <Button
              onClick={() => {
                addPlan({
                  floors: floors,
                  inr: inr,
                  dollar: dollar,
                  pack: pack,
                  features: features,
                  area: area,
                  property: property,
                }).then((e) => {
                  if (e) {
                    if (e === "Success") {
                      window.location.reload();
                    } else {
                      setError("Network Error");
                    }
                  }
                });
              }}
            >
              Add Plan
            </Button>
            <div className="bg-red-300 m-3 text-center text-red-600">
              {error}
            </div>
          </div>
          {/* </div> */}
          {/* </CardDescription> */}
        </CardHeader>
        {/* <Button
        onClick={() => {
          addAreaPlans();
          }}
          >
        Add Plans
      </Button> */}
      </Card>
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
                        <div className="flex flex-wrap justify-center">
                          {plans.map((plan) => {
                            if (plan.area === item.area) {
                              if (
                                plan.property === "Residential" &&
                                plan.package === "Basic"
                              ) {
                                return (
                                  <div key={plan.id} className="m-2">
                                    <EditPriceCard
                                      pack={plan.package}
                                      price={Number(plan.inr)}
                                      features={plan.features}
                                      floors={plan.floors}
                                      property={`${plan.property}`}
                                      butto="Edit"
                                      onClick={() => {
                                        router.push(
                                          `/admin/addPlan/${plan.id}?pack=${plan.package}&inr=${plan.inr}&features=${plan.features}&floors=${plan.floors}&property=${plan.property}&area=${plan.area}&dollar=${plan.dollar}`
                                        );
                                      }}
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
                                    <EditPriceCard
                                      pack={plan.package}
                                      price={Number(plan.inr)}
                                      features={plan.features}
                                      floors={plan.floors}
                                      property={`${plan.property}`}
                                      butto="Edit"
                                      onClick={() => {
                                        router.push(
                                          `/admin/addPlan/${plan.id}?pack=${plan.package}&inr=${plan.inr}&features=${plan.features}&floors=${plan.floors}&property=${plan.property}/area=${plan.area}&dollar=${plan.dollar}`
                                        );
                                      }}
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
                                    <EditPriceCard
                                      pack={plan.package}
                                      price={Number(plan.inr)}
                                      features={plan.features}
                                      floors={plan.floors}
                                      property={plan.property}
                                      butto="Edit"
                                      onClick={() => {
                                        router.push(
                                          `/admin/addPlan/${plan.id}?pack=${plan.package}&inr=${plan.inr}&features=${plan.features}&floors=${plan.floors}&property=${plan.property}/area=${plan.area}&dollar=${plan.dollar}`
                                        );
                                      }}
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
                                    <EditPriceCard
                                      pack={plan.package}
                                      price={Number(plan.inr)}
                                      features={plan.features}
                                      floors={plan.floors}
                                      property={`${plan.property}`}
                                      butto="Edit"
                                      onClick={() => {
                                        router.push(
                                          `/admin/addPlan/${plan.id}?pack=${plan.package}&inr=${plan.inr}&features=${plan.features}&floors=${plan.floors}&property=${plan.property}/area=${plan.area}&dollar=${plan.dollar}`
                                        );
                                      }}
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

export default AddPlanPage;
