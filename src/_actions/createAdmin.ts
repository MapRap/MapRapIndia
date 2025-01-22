"use server";

import prisma from "@/lib/db";
import { generateHashedPassword } from "./passwordManage";

export const createAdmin = async ({
  name,
  gmail,
  phone,
}: {
  name: string;
  gmail: string;
  phone: string;
}) => {
  const otp = 0;
  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
  const password = await generateHashedPassword("MapRap@8899");
  const admin = await prisma.user.create({
    data: {
      gmail: `${gmail}`,
      password: password,
      name: `${name}`,
      otp: otp.toString(),
      isVerified: true,
      type: "admin",
      otpExpiry: otpExpiry,
      Phone: `${phone}`,
      country: true,
      paymentId: "",
    },
  });
  if (admin) {
    const real = await prisma.realUsers.create({
      data: {
        id: admin.id,
        name: admin.name,
        gmail: admin.gmail,
        isReal: true,
        type: admin.type,
      },
    });
    if (real) {
      console.log("succcess!");
      return "Success";
    }
  }
};
