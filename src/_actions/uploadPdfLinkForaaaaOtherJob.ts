"use server";

import prisma from "@/lib/db";

export const uploadPdfLinkForOtherJob = async ({
  pdf,
  jobId,
}: {
  pdf: string;
  jobId: string;
}) => {
  // console.log("GG", jobId);
  try {
    const step = await prisma.otherRequests.updateMany({
      where: {
        otherJobId: jobId,
        approved: true,
      },
      data: {
        attachment: pdf,
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
