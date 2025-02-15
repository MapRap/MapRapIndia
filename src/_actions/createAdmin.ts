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
  const emailVerified = new Date();
  const admin = await prisma.user.create({
    data: {
      email: `${gmail}`,
      password: password,
      name: `${name}`,
      otp: otp.toString(),
      emailVerified: emailVerified,
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
