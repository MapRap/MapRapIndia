"use server";

import prisma from "@/lib/db";
import { getId } from "./getId";

export const addPainting = async (values: {
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
    const painting = await prisma.paintings.create({
      data: {
        title: values.title,
        description: values.description,
        clientPrice: values.clientPrice,
        givenBy: user.id,
        totalPrice: 0,
        imageUrl: values.imageUrl,
      },
    });
    if (!painting) {
      return "Error";
    }
    return painting;
  } catch (err) {
    console.log(err);
  }
};
