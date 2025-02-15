"use server";

import prisma from "@/lib/db";

export const requestOtherJob = async ({
  id,
  userId,
  gmail,
}: // phone,
{
  id: string;
  userId: string;
  gmail: string;
  // phone: stsring;
}) => {
  try {
    const unique = await prisma.otherRequests.findFirst({
      where: { by: userId },
    });
    if (unique) {
      return "You have already made a request! Please wait for the request to get approved";
    }
    const user = await prisma.user.findFirst({
      where: { id: id },
    });
    if (!user) {
      return "Error";
    }
    const job = await prisma.otherRequests.create({
      data: {
        otherJobId: id,
        by: userId,
        gmail: gmail,
        phone: user.Phone!,
        attachment: "",
      },
    });
    if (!job) {
      return "Network Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
