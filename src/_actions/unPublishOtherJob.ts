"use server";

import prisma from "@/lib/db";

export const unPublishOtherJob = async ({ id }: { id: string }) => {
  try {
    const job = await prisma.otherJobs.update({
      where: { id: id },
      data: { published: false },
    });
    if (!job) {
      return "Error! Please try again";
    }
    return "success";
  } catch (err) {
    console.log(err);
  }
};
