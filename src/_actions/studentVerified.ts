"use server";
import prisma from "@/lib/db";
import { getId } from "./getId";

export const verifiedStudents = async () => {
  try {
    const user = await getId();
    if (typeof user !== "string") {
      if (user.type === "student" || user.type === "professional") {
        const real = await prisma.realUsers.findUnique({
          where: {
            id: user.id,
            type: {
              in: ["student", "professional"],
            },
          },
        });
        if (!real) {
          throw Error("No such user");
        }
        return real.isReal;
      }
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
};
