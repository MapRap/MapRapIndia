"use server";

import prisma from "@/lib/db";

export const completeInteriorStep = async ({ id }: { id: string }) => {
  try {
    const step = await prisma.interiorSteps.update({
      where: {
        id: id,
      },
      data: {
        completed: true,
      },
    });
    if (!step) {
      return "No such order, please make a request";
    }
    return step;
  } catch (err) {
    console.log(err);
  }
};
