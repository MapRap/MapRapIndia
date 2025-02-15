"use server";

import prisma from "@/lib/db";

export const verifyOtp = async ({
  id,
  clientOtp,
}: {
  id: string;
  clientOtp: string;
}) => {
  try {
    const user = await prisma.user.findUnique({
      where: { id: id },
    });
    if (!user) {
      return "Timeout";
    }
    if (!user.otpExpiry) {
      return "Timeout! Please try again!";
    }
    const tim = new Date();
    if (user.otpExpiry.getMinutes() < tim.getMinutes()) {
      return "Session Timed Out! Please try again!";
    }
    if (user.otp !== clientOtp) {
      return "Wrong OTP! Enter valid OTP.";
    }
    return "OTP successfully Verified! Please enter new password";
  } catch (err) {
    console.log(err);
    return "Error";
  }
};
