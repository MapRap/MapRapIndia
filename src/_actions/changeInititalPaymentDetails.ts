"use server"

import prisma from "@/lib/db";

export const changeInititalPayment = async ({ id }: { id: string }) => {
  try {
    const job = await prisma.maps.findUnique({
      where: { id: id, initialPayment: false },
    });
    if (!job) {
      return "No such job";
    }
    const updatedJob = await prisma.maps.update({
      where: { id: job.id },
      data: {
        initialPayment: true,
      },
    });
    if (!updatedJob) {
      return "Error! Please try again";
    }
    return job;
  } catch (err) {
    console.log(err);
    return "Error";
  }
};
