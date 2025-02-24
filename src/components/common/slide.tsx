import React from "react";

import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

const Slide2 = () => {
  // console.log(screen.width < 700);
  console.log("sad", window.innerHeight > 550 && window.innerHeight < 700);
  return (
    <div className=" z-50 slid2 overflow-hidden mt-6">
      <div className="flex slide-track2 w-[300vw] h-[40vh] lg:h-[60vh] gap-10">
        <div className="slide2">
          <Card
            className={`flex-1 vs:h-[35vh] sm:h-[25vh] sm:text-xl vs:text-base w-[55vw] text-sm h-[35vh] mb-28 lg:mb-0 lg:w-[35vw] bg-gray-50 shadow-2xl hover:bg-gray-100 lg:mt-8 ${
              window.innerHeight > 550 && window.innerHeight < 700
                ? "lg:h-[65vh]"
                : "lg:h-[45vh]"
            } xl:h-[50vh] xl:w-[25vw] xl:mt-0`}
          >
            <CardHeader className="w-full flex items-center">
              <CardTitle>
                <Image
                  alt="gg"
                  src={"/anish.avif"}
                  width={270}
                  className="w-16 lg:w-60 vs:w-28 rounded-full"
                  height={270}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className=" text-center">
              <div className="font-semibold">Anish Choudhary</div>
              Computer Advisor
            </CardContent>
          </Card>
        </div>

        <div className="slide2">
          <Card
            className={`flex-1 vs:h-[35vh] sm:h-[25vh] sm:text-xl vs:text-base w-[55vw] text-sm h-[35vh] mb-28 lg:mb-0 lg:w-[35vw] bg-gray-50 shadow-2xl hover:bg-gray-100 lg:mt-8 ${
              window.innerHeight > 550 && window.innerHeight < 700
                ? "lg:h-[65vh]"
                : "lg:h-[45vh]"
            } xl:h-[50vh] xl:w-[25vw] xl:mt-0`}
          >
            <CardHeader className="w-full flex items-center">
              <CardTitle>
                <Image
                  alt="gg"
                  src={"/shivam.jpg"}
                  width={270}
                  className="w-16 lg:w-60 vs:w-28 rounded-full"
                  height={270}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="font-semibold">Shivam Verma</div>
              Architect
            </CardContent>
          </Card>
        </div>
        <div className="slide2 ">
          <Card
            className={`flex-1 vs:h-[35vh] sm:h-[25vh] sm:text-xl vs:text-base w-[55vw] text-sm h-[35vh] mb-28 lg:mb-0 lg:w-[35vw] bg-gray-50 shadow-2xl hover:bg-gray-100 lg:mt-8 ${
              window.innerHeight > 550 && window.innerHeight < 700
                ? "lg:h-[65vh]"
                : "lg:h-[45vh]"
            } xl:h-[50vh] xl:w-[25vw] xl:mt-0`}
          >
            <CardHeader className="w-full flex items-center">
              <CardTitle>
                <Image
                  alt="gg"
                  src={"/ayush.jpg"}
                  width={300}
                  className="w-16 lg:w-60 vs:w-28 rounded-full"
                  height={300}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="h-full text-center">
              <div className="font-semibold">Ayush Choudhary</div>
              Founder/CEO and chief architect at MapRap and MyNaksha
            </CardContent>
          </Card>
        </div>
        <div className="slide2">
          <Card
            className={`flex-1 vs:h-[35vh] sm:h-[25vh] sm:text-xl vs:text-base w-[55vw] text-sm h-[35vh] mb-28 lg:mb-0 lg:w-[35vw] bg-gray-50 shadow-2xl hover:bg-gray-100 lg:mt-8 ${
              window.innerHeight > 550 && window.innerHeight < 700
                ? "lg:h-[65vh]"
                : "lg:h-[45vh]"
            } xl:h-[50vh] xl:w-[25vw] xl:mt-0`}
          >
            <CardHeader className="w-full flex items-center">
              <CardTitle>
                <Image
                  alt="gg"
                  src={"/pince.jpg"}
                  width={270}
                  className="w-16 lg:w-60 vs:w-28 rounded-full"
                  height={270}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="font-semibold">Prince Arora</div>
              Architect
            </CardContent>
          </Card>
        </div>
        <div className="slide2">
          <Card
            className={`flex-1 vs:h-[35vh] sm:h-[25vh] sm:text-xl vs:text-base w-[55vw] text-sm h-[35vh] mb-28 lg:mb-0 lg:w-[35vw] bg-gray-50 shadow-2xl hover:bg-gray-100 lg:mt-8 ${
              window.innerHeight > 550 && window.innerHeight < 700
                ? "lg:h-[65vh]"
                : "lg:h-[45vh]"
            } xl:h-[50vh] xl:w-[25vw] xl:mt-0`}
          >
            <CardHeader className="w-full flex items-center">
              <CardTitle>
                <Image
                  alt="gg"
                  src={"/raghav.jpg"}
                  width={270}
                  className="w-16 lg:w-60 vs:w-28 rounded-full"
                  height={270}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="font-semibold">Raghav Verma</div>
              Manager,Student at NIT Srinagar
            </CardContent>
          </Card>
        </div>
        <div className="slide2">
          <Card
            className={`pb-2 flex-1 vs:h-[35vh] sm:h-[25vh] sm:text-xl vs:text-base w-[55vw] text-sm h-[35vh] mb-28 lg:mb-0 lg:w-[35vw] bg-gray-50 shadow-2xl hover:bg-gray-100 lg:mt-8 ${
              window.innerHeight > 550 && window.innerHeight < 700
                ? "lg:h-[65vh]"
                : "lg:h-[45vh]"
            } xl:h-[50vh] xl:w-[25vw] xl:mt-0`}
          >
            <CardHeader className="w-full flex items-center">
              <CardTitle>
                <Image
                  alt="gg"
                  src={"/vishwansh.png"}
                  width={220}
                  className="w-16 lg:w-56 vs:w-28 rounded-full"
                  height={220}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <div className="font-semibold">Vishwansh Kumar</div>
              Website Devloper, Student at NIT Srinagar
            </CardContent>
          </Card>
        </div>
        <div className="slide2">
          <Card
            className={`flex-1 vs:h-[35vh] sm:h-[25vh] sm:text-xl vs:text-base w-[55vw] text-sm h-[35vh] mb-28 lg:mb-0 lg:w-[35vw] bg-gray-50 shadow-2xl hover:bg-gray-100 lg:mt-8 ${
              window.innerHeight > 550 && window.innerHeight < 700
                ? "lg:h-[65vh]"
                : "lg:h-[45vh]"
            } xl:h-[50vh] xl:w-[25vw] xl:mt-0`}
          >
            <CardHeader className="w-full flex items-center">
              <CardTitle>
                <Image
                  alt="gg"
                  src={"/user.jpg"}
                  width={230}
                  className="w-16 lg:w-60 vs:w-28 rounded-full"
                  height={230}
                />
              </CardTitle>
            </CardHeader>
            <CardContent className="text-center flex justify-center text-sm">
              <div className="bg-gray-100 w-fit h-fit rounded-lg">
                +25 more from Tier-1 Colleges
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Slide2;
