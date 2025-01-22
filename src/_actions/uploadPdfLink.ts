"use server";

import prisma from "@/lib/db";

export const uploadPdfLink = async ({
  pdf,
  id,
}: {
  pdf: string;
  id: string;
}) => {
  // console.log("GG", jobId);
  try {
    const step = await prisma.steps.updateMany({
      where: {
        id: id,
      },
      data: {
        attachments: pdf,
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
