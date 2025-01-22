"use server";
import prisma from "@/lib/db";

export const startInteriorStep = async ({ id }: { id: string }) => {
  try {
    // console.log("A");
    const step = await prisma.interiorSteps.findUnique({
      where: {
        id: id,
      },
    });
    if (!step) {
      return "Error! Please try again";
    }
    // if (step.type === "full") {
    //   return;
    // }
    const newStep = await prisma.interiorSteps.create({
      data: {
        jobId: step.jobId,
        type: step.type,
        currentStep: step.currentStep + 1,
      },
    });
    if (!newStep) {
      return "Error! Please try again";
    }
    console.log("sa", newStep);
    return newStep;
  } catch (err) {
    console.log(err);
  }
};
