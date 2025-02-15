"use client";
import { Loading2 } from "@/components/common/loader2";
// import { getClientJobsWithSteps } from "@/_actions/getClientJobs";
// import { getId } from "@/_actions/getId";
// import { Loading2 } from "@/components/common/loader2";
import PricingCard from "@/components/common/pricingCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
// import { set } from "date-fns";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";

const PlanPage = () => {
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
  // const [jobs, setJobs] = useState<
  //   {
  //     id: string;
  //     type: string;
  //     direction: string;
  //     floors: number;
  //     price: number;
  //     plot: string;
  //     specifications: string | null;
  //     imageUrl: string;
  //     A: number;
  //     B: number;
  //     C: number;
  //     D: number;
  //     E: number | null;
  //     D1: number | null;
  //     D3: number | null;
  //     D4: number | null;
  //     D2: number | null;
  //     givenBy: string;
  //     isVerified: boolean | null;
  //     assignedTo: string | null;
  //     completed: boolean;
  //     publishable: boolean;
  //     name: string;
  //     phone: string;
  //     interior: string;
  //   }[]
  // >([]);
  //   console.log(job?.interior);
  const session = useSession();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    console.log(session);
    if (session) {
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div className="flex w-screen h-screen items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div className="bg-[url(https://utfs.io/f/GH57qH88dIR16XKLQ9jxgPGhBNQryDlCL3wSsbFTdA1ni47v)] h-full min-h-screen">
      <div className="">
        <div className="border-blue-600 bg-[#474747] opacity-65 order-4 rounded-xl">
          <div className="w-full text-white underline text-center text-3xl font-bold">
            Interior Design
          </div>

          {/* {jobs.length!==0 && jobs.map((job)=>{
            return(

              
              job.map((j) => {
                return (
                  <div
                  className="text-center lg:text-xl underline text-white mb-2"
                  key={j.id}
                  >
                  Current Interior plan : {j?.interior}
                  Area: {j.type}
                </div>
              );
            })}
          )

          })) */}
          {/* {jobs.length !== 0 &&
            jobs.map((job) => {
              return (
                <div
                  className="text-center lg:text-xl underline text-white mb-2"
                  key={job.id}
                >
                  <div>Current Interior plan : {job?.interior}</div>
                  Area:{} {job.type}
                </div>
              );
            })} */}
        </div>
        {/* {job && (
          <div className="text-center lg:text-xl underline text-gray-100 m-2">
          Current Exterior plan : {job?.premium ? "Premium" : "Basic"}
          </div>
          )} */}
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="item-1">
            <AccordionTrigger className="bg-black opacity-65">
              <div className="flex items-center justify-center">
                <div className="w-[98.5vw] rounded-xl text-white underline mb-5 text-center text-xl font-bold">
                  Residential Design
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-wrap items-center w-[95vw] m-2 gap-6 justify-center">
                <PricingCard
                  type="Silver"
                  price={30}
                  features="Assigned to Finest Experts"
                  user={session.data?.user}
                  building="Residential"
                />
                <div className="bg-blue-600 text-white rounded-xl ">
                  <div className="text-center text-xl font-semibold">
                    Most Popular
                  </div>
                  <PricingCard
                    type="Gold"
                    price={60}
                    features="Unique Work | Assigned to Finest Experts"
                    user={session.data?.user}
                    building="Residential"
                  />
                </div>
                <PricingCard
                  type="Platinum"
                  price={80}
                  features="Unique Work | Assigned to Finest Experts | First Priority"
                  user={session.data?.user}
                  building="Residential"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="item-2">
            <AccordionTrigger className="bg-black opacity-65">
              {" "}
              <div className="flex items-center justify-center">
                <div className="w-[98.5vw] text-white underline rounded-xl mb-5 text-center text-xl font-bold">
                  Commercial Design
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent>
              <div className="pb-2 flex flex-wrap items-center w-[95vw] mt-2 mx-2 gap-6 justify-center">
                <PricingCard
                  type="Silver"
                  price={30}
                  features="Assigned to Finest Experts"
                  user={session.data?.user}
                  building="Commercial"
                />
                <div className="bg-blue-600 text-white rounded-xl ">
                  <div className="text-center text-xl font-semibold">
                    Most Popular
                  </div>
                  <PricingCard
                    type="Gold"
                    price={60}
                    features="Unique Work | Assigned to Finest Experts"
                    user={session.data?.user}
                    building="Commercial"
                  />
                </div>
                <PricingCard
                  type="Platinum"
                  price={100}
                  features="Unique Work | Assigned to Finest Experts | First Priority"
                  user={session.data?.user}
                  building="Commercial"
                />
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};
export default PlanPage;
