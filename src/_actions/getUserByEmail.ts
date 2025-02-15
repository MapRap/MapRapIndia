"use server";

import prisma from "@/lib/db";

export const getUseByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findFirst({ where: { email } });
    if (!user) {
      return null;
    }
    return user;
  } catch (e) {
    console.log(e);
    return null;
  }
};
