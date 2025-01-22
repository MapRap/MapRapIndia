"use server";

import prisma from "@/lib/db";

export const getRealUsers = async (id: string) => {
  try {
    console.log("gg", id);
    const user = await prisma.realUsers.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      console.log("Hey");
      return "no such user!";
    }
    const realUser = await prisma.user.findUnique({
      where: { id: user.id },
    });
    if (!realUser) {
      return "no such user!";
    }
    console.log(realUser);
    return realUser;
  } catch (err) {
    console.log(err);
  }
};
