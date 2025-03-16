"use server";

import prisma from "@/lib/db";

export const changeInteriorInititalPayment = async ({ id }: { id: string }) => {
  try {
    const job = await prisma.interior.findUnique({
      where: { id: id, initialPayment: false },
    });
    if (!job) {
      return "No such job";
    }
    const updatedJob = await prisma.interior.update({
      where: { id: job.id },
      data: {
        initialPayment: true,
      },
    });
    console.log("Sd");
    if (!updatedJob) {
      return "Error! Please try again";
    }
    return job;
  } catch (err) {
    console.log(err);
    return "Error";
  }
};
