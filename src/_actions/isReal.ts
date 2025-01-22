"use server";

import prisma from "@/lib/db";

export const isRealUser = async (id: string) => {
  try {
    console.log("gg", id);
    const user = await prisma.realUsers.findUnique({
      where: {
        id: id,
      },
    });
    if (!user) {
      return "no such user!";
    }
    const props = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!props) {
      return "no such user!";
    }
    return { ...user, payment: props.paymentId };
  } catch (err) {
    console.log(err);
  }
};
