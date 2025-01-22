"use server";

import prisma from "@/lib/db";

export const onDeleteVisit = async ({ id }: { id: string }) => {
  try {
    const visit = await prisma.siteVisit.delete({
      where: {
        id: id,
      },
    });
    if (!visit) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
