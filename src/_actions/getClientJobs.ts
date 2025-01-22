"use server";

import { cookies } from "next/headers";
import { decodeAuthToken } from "./token-generator";
import prisma from "@/lib/db";

export const getClientJobsWithSteps = async () => {
  try {
    const cookieStore = await cookies();
    const token = cookieStore.get("token");
    // console.log(token);
    if (!token?.value) {
      return "Please login";
    }
    const data = await decodeAuthToken(`${token.value}`);
    if (!data) {
      return "Wrong token, please login again!";
    } else if (!data.payload.id) {
      return "Wrong token, please login again!";
    } else {
      if (data) {
        console.log("Fata=", data);
        const job = await prisma.maps.findMany({
          where: {
            givenBy: data.payload.id,
          },
          include: {
            steps: true,
          },
        });
        if (!job) {
          console.log("hey");
          return `${data.payload.id}`;
        }
        console.log("job=", job);
        if (job !== null) {
          if (job[0] === undefined) {
            return `${data.payload.id}`;
          }
          return job;
        }
      }
    }
  } catch (err) {
    console.log(err);
  }
};
