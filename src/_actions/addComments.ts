"use server";

import prisma from "@/lib/db";

export const addComment = async ({
  jobId,
  comment,
}: {
  jobId: string;
  comment: string;
}) => {
  try {
    const com = await prisma.steps.updateMany({
      where: {
        jobId: jobId,
        completed: false,
      },
      data: {
        comments: comment,
      },
    });
    if (!com) {
      return "Network Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
