"use client";
import React from "react";
import WorkCard from "./WorkCard";
import { useRouter } from "next/navigation";

const CardHolder = () => {
  const router = useRouter();
  return (
    <div className="flex flex-wrap gap-12 justify-around p-6">
      <div className="scrollAniLeft">
        <WorkCard
          title="Pick your House map"
          content="Enter your plot details to get a customized and perfect layout plan"
          img="/proj3.png"
          Butto="Select Plan"
          onClick={() => {
            router.push("/list");
          }}
        />
      </div>

      <div className="">
        <WorkCard
          title="Select a premium interior plan"
          content="Unlock exclusive features with our premium plans - choose the perfect one for you today"
          img="ava4.jpg"
          Butto="Select Plan"
          onClick={() => {
            router.push("/plans");
          }}
        />
      </div>
      <div className="scrollAniRight">
        <WorkCard
          title="Job Opportunities for Creative Architects and Aspiring Students"
          content="Take on a building design contract and gain invaluable real-world experience."
          img="ava5.jpg"
          Butto="Start Working"
          onClick={() => {
            router.push("/jobs");
          }}
        />
      </div>
    </div>
  );
};

export default CardHolder;
