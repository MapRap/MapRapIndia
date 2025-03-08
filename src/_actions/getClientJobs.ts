"use server";

// import { cookies } from "next/headers";
// import { decodeAuthToken } from "./token-generator";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export const getClientJobsWithSteps = async () => {
  try {
    // const cookieStore = await cookies();
    // const token = cookieStore.get("token");
    // // console.log(token);
    // if (!token?.value) {
    //   return "Please login";
    // }
    const session = await auth();
    if (!session?.user) {
      return "Wrong token, please login again!";
    } else if (!session.user.id) {
      return "Wrong token, please login again!";
    } else {
      if (session.user) {
        // console.log("Fata=", data);
        const unPaidJobs = await prisma.maps.deleteMany({
          where: { givenBy: session.user.id, initialPayment: false },
        });
        if (!unPaidJobs) {
          return `${session.user.id}`;
        }
        const job = await prisma.maps.findMany({
          where: {
            givenBy: session.user.id,
          },
          include: {
            steps: true,
          },
        });
        if (!job) {
          // console.log("hey");
          return `${session.user.id}`;
        }
        // console.log("job=", job);
        if (job !== null) {
          if (job[0] === undefined) {
            return `${session.user.id}`;
          }
          return job;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
