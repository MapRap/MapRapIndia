"use server";

import prisma from "@/lib/db";

export const changeOtherJobToPaid = async ({ id }: { id: string }) => {
  try {
    const res = await prisma.otherJobs.update({
      where: { id: id },
      data: { paid: true },
    });
    if (!res) {
      return "Error! Please try again";
    }
    return "Success";
  } catch (err) {
    console.log(err);
    return "Error! Please try again";
  }
};
