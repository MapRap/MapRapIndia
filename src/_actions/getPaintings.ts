"use server";

import prisma from "@/lib/db";
// import { getId } from "./getId";

export const getPaintings = async () => {
  try {
    // const user = await getId();
    // if (user === "/unauthorized") {
    //   return user;
    // }
    const paintings = await prisma.paintings.findMany();
    if (!paintings) {
      return "No paintings";
    }
    return paintings;
  } catch (err) {
    console.log(err);
  }
};
