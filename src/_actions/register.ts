"use server";
import prisma from "@/lib/db";
export const register = async (values: string, gmail: string) => {
  const otp = values;
  try {
    const existingUser = await prisma.user.findUnique({
      where: {
        gmail,
      },
    });
    const tim = new Date();
    if (existingUser && existingUser.isVerified === false) {
      if (existingUser.otp === otp) {
        console.log("now", tim.getMinutes());
        console.log("now2", existingUser.otpExpiry.getMinutes());
        if (tim.getMinutes() < existingUser.otpExpiry.getMinutes()) {
          const updatedUser = await prisma.user.update({
            where: {
              gmail,
            },
            data: {
              isVerified: true,
            },
          });
          if (!updatedUser) {
            return { error: "Server error, please try again" };
          }
        } else {
          return { error: "Timedout" };
        }
      } else {
        return { error: "Wrong Otp" };
      }
    } else {
      return {
        error: "Gmail already in use",
      };
    }
    if (existingUser.type === "customer") {
      return {
        success: "Gmail verified! Plese login",
      };
    }
    return {
      success:
        "Gmail verified! You can login after your Id is verified by our team",
    };
  } catch (err: unknown) {
    console.log(err);
    return { error: err };
  }
};
