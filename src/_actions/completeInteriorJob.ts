"use server";

import prisma from "@/lib/db";

export const completeInteriorJob = async ({ id }: { id: string }) => {
  try {
    const job = await prisma.interior.update({
      where: {
        id: id,
      },
      data: {
        completed: true,
      },
    });

    if (!job) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
