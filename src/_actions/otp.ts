"use server";

import prisma from "@/lib/db";
import { generateHashedPassword } from "./passwordManage";

export const otpGen = async (values: {
  gmail: string;
  password: string;
  name: string;
  type: string;
  // otp: number;
  Phone: string;
  img: string;
  Proof: string;
  country: boolean;
  paymentId: string;
}) => {
  if (
    values.gmail &&
    // values.otp &&
    values.name &&
    values.type &&
    values.password
  ) {
    try {
      const user = await prisma.user.findUnique({
        where: {
          email: values.gmail,
        },
      });
      if (user) {
        return { error: "User already exist please use different gmail" };
      }
      const hashedPassword = await generateHashedPassword(values.password);
      // await prisma.$transaction(async (tx) => {
      // const otpExpiry = new Date();
      // otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
      // console.log("Exp=", otpExpiry.getMinutes());
      const newUser = await prisma.user.create({
        data: {
          name: values.name,
          email: values.gmail,
          password: hashedPassword,
          type: values.type,
          Phone: values.Phone,
          country: values.country,
          paymentId: values.paymentId,
        },
      });
      if (newUser) {
        const real = await prisma.realUsers.create({
          data: {
            id: newUser.id,
            name: newUser.name!,
            gmail: newUser.email!,
            Proof: values.img,
            isReal: newUser.type === "customer" ? true : false,
            type: newUser.type,
          },
        });
        if (real) {
          return {
            success:
              "User Created ! Please wait for our team to approve your account",
          };
        }
      }
      // });
    } catch {
      // console.log(err);
      return {
        error: "User Exists",
      };
    }
  } else {
    return { error: "Values are not present" };
  }
};
