import { auth } from "@/auth";
import prisma from "@/lib/db";

export const deleteNotPaid = async () => {
  try {
    const session = await auth();
    console.log("dsar");
    if (!session) {
      return "Login Error";
    }
    if (!session.user) {
      return "Login Error";
    }
    if (!session.user.id) {
      return "Login Error";
    }
    const unPaidJobs = await prisma.maps.deleteMany({
      where: { givenBy: session.user.id, initialPayment: false },
    });
    // console.log("cds", unPaidJobs.count);
    if (!unPaidJobs) {
      return "Error";
    }
    return "success";
  } catch (err) {
    console.log(err);
  }
};
