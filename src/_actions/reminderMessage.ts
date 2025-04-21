"use server";

import prisma from "@/lib/db";

export const reminderMessage = async ({
  id,
  text,
}: {
  id: string;
  text: string;
}) => {
  try {
    const message = await prisma.maps.update({
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
