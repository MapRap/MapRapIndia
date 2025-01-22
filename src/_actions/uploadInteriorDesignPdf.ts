"use server";

import prisma from "@/lib/db";
// import { checkDomainOfScale } from "recharts/types/util/ChartUtils";

export const uploadInteriorDesignPdf = async ({
  id,
  link,
}: {
  id: string;
  link: string;
}) => {
  try {
    const pdf = await prisma.interiorSteps.update({
      where: {
        id: id,
      },
      data: {
        attachments: link,
      },
    });
    if (!pdf) {
      return "Error";
    }
    console.log(link);
    return "Success";
  } catch (err) {
    // console.log("AJS");
    console.log(err);
    // throw Error(err)
    // return err;
  }
};
