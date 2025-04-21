"use server";

import prisma from "@/lib/db";

export const remiderToggle = async ({ id }: { id: string }) => {
  try {
    const tog = await prisma.maps.update({
      where: {
        id: id,
      },
      data: {
        remind: true,
      },
    });
    if (!tog) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
