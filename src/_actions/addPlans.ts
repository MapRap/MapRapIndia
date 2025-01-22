"use server";

import { areaPlans } from "@/lib";
import prisma from "@/lib/db";
// import { features } from "process"
// import { fetchExternalImage } from "next/dist/server/image-optimizer"

// import { Chakra_Petch } from "next/font/google"

export const addAreaPlans = async () => {
  try {
    areaPlans.map(async (plan) => {
      const plans = await prisma.plans.create({
        data: {
          package: plan.pack,
          features: plan.features,
          inr: plan.inr,
          dollar: plan.dollar,
          area: plan.area,
          floors: plan.floors,
          type: plan.type,
          property: plan.plan,
        },
      });
      if (!plans) {
        return "Error";
      }
    });
    return "Successa";
  } catch (err) {
    console.log(err);
  }
};
