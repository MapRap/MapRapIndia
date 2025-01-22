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
          title="Construct your Building"
          content="Provide the dimensions of your land along with detailed information
        about your house."
          img="ava1.webp"
          Butto="Give Details"
          onClick={() => {
            router.push("/list");
          }}
        />
      </div>

      <div>
        <WorkCard
          title="Select a premium interior plan"
          content="Unlock exclusive features with our premium plans – choose the perfect one for you today"
          img="ava3.webp"
          Butto="Select Plan"
          onClick={() => {
            router.push("/plans");
          }}
        />
      </div>
      <div className="scrollAniRight">
        <WorkCard
          title="Work on a project"
          content="Take on a building design contract and gain invaluable real-world experience."
          img="ava2.webp"
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
