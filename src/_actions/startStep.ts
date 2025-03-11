"use server";
import prisma from "@/lib/db";

export const startStep = async ({ id }: { id: string }) => {
  try {
    // console.log("A");
    const step = await prisma.steps.findUnique({
      where: {
        id: id,
      },
    });
    if (!step) {
      return "Error! Please try again";
    }

    if (step.currentStep > step.totalSteps) {
      return "All steps completed";
    }
    if (step.currentStep === step.totalSteps) {
      return "All steps completed";
    }

    const newStep = await prisma.steps.create({
      data: {
        jobId: step.jobId,
        type: step.type,
        currentStep: step.currentStep + 1,
        totalSteps: step.totalSteps,
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
