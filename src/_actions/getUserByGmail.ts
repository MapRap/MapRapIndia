"use server";

import prisma from "@/lib/db";

export const getUserByGmail = async ({ gmail }: { gmail: string }) => {
  try {
    const user = await prisma.realUsers.findFirst({
      where: { gmail: gmail },
    });
    if (!user) {
      return "No user with this gmail Exists";
    }
    const realUser = await prisma.user.findFirst({ where: { id: user.id } });
    if (!realUser) {
      return "No user with this gmail Exists";
    }
    return realUser;
  } catch (err) {
    console.log(err);
    return "Error! Please try again";
  }
};
