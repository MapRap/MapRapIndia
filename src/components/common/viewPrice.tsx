"use client";
import React from "react";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowRightIcon } from "@radix-ui/react-icons";
type Props = {
  pack: string;
  // price: number;
  features: string;
  butto: string;
  floors: number;
  onClick: () => void;
  property: string;
  currency: string;
  inr: string;
  dollar: string;
};

const ViewPrice = ({
  pack,
  // price,
  inr,
  dollar,
  features,
  butto,
  floors,
  onClick,
  property,
  currency,
}: Props) => {
  console.log(dollar);
  //   console.log(query.get("singePrice"));
  // const router = useRouter();
  // const onClick = () => {
  //   router.push(`/list/${"type1"}`);
  // };
  return (
    <div className="flex m-4 justify-center items-center w-min border-white border-2 cursor-pointer rounded-xl bg-[#aeb4bd] hover:bg-[#a7b9d5] h-fit lg:min-w-[25vw]">
      <div className="flex flex-col gap-2 lg:gap-6 items-center h-full">
        {pack === "Basic" ? (
          <img
            src="../work4.webp"
            alt=""
            // width={230}
            className="lg:min-w-[19vw] h-[20vh] rounded-xl"
          />
        ) : (
          <img
            src="../work5.webp"
            alt=""
            // width={230}
            className="lg:min-w-[19vw] h-[20vh] rounded-xl"
          />
        )}
        <Card className="w-[70vw] lg:w-[27vw] lg:h-full shadow-none h-fit border-none bg-transparent">
          <CardTitle>
            <CardHeader className="text-black text-sm sm:text-xl lg:text-2xl p-0">
              {pack} Package
            </CardHeader>
          </CardTitle>
          <CardContent className="text-slate-800 p-0 text-[12px] sm:text-base md:text-lg lg:text-base">
            <div className="h-7">
              Price: {currency === "INR" ? `₹ ${inr}` : `$ ${dollar}`}
            </div>
            <div>{property}</div>
            <div className="h-20 lg:h-[20vh]">Includes:{features}</div>
            <div className="">
              Total floors: {floors}
              {` (Ground +${floors - 1})`}
            </div>
            <div className="flex items-end ">
              <Button
                className="bg-green-800 h-full hover:bg-[#a22d2d] mx-0 w-full rounded-none rounded-b-xl"
                onClick={onClick}
              >
                {butto}
                <ArrowRightIcon />
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ViewPrice;
