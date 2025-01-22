"use server";

import prisma from "@/lib/db";
import { getId } from "./getId";
export const getClientOtherJobs = async () => {
  try {
    const user = await getId();
    if (!user) {
      return "Network Error";
    } else if (user === "/unauthorized") {
      return "Please login to continue";
    }

    const otherJobs = await prisma.otherJobs.findMany({
      where: {
        givenBy: user.id,
        paid: true,
      },
    });
    if (!otherJobs) {
      return "Network Error";
    }
    console.log("d=", user.id);

    return otherJobs;
  } catch (err) {
    console.log(err);
  }
};
