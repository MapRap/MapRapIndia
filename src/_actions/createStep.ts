"use server";

import prisma from "@/lib/db";

export const createStep = async ({
  jobId,
  step,
  type,
}: {
  jobId: string;
  step: number;
  type: string;
}) => {
  try {
    const job = prisma.maps.findUnique({
      where: {
        id: jobId,
      },
    });
    if (!job) {
      return "No such job exists";
    }
    const res = await prisma.steps.create({
      data: {
        jobId: jobId,
        type: type,
        currentStep: step,
        started: true,
      },
    });
    if (!res) {
      return "Network error";
    }
    return res;
  } catch (err) {
    console.log(err);
  }
};
