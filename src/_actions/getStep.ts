"use server";

import prisma from "@/lib/db";

export const getStep = async (jobId: string, step: number) => {
  try {
    const res = prisma.steps.findFirst({
      where: {
        jobId: jobId,
        currentStep: step,
      },
    });
    if (!res) {
      return "No one assigned";
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};
