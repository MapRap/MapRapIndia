"use server";

import prisma from "@/lib/db";
import { auth } from "@/auth";
export const getClientInteriorJobs = async () => {
  try {
    const session = await auth();
    if (!session?.user) {
      return "Wrong token, please login again!";
    } else if (!session.user.id) {
      return "Wrong token, please login again!";
    } else {
      if (session.user) {
        // console.log(session.user.id);
        const unPaidJobs = await prisma.interior.deleteMany({
          where: { givenBy: session.user.id, initialPayment: false },
        });
        if (!unPaidJobs) {
          return "No jobs";
        }
        console.log("bef", unPaidJobs);
      }
    }
    const interiorJobs = await prisma.interior.findMany({
      where: {
        givenBy: session.user.id,
      },
      include: {
        steps: true,
      },
    });
    if (!interiorJobs) {
      return "Network Error";
    }
    console.log("ke", interiorJobs);
    if (interiorJobs === null) {
      return "Network Error";
    }
    // console.log("d=", user.id);

    return interiorJobs;
  } catch (err) {
    console.log(err);
    // return "Error";
  }
};
