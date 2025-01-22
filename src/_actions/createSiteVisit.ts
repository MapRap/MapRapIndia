"use server";

import prisma from "@/lib/db";

export const createSiteVisit = async ({
  userId,
  phone,
  gmail,
}: {
  userId: string;
  phone: string;
  gmail: string;
}) => {
  try {
    const visit = await prisma.siteVisit.create({
      data: {
        userId: userId,
        phone: phone,
        gmail: gmail,
      },
    });
    if (!visit) {
      return "Error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
