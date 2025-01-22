"use server";

import prisma from "@/lib/db";

export const deleteInteriorJob = async (id: string) => {
  try {
    const job = await prisma.maps.delete({
      where: {
        id: id,
      },
    });
    if (job) {
      return { success: "Deleted job" };
    }
  } catch (err) {
    console.log(err);
  }
};
