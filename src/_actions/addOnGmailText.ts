"use server";

import prisma from "@/lib/db";

export const addOnGmailText = async ({
  text,
  jobId,
}: {
  text: string;
  jobId: string;
}) => {
  // console.log("GG", jobId);
  try {
    const step = await prisma.steps.updateMany({
      where: {
        jobId: jobId,
        completed: false,
      },
      data: {
        onGmail: text,
      },
    });
    if (!step) {
      // console.log("As");
      return "Error";
    }
    console.log(step);
    return step;
  } catch (err) {
    console.log(err);
  }
};
