"use server";

import prisma from "@/lib/db";
// import { StringValidation } from "zod";

export const createFirstInteriorStep = async ({
  jobId,
  type,
  steps,
}: {
  jobId: string;
  type: string;
  steps: number;
}) => {
  try {
    const step = await prisma.interiorSteps.create({
      data: {
        jobId: jobId,
        type: type,
        started: true,
        totalSteps: steps,
      },
    });
    if (!step) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
