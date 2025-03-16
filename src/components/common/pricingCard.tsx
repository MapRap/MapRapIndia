import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { User } from "next-auth";
// import { Input } from "../ui/input";
// import { RazorpayPaymentResponse } from "./trapPlot";
// import { useUploadThing } from "@/lib/uploadthing";
// import { getClientJobsWithSteps } from "@/_actions/getClientJobs";
// import { areaList } from "@/lib";
// import { getId } from "@/_actions/getId";
// import { changeExteriorPlan } from "@/_actions/changePlan";

const PricingCard = ({
  type,
  price,
  features,
  building,
  user,
}: {
  type: string;
  price: number;
  features: string;
  building: string;
  user:
    | (User & {
        type: string;
      })
    | undefined;
}) => {
  // const [area, setArea] = useState("");
  const [message, setMessage] = useState("");
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
  // useEffect(() => {
  // getClientJobsWithSteps().then((j) => {
  //   if (j) {
  //     // console.log(j);
  //     if (typeof j !== "string") {
  //       // console.log(j.interior);
  //       setJobas(j);
  //     }
  //   }
  // });
  // }, []);

  return (
    <Card
      className={` ${
        type === "Platinum" && "bg-blue-600 border-4"
      } hover:bg-gray-100 bg-gray-50 lg:w-[30vw]`}
    >
      <CardTitle>
        <CardHeader className={`lg:text-2xl text-blue-600`}>{type}</CardHeader>
      </CardTitle>
      <CardContent className="">
        <div className="m-2 text-[#313030] text-3xl">Rs. {price}/sq. Feet</div>
        <div className="m-2 text-[#313030] flex gap-2 text-lg">
          Features:
          <div className="text-gray-600">{features}</div>
        </div>
        {/* <div>
          <Input
            className="bg-white my-2 mb-4"
            placeholder="Enter Area of your land"
            onChange={(e) => {
              setArea(e.currentTarget.value);
            }}
          />
        </div> */}
        <Button
          className={`${
            type === "Gold"
              ? "bg-blue-600 hover:bg-blue-700"
              : "text-blue-600 hover:bg-gray-200 bg-white border-blue-600 border-2"
          }`}
          onClick={() => {
            if (user) {
              window.location.replace(
                `${
                  process.env.NEXT_PUBLIC_DOMAIN_NAME
                }/plans/choose?price=${price}&title=${type.toLowerCase()}&property=${building}`
              );
            } else {
              setMessage("Please Login to continue!");
            }
          }}
        >
          Choose this plan
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
  );
};

export default PricingCard;
