"use server";

import prisma from "@/lib/db";

export const otherJobPdf = async ({ id, pdf }: { id: string; pdf: string }) => {
  try {
    const upload = await prisma.otherJobs.update({
      where: {
        id: id,
      },
      data: {
        attachments: pdf,
        paid: true,
      },
    });
    if (!upload) {
      return "Network error";
    }
    return "Success";
  } catch (err) {
    console.log(err);
  }
};
