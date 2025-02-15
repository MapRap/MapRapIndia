"use server";

import prisma from "@/lib/db";
// import { getId } from "./getId";
import { auth } from "@/auth";

export const getAssignedJobs = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return "Request failed! Login Again";
    }

    const jobs = await prisma.maps.findMany({
      where: {
        assignedTo: session.user.id,
      },
      include: {
        steps: true,
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
