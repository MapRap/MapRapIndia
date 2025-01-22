"use server";

import prisma from "@/lib/db";

export const unPublishPainting = async ({ id }: { id: string }) => {
  try {
    const paintings = await prisma.paintings.update({
      where: { id: id },
      data: { published: false },
    });
    if (!paintings) {
      return "Error! Please try again";
    }
    return "success";
  } catch (err) {
    console.log(err);
  }
};
