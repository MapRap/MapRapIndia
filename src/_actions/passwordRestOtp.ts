"use server";

import prisma from "@/lib/db";

export const passwordResetOtp = async ({
  id,
  otp,
}: {
  id: string;
  otp: string;
}) => {
  try {
    const user = await prisma.user.findUnique({ where: { id: id } });
    if (!user) {
      return "Timeout";
    }
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
    const upd = await prisma.user.update({
      where: { id: user.id },
      data: {
        otp: otp,
        otpExpiry: otpExpiry,
      },
    });
    if (!upd) {
      return "Timeout";
    }
    return "Successfully Generated OTP";
  } catch (err) {
    console.log(err);
    return "Error";
  }
};
