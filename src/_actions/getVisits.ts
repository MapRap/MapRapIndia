"use server";

import prisma from "@/lib/db";

export const getVisit = async () => {
  try {
    const visits = await prisma.siteVisit.findMany();
    if (!visits) {
      return "Error";
    }
    return visits;
  } catch (err) {
    console.log(err);
  }
};
