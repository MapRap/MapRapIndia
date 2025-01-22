"use server";

import prisma from "@/lib/db";

export const onOtherJobDelete = async ({ id }: { id: string }) => {
  try {
    const job = await prisma.otherJobs.delete({ where: { id: id } });
    if (!job) {
      return "Error! Please try again";
    }
    return "Succefully deleted painting";
  } catch (err) {
    console.log(err);
    return "Error! Please try again";
  }
};
