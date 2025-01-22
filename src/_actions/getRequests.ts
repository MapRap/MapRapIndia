"use server";

import prisma from "@/lib/db";

export const getRequests = async () => {
  try {
    const requests = await prisma.requests.findMany();
    if (!requests) {
      return "No requests!";
    }
    return requests;
  } catch (err) {
    console.log(err);
  }
};
