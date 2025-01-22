"use server";

import prisma from "@/lib/db";

export const publishOtherJob = async ({
  id,
  totalPrice,
}: {
  id: string;
  totalPrice: number;
}) => {
  try {
    const job = await prisma.otherJobs.update({
      where: {
        id: id,
      },
      data: { published: true, totalPrice: totalPrice },
    });
    if (!job) {
      return "Timeout! Please try again";
    }
    return "success";
  } catch (err) {
    console.log(err);
  }
};
