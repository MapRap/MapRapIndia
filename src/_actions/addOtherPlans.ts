"use server";

import prisma from "@/lib/db";

export const addPlan = async ({
  floors,
  area,
  inr,
  features,
  pack,
  property,
  dollar,
}: {
  floors: number;
  area: string;
  inr: string;
  features: string;
  pack: string;
  property: string;
  dollar: string;
}) => {
  try {
    const plan = await prisma.plans.create({
      data: {
        floors: floors,
        area: area,
        inr: inr,
        features: features,
        package: pack,
        type: area,
        dollar: dollar,
        property: property,
      },
    });
    if (!plan) {
      return "Network Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
