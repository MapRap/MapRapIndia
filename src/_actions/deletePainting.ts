"use server";

import prisma from "@/lib/db";

export const onPaintingDelete = async ({ id }: { id: string }) => {
  try {
    const painting = await prisma.paintings.delete({ where: { id: id } });
    if (!painting) {
      return "Error! Please try again";
    }
    return "Succefully deleted painting";
  } catch (err) {
    return "Error! Please try again";
    console.log(err);
  }
};
