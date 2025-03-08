"use server";

import prisma from "@/lib/db";
import { generateHashedPassword } from "./passwordManage";

export const createOwner = async () => {
  const otp = 0;
  const otpExpiry = new Date();
  otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
  const password = await generateHashedPassword("Ayush,.1234");
  const emailVerified = new Date();
  const admin = await prisma.user.create({
    data: {
      email: `maprapindia@gmail.com`,
      password: password,
      name: `Ayush`,
      otp: otp.toString(),
      emailVerified: emailVerified,
      type: "owner",
      otpExpiry: otpExpiry,
      Phone: ``,
      country: false,
      paymentId: "",
    },
  });
  if (admin) {
    const real = await prisma.realUsers.create({
      data: {
        id: admin.id,
        name: admin.name!,
        gmail: admin.email!,
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
