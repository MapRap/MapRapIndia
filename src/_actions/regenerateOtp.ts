"use server";

import prisma from "@/lib/db";

export const regenerate = async ({
  gmail,
  otp,
}: {
  gmail: string;
  otp: string;
}) => {
  try {
    const otpExpiry = new Date();
    otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
    const user = await prisma.user.update({
      where: { email: gmail },
      data: { otp: otp, otpExpiry: otpExpiry },
    });
    if (!user) {
      return "Network Error";
    }
    return "Regenerated OTP";
  } catch (err) {
    console.log(err);
  }
};
