"use server";

import prisma from "@/lib/db";

export const assignJob = async ({
  jobId,
  userId,
}: {
  jobId: string;
  userId: string;
}) => {
  try {
    const job = await prisma.maps.update({
      where: {
        id: jobId,
      },
      data: {
        assignedTo: userId,
      },
    });
    if (!job) {
      return "Job deleted";
    }
    return job;
  } catch (err) {
    console.log(err);
  }
};
