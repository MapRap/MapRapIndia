"use server";
import prisma from "@/lib/db";

export const getJobs = async () => {
  try {
    const jobs = await prisma.maps.findMany({
      include: { requests: true, steps: true },
    });
    // console.log(jobs);
    if (!jobs) {
      return "No jobs";
    }
    if (jobs === null) {
      return "No jobs";
    }

    return jobs;
  } catch (err) {
    console.log(err);
  }
};
