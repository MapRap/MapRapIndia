"use server";

import prisma from "@/lib/db";
// import { StringValidation } from "zod";

export const createFirstInteriorStep = async ({
  jobId,
  type,
  receipt,
}: {
  jobId: string;
  type: string;
  receipt: string;
}) => {
  try {
    const step = await prisma.interiorSteps.create({
      data: {
        jobId: jobId,
        type: type,
        started: true,
        receipt: receipt,
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
