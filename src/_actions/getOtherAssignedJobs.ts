"use server";

import prisma from "@/lib/db";
// import { getId } from "./getId";
import { auth } from "@/auth";

export const getOtherAssignedJobs = async () => {
  try {
    // const user = await getId();
    const session = await auth();
    if (!session?.user) {
      return "Request failed! Login Again";
    }

    const request = await prisma.otherRequests.findFirst({
      where: {
        by: session.user.id,
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
