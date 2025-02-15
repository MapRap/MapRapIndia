"use server";

import prisma from "@/lib/db";

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findFirst({ where: { id } });
    return user;
  } catch (err) {
    console.log(err);
    return null;
  }
};
