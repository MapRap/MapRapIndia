"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";
// import { getId } from "./getId";
export const getClientOtherJobs = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return "Please login to continue";
    }

    const otherJobs = await prisma.otherJobs.findMany({
      where: {
        givenBy: session.user.id,
        paid: true,
      },
    });
    if (!otherJobs) {
      return "Network Error";
    }
    // console.log("d=", user.id);

    return otherJobs;
  } catch (err) {
    console.log(err);
  }
};
