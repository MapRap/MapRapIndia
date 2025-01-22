"use server";

import prisma from "@/lib/db";
import { generateHashedPassword } from "./passwordManage";

export const setNewPassword = async ({
  id,
  password,
}: {
  id: string;
  password: string;
}) => {
  try {
    const hashedPassword = await generateHashedPassword(password);
    const user = await prisma.user.update({
      where: { id: id },
      data: { password: hashedPassword },
    });
    if (!user) {
      return "Error";
    }
    return "Password successfully changed";
  } catch (err) {
    console.log(err);
    return "Network Error! Please try again";
  }
};
