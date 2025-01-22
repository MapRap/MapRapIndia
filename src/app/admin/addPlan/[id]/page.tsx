"use client";
import { deletePlan } from "@/_actions/deletePlan";
import { editPlan } from "@/_actions/editPlan";
// aimport { Button } from "@/components/ui/button";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowRightIcon } from "lucide-react";
import { useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
// import { Button } from "react-day-picker";

type tParams = Promise<{ id: string }>;

const EditPlanPage = (props: { params: tParams }) => {
  const searchParams = useSearchParams();
  const [pack, setPack] = useState(`${searchParams.get("pack")}`);
  const [inr, setInr] = useState(searchParams.get("inr"));
  const [dollar, setDollar] = useState(searchParams.get("dollar"));
  const [property, setProperty] = useState(`${searchParams.get("property")}`);
  const [features, setFeatures] = useState(`${searchParams.get("features")}`);
  const [floors, setFloors] = useState(Number(searchParams.get("floors")));
  const [id, setId] = useState("");

  useEffect(() => {
    props.params.then((e) => {
      setId(e.id);
    });
  });
  return (
    <div className="flex items-center justify-center h-screen">
      {" "}
      <Card className="w-[70vw] bg-slate-300 lg:w-[23vw] shadow-none border-none flex flex-col gap-4">
        <CardTitle>
          <CardHeader className="text-black text-sm sm:text-xl lg:text-2xl p-0 flex justify-center flex-row">
            <div className="w-1/2">
              <Input
                value={pack}
                onChange={(e) => {
                  setPack(e.target.value);
                }}
                className="border-black bg-gray-50 w-full"
              />{" "}
            </div>
            <div className="w-1/3">Package</div>
          </CardHeader>
        </CardTitle>
        <CardContent className="text-slate-800 p-0 text-[12px] sm:text-base md:text-lg lg:text-base flex flex-col gap-4">
          <div className="h-7 flex gap-3 items-center">
            Price: {"   "}₹{""}
            <div className="w-1/3 flex">
              <Input
                value={`${inr}`}
                onChange={(e) => {
                  setInr(e.target.value);
                }}
                className="border-black bg-gray-50 w-full"
              />{" "}
            </div>
            {"  "}${" "}
            <div className="w-1/3 flex">
              <Input
                value={`${dollar}`}
                onChange={(e) => {
                  setDollar(e.target.value);
                }}
                className="border-black bg-gray-50 w-full"
              />{" "}
            </div>
          </div>
          <div>
            {" "}
            <div className="w-1/2">
              <Input
                value={property}
                onChange={(e) => {
                  setProperty(e.target.value);
                }}
                className="border-black bg-gray-50 w-full"
              />{" "}
            </div>
          </div>
          <div>Area : {`${searchParams.get("area")}`}</div>
          <div className="h-20 lg:h-[20vh]">
            Includes:
            <div className="h-1/2">
              <Textarea
                value={features}
                onChange={(e) => {
                  setFeatures(e.target.value);
                }}
                className="border-black bg-gray-50 w-full h-full"
              />{" "}
            </div>
          </div>
          <div className="">
            Total floors:{" "}
            <div className="w-1/2">
              <Input
                value={floors}
                type="number"
                onChange={(e) => {
                  const val = e.target.value ? Number(e.target.value) : 0;
                  setFloors(val);
                }}
                className="border-black bg-gray-50 w-full"
              />{" "}
            </div>
            {` (Ground +${floors - 1})`}
          </div>
          <div className="flex items-between justify-around ">
            <Button
              className="bg-red-600 hover:bg-red-700"
              onClick={() => {
                deletePlan({ id: id }).then((e) => {
                  if (e) {
                    if (e === "Success") {
                      window.location.replace(`/admin/addPlan`);
                    }
                  }
                });
              }}
            >
              Delete Plan
            </Button>
            <Button
              className="bg-green-700 h-full hover:bg-green-800 mx-0 "
              onClick={() => {
                editPlan({
                  id,
                  pack,
                  floors,
                  inr: `${inr ? inr : ""}`,
                  features,
                  dollar: `${dollar ? dollar : ""}`,
                  area: `${searchParams.get("area")}`,
                  // type: "",
                  property: property,
                }).then((e) => {
                  if (e) {
                    if (e === "Success") {
                      window.location.replace(`/admin/addPlan`);
                    }
                  }
                });
              }}
            >
              Save Plan
              <ArrowRightIcon />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EditPlanPage;
