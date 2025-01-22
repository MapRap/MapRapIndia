"use server";

import prisma from "@/lib/db";
import { generateHashedPassword } from "./passwordManage";

export const otpGen = async (values: {
  gmail: string;
  password: string;
  name: string;
  type: string;
  otp: number;
  Phone: string;
  img: string;
  Proof: string;
  country: boolean;
  paymentId: string;
}) => {
  if (
    values.gmail &&
    values.otp &&
    values.name &&
    values.type &&
    values.password
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          gmail: values.gmail,
        },
      });
      if (user && user.isVerified === true) {
        return { message: "User already exist please use different gmail" };
      }
      const hashedPassword = await generateHashedPassword(values.password);
      await prisma.$transaction(async (tx) => {
        const otpExpiry = new Date();
        otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
        // console.log("Exp=", otpExpiry.getMinutes());
        const newUser = await tx.user.create({
          data: {
            name: values.name,
            gmail: values.gmail,
            password: hashedPassword,
            type: values.type,
            isVerified: false,
            otpExpiry: otpExpiry,
            otp: values.otp.toString(),
            Phone: values.Phone,
            country: values.country,
            paymentId: values.paymentId,
          },
        });
        if (newUser) {
          const real = await tx.realUsers.create({
            data: {
              id: newUser.id,
              name: newUser.name,
              gmail: newUser.gmail,
              Proof: values.img,
              isReal: newUser.type === "customer" ? true : false,
              type: newUser.type,
            },
          });
          if (real) {
            return {
              message:
                "Otp has been generated successfully please verify your gmail to login within 10 minutes",
              success: true,
            };
          }
        }
      });
    } catch (err) {
      console.log(err);
      return {
        error: "User Exists",
        success: false,
      };
    }
  } else {
    return { error: "Values are not present" };
  }
};
