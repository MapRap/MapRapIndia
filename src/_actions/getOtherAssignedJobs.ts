"use server";

import prisma from "@/lib/db";
import { getId } from "./getId";

export const getOtherAssignedJobs = async () => {
  try {
    const user = await getId();
    if (!user) {
      return "Request failed";
    }
    if (user === "/unauthorized") {
      return "Login Again!";
    }
    const request = await prisma.otherRequests.findFirst({
      where: {
        by: user.id,
        approved: true,
      },
    });
    if (!request) {
      return "No Jobs assigned to you";
    }

    const jobs = await prisma.otherJobs.findMany({
      where: {
        id: request.otherJobId,
      },
    });
    if (!jobs) {
      return "No Jobs assigned to you";
    }
    return jobs;
  } catch (err) {
    console.log(err);
  }
};
