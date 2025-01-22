"use server";

import prisma from "@/lib/db";

export const changeToPaid = async ({ id }: { id: string }) => {
  try {
    const res = await prisma.paintings.update({
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
