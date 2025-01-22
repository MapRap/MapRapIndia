"use server";

import prisma from "@/lib/db";

export const getAllInteriorJobs = async () => {
  try {
    const jobs = await prisma.interior.findMany({
      include: {
        steps: true,
      },
    });
    if (!jobs) {
      return "Network Error";
    }
    return jobs;
  } catch (err) {
    console.log(err);
  }
};
