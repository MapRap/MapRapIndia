"use server";

import prisma from "@/lib/db";

export const getOtherPlans = async () => {
  try {
    const plans = await prisma.plans.findMany({});
    if (!plans) {
      return "Network Error";
    }
    return plans;
  } catch (err) {
    console.log(err);
  }
};
