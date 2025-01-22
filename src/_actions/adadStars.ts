"use server";

import prisma from "@/lib/db";

export const addStars = async ({
  id,
  stars,
}: {
  id: string;
  stars: string;
}) => {
  try {
    const prevStars = await prisma.user.findUnique({ where: { id: id } });
    if (!prevStars) {
      return "Error";
    }
    let totalStars = 0;
    if (prevStars.stars === "null") {
      totalStars = Number(stars);
    } else {
      totalStars = Number(stars) + Number(prevStars.stars);
    }

    const res = await prisma.user.update({
      where: { id: id },
      data: { stars: totalStars.toString() },
    });
    if (!res) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
