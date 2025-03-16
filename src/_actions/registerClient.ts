"use server";

import prisma from "@/lib/db";
import * as z from "zod";
import { generateHashedPassword } from "./passwordManage";
import { RegisterSchema } from "@/lib";

export const registerClient = async (
  values: z.infer<typeof RegisterSchema>
) => {
  if (
    values.gmail &&
    // values.otp &&
    values.name &&
    // values.type &&
    values.password
  ) {
    try {
      const existingUser = await prisma.user.findUnique({
        where: {
          email: values.gmail,
        },
      });
      if (existingUser) {
        return { error: "User already exists" };
      }
      const hashedPassword = await generateHashedPassword(values.password);
      const user = await prisma.user.create({
        data: {
          email: values.gmail,
          name: values.name,
          password: hashedPassword,
        },
      });
      if (!user) {
        return { error: "Network Error" };
      }
      const realUser = await prisma.realUsers.create({
        data: {
          id: user.id,
          name: user.name!,
          gmail: user.email!,
          isReal: true,
          type: user.type,
        },
      });
      if (!realUser) {
        return { error: "Network Error" };
      }
      return { success: "User created!" };
      // if (user && user.emailVerified === true) {
      //   return { message: "User already exist please use different gmail" };
      // }

      // await prisma.$transaction(async (tx) => {
      //   const otpExpiry = new Date();
      //   otpExpiry.setMinutes(otpExpiry.getMinutes() + 10);
      //   // console.log("Exp=", otpExpiry.getMinutes());
      //   const newUser = await tx.user.create({
      //     data: {
      //       name: values.name,
      //       gmail: values.gmail,
      //       password: hashedPassword,
      //       type: "customer",
      //       isVerified: true,
      //       otpExpiry: otpExpiry,
      //       otp: "",
      //       Phone: "",
      //       country: values.country,
      //       paymentId: "",
      //     },
      //   });
      //   if (newUser) {
      //     const real = await tx.realUsers.create({
      //       data: {
      //         id: newUser.id,
      //         name: newUser.name,
      //         gmail: newUser.gmail,
      //         isReal: newUser.type === "customer" ? true : false,
      //         type: "customer",
      //       },
      //     });
      //     if (real) {
      //       return {
      //         message: "success",
      //         success: true,
      //       };
      //     }
      //   }
      // });
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
