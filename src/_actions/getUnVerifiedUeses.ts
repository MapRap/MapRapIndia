"use server";

import prisma from "@/lib/db";

export const notVerifiedUsers = async () => {
  try {
    const notVerified = await prisma.realUsers.findMany({
      where: {
        isReal: false,

        type: { in: ["student", "professional"] },
      },
    });
    if (!notVerified) {
      console.log("No new Users");
      return "No new users";
    }
    console.log("DF");
    return notVerified;
  } catch (err) {
    console.log(err);
  }
};
