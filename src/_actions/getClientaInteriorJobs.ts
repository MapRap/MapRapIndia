"use server";

import prisma from "@/lib/db";
import { getId } from "./getId";
export const getClientInteriorJobs = async () => {
  try {
    const user = await getId();
    if (!user) {
      return "Network Error";
    } else if (user === "/unauthorized") {
      return "Please login to continue";
    }

    const interiorJobs = await prisma.interior.findMany({
      where: {
        givenBy: user.id,
      },
      include: {
        steps: true,
      },
    });
    if (!interiorJobs) {
      return "Network Error";
    }
    console.log("d=", user.id);

    return interiorJobs;
  } catch (err) {
    console.log(err);
  }
};
