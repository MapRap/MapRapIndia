"use server";

import prisma from "@/lib/db";

export const editPlan = async ({
  id,
  pack,
  features,
  inr,
  area,
  floors,
  //   type,
  dollar,
  property,
}: {
  id: string;
  pack: string;
  features: string;
  inr: string;
  area: string;
  floors: number;
  //   type: string;
  dollar: string;
  property: string;
}) => {
  try {
    const plan = await prisma.plans.update({
      where: {
        id: id,
      },
      data: {
        package: pack,
        features: features,
        inr: inr,
        area: area,
        floors: floors,
        // type: type,
        dollar: dollar,
        property: property,
      },
    });
    if (!plan) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
