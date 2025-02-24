"use server";

// import { cookies } from "next/headers";/
// import { decodeAuthToken } from "./token-generator";
import prisma from "@/lib/db";
import { auth } from "@/auth";

export const getId = async () => {
  const session = await auth();
  try {
    if (!session?.user.id) {
      console.log("Please login again!");
      return "/unauthorized";
    }
    // const res = await decodeAuthToken(token);
    // console.log(res);
    console.log("GG");
    // if (.payload === null) {
    //   return "/unauthorized";
    // }
    // if (!res.payload.id) {
    //   return "/unauthorized";
    // }
    const user = await prisma.user.findUnique({
      where: { id: `${session.user.id}` },
    });
    if (!user) {
      throw Error("No such user exist!");
    }
    const real = await prisma.realUsers.findUnique({
      where: { id: `${session.user.id}`, isReal: true },
    });
    if (!real) {
      return "/unauthorized";
    }
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
};
