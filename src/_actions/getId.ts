"use server";

import { cookies } from "next/headers";
import { decodeAuthToken } from "./token-generator";
import prisma from "@/lib/db";

export const getId = async () => {
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  try {
    if (!token) {
      console.log("Please login again!");
      return "/unauthorized";
    }
    const res = await decodeAuthToken(token);
    console.log(res);
    console.log("GG");
    if (res.payload === null) {
      return "/unauthorized";
    }
    if (!res.payload.id) {
      return "/unauthorized";
    }
    const user = await prisma.user.findUnique({
      where: { id: `${res.payload.id}` },
    });
    if (!user) {
      throw Error("No such user exist!");
    }
    const real = await prisma.realUsers.findUnique({
      where: { id: `${res.payload.id}`, isReal: true },
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
