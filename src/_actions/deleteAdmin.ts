"use server";

import prisma from "@/lib/db";

export const deleteAdmin = async ({ id }: { id: string }) => {
  try {
    const admin = await prisma.user.delete({
      where: {
        id: id,
      },
    });
    if (!admin) {
      return "Error";
    }
    const realAdmin = await prisma.realUsers.delete({
      where: { id: id },
    });
    if (!realAdmin) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
