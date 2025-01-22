"use server";

import prisma from "@/lib/db";

export const getAdmins = async () => {
  try {
    const admins = await prisma.user.findMany({
      where: { type: "admin" },
    });
    if (!admins) {
      return "Error";
    }
    return admins;
  } catch (err) {
    console.log(err);
  }
};
