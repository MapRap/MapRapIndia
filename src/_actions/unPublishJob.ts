"use server";

import prisma from "@/lib/db";

export const unPblishJob = async (id: string) => {
  try {
    const job = await prisma.maps.update({
      where: {
        id: id,
      },
      data: {
        publishable: false,
      },
    });
    if (!job) {
      return { error: "Error unpublishing job, please try again" };
    }
  } catch (err) {
    console.log(err);
  }
};
