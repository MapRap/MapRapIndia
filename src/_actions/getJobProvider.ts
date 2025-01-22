"use server";

import prisma from "@/lib/db";

export const jobProvider = async ({ id }: { id: string }) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return "No such user exists";
    }
    return user;
  } catch (err) {
    console.log(err);
  }
};
