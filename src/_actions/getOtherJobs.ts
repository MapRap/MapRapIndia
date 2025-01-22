"use server";

import prisma from "@/lib/db";
// import { getId } from "./getId";

export const getOtherJobs = async () => {
  try {
    // const user = await getId();
    // if (user === "/unauthorized") {
    //   return user;
    // }
    const jobs = await prisma.otherJobs.findMany({
      include: {
        requests: true,
      },
    });
    // console.log("daea");
    if (!jobs) {
      return "No Jobs";
    }
    if (jobs === null) {
      return "No Jobs";
    }
    return jobs;
  } catch (err) {
    console.log(err);
  }
};
