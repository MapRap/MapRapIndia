"use server";

import prisma from "@/lib/db";

export const reminderInteriorMessage = async ({
  id,
  text,
}: {
  id: string;
  text: string;
}) => {
  try {
    const message = await prisma.interior.update({
      where: { id: id },
      data: {
        remindMessage: text,
      },
    });
    if (!message) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
