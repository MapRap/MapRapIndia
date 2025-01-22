"use server";

import prisma from "@/lib/db";

export const verifyInteriorJobs = async (id: string) => {
  try {
    const job = await prisma.maps.update({
      where: {
        id: id,
      },
      data: {
        isVerified: true,
      },
    });
    return job;
  } catch (err) {
    console.log(err);
  }
};
