"use server";

import prisma from "@/lib/db";

export const startStepProp = async ({ id }: { id: string }) => {
  try {
    const step = await prisma.steps.findUnique({
      where: { id: id },
    });
    if (!step) {
      return "No such step";
    }
    const changedStep = await prisma.steps.update({
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
