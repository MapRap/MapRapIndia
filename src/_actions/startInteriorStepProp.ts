"use server";

import prisma from "@/lib/db";

export const startInteriorStepProp = async ({ id }: { id: string }) => {
  try {
    const step = await prisma.interiorSteps.findUnique({
      where: { id: id },
    });
    if (!step) {
      return "No such step";
    }
    const changedStep = await prisma.interiorSteps.update({
      where: {
        id: id,
      },
      data: {
        started: true,
      },
    });
    if (!changedStep) {
      return "error";
    }
    return "Successfully strted the step";
  } catch (err) {
    console.log(err);
  }
};
