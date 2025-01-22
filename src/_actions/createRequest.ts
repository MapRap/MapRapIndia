"use server";

import prisma from "@/lib/db";
import { getId } from "./getId";

export const createRequest = async ({
  userId,
  jobId,
}: {
  userId: string;
  jobId: string;
}) => {
  try {
    const requests = await prisma.requests.findFirst({
      where: {
        by: userId,
        jobId: jobId,
      },
    });
    if (requests) {
      return "You have already made a Request, please wait for confirmation";
    }
    const s = await getId();
    if (s) {
      if (s !== "/unauthorized") {
        const user = await prisma.maps.update({
          where: {
            id: jobId,
          },
          data: {
            requests: {
              create: [{ by: userId, stars: s.stars }],
            },
          },
          include: {
            requests: true,
          },
        });
        if (!user) {
          return "Network error, please try again";
        }
        return user.requests;
      }
    }
    // const user = await prisma.requests.create({
    //   data: {
    //     by: userId,
    //     maps: {
    //       connect: {
    //         id: jobId,
    //       },
    //     },
    //   },
    // });
    // return user;
  } catch (err) {
    console.log("Ab");
    console.log(err);
  }
};
