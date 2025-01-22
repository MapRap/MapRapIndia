"use server";

import prisma from "@/lib/db";

export const deletePlan = async ({ id }: { id: string }) => {
  try {
    const plan = await prisma.plans.delete({
      where: {
        id: id,
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
