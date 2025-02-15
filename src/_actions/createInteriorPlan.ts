"use server";

import prisma from "@/lib/db";

export const createInterioJob = async ({
  specifications,
  area,
  userId,
  price,
  imageUrl,
  // phone,
  name,
  plan,
  property,
}: {
  specifications: string;
  userId: string;
  price: string;
  imageUrl: string;
  // phone: string;
  name: string;
  plan: string;
  property: string;
  area: string;
}) => {
  try {
    const interior = await prisma.interior.create({
      data: {
        specifications: specifications,
        area: area,
        givenBy: userId,
        price: price,
        imageUrl: imageUrl,
        publishable: false,
        phone: "",
        name: name,
        plan: plan,
        property: property,
      },
    });
    if (!interior) {
      return "Error";
    }
    return interior;
  } catch (err) {
    console.log(err);
  }
};
