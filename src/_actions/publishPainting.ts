"use server";

import prisma from "@/lib/db";

export const publishPaint = async ({
  id,
  totalPrice,
}: {
  id: string;
  totalPrice: number;
}) => {
  try {
    const painting = await prisma.paintings.update({
      where: {
        id: id,
      },
      data: { published: true, totalPrice: totalPrice },
    });
    if (!painting) {
      return "Timeout! Please try again";
    }
    return "success";
  } catch (err) {
    console.log(err);
  }
};
