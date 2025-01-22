"use server";

import prisma from "@/lib/db";

export const assignOtherjob = async ({ id }: { id: string }) => {
  try {
    const job = await prisma.otherRequests.update({
      where: {
        id: id,
      },
      data: {
        approved: true,
      },
    });
    if (!job) {
      return "Network Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
