"use server";

import prisma from "@/lib/db";

export const publishJob = async (
  id: string,
  task: string,
  studentPrice: string
) => {
  try {
    const job = await prisma.maps.update({
      where: {
        id: id,
      },
      data: {
        publishable: true,
        expected: task,
        studentPrice: studentPrice,
      },
    });
    if (!job) {
      return { error: "Error publishing job" };
    }
    return { success: "Job published" };
  } catch (err) {
    console.log(err);
  }
};
