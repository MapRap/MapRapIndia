"use server";

import prisma from "@/lib/db";
import { getId } from "./getId";

export const getAssignedJobs = async () => {
  try {
    const user = await getId();
    if (!user) {
      return "Request failed";
    }
    if (user === "/unauthorized") {
      return "Login Again!";
    }
    const jobs = await prisma.maps.findMany({
      where: {
        assignedTo: user.id,
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
