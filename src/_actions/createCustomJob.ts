"use server";

import { auth } from "@/auth";
import prisma from "@/lib/db";

export const createCustomJob = async (values: {
  specifications: string;
  floors: number;
  area: string;
  A: number;
  B: number;
  C: number;
  D: number;
  E: number;
  D1: number;
  D2: number;
  D3: number;
  D4: number;
  plot: string;
  imageUrl: string;
  type: string;
  direction: string;
  studentPrice: string;
  expected: string;
}) => {
  try {
    const session = await auth();
    if (!session) {
      return "Error";
    }
    if (!session.user || !session.user.id) {
      return "Error";
    }
    const job = await prisma.maps.create({
      data: {
        name: "Admin",
        phone: "",
        specifications: values.specifications,
        A: values.A || 0,
        B: values.B || 0,
        C: values.C || 0,
        D: values.D || 0,
        E: values.E || null,
        D1: values.D1 || null,
        D2: values.D2 || null,
        D3: values.D3 || null,
        D4: values.D4 || null,
        studentPrice: values.studentPrice,
        direction: values.direction,
        type: values.type,
        imageUrl: values.imageUrl,
        floors: values.floors,
        area: values.area,
        plot: values.plot,
        givenBy: session.user.id,
        price: 0,
        isVerified: true,
        publishable: true,
        expected: values.expected,
      },
    });
    if (!job) {
      return "Network Error";
    }
    return "success";
  } catch (err) {
    console.log(err);
  }
};
