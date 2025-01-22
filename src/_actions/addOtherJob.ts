"use server";

import prisma from "@/lib/db";
import { getId } from "./getId";

export const addOtherJob = async (values: {
  title: string;
  description: string;
  clientPrice: number;
  imageUrl: string;
}) => {
  try {
    const user = await getId();
    if (user === "/unauthorized") {
      return user;
    }
    const job = await prisma.otherJobs.create({
      data: {
        title: values.title,
        description: values.description,
        clientPrice: values.clientPrice,
        givenBy: user.id,
        totalPrice: 0,
        imageUrl: values.imageUrl,
      },
    });
    if (!job) {
      return "Error";
    }
    return job;
  } catch (err) {
    console.log(err);
  }
};
