"use server";

import prisma from "@/lib/db";

export const completeStep = async ({
  id,
  jobId,
}: {
  id: string;
  jobId: string;
}) => {
  try {
    const step = await prisma.steps.update({
      where: {
        id: id,
      },
      data: {
        completed: true,
      },
    });
    if (!step) {
      return "No such order, please make a request";
    }
    const toggle = await prisma.maps.update({
      where: {
        id: jobId,
      },
      data: {
        remind: false,
        remindMessage: null,
      },
    });
    if (!toggle) {
      return "No such order, please make a request";
    }
    return step;
  } catch (err) {
    console.log(err);
  }
};
