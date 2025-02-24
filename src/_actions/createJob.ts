"use server";
import prisma from "@/lib/db";
// import { decodeAuthToken } from "./token-generator";
// import { cookies } from "next/headers";
// import { areaList } from "@/lib";
import { getOtherPlans } from "./getOtherPlans";
import { auth } from "@/auth";
// export const areaList=[{"type1":"1400"},{"type2":"2800"},{"type3":"4000"},{"type4":"5400"},{"type5":"1400"},{"type6":"2800"},{"type7":"5400"},{"type8":"10890"},{"type9":"16335"},{"type10":"21780"},{"type11":"27225"}]
// export const areaList = {
//   type1: "1400",
//   type2: "2800",
//   type3: "4000",
//   type4: "5400",
//   type5: "1400",
//   type6: "2800",
//   type7: "5400",
//   type8: "10890",
//   type9: "16335",
//   type10: "21780",
//   type11: "27225",
// };

export const createJob = async (values: {
  A: number;
  B: number;
  floor: number;
  C: number;
  D: number;
  E?: number;
  plot: string;
  D1?: number;
  D2?: number;
  D3?: number;
  D4?: number;
  specifications: string;
  imageUrl: string;
  price: number;
  type: string;
  direction: string;
  property: string;
  phone: string;
}) => {
  // const cookie = await cookies();
  // const token = cookie.get("token")?.value;
  const session = await auth();

  try {
    const plans = await getOtherPlans();
    if (!plans) {
      return "Error";
    } else if (plans === "Network Error") {
      return "Error";
    }
    // console.log("das", values.type);
    if (session?.user.id) {
      //       const area=areaList.map((a)=>{
      // if(Object.keys(a)===values.type){

      // }
      // })
      // const keys = Object.keys(areaList);
      let area: string | undefined;
      // for (const key in areaList) {
      //   // keys.map((key) => {
      //   if (key === values.type) {
      //     area = key;
      //     break;
      //   } else {
      //     area = values.type;
      //   }
      // }
      // });
      for (let i = 0; i < plans.length; i++) {
        // plans.map((plan) => {
        if ((values.type = plans[i].area)) {
          area = values.type;
          break;
        }
      }

      // console.log("type", values.type);
      // const res = await decodeAuthToken(token);
      // let resi = "";
      if (area) {
        //   if (
        //     values.type === "type1" ||
        //     values.type === "type2" ||
        //     values.type === "type3" ||
        //     values.type === "type4"
        //   ) {
        //     resi = "Residential";
        //   }
        //   if (
        //     values.type === "type5" ||
        //     values.type === "type6" ||
        //     values.type === "type7" ||
        //     values.type === "type8" ||
        //     values.type === "type9" ||
        //     values.type === "type10" ||
        //     values.type === "type11"
        //   ) {
        //     resi = "Commercial";
        //   }
        // if (res.payload.id) {
        console.log("Hey");
        const user = await prisma.realUsers.findUnique({
          where: { id: `${session.user.id}`, isReal: true },
        });
        if (!user) {
          return "user not approved";
        }
        const realUser = await prisma.user.findUnique({
          where: { id: `${session.user.id}` },
        });
        if (!realUser) {
          console.log("Error");
          return "user not approved";
        }
        if (values.plot === "plot2") {
          const map = await prisma.maps.create({
            data: {
              A: values.A || 0,
              B: values.B || 0,
              C: values.C || 0,
              D: values.D || 0,
              D1: values.D1 || 0,
              D2: values.D2 || 0,
              plot: values.plot || "",
              specifications: values.specifications || "",
              givenBy: `${session.user.id}`,
              price: values.price,
              floors: values.floor,
              imageUrl: values.imageUrl || "",
              type: values.property || "",
              direction: values.direction || "",
              publishable: false,
              area: area || "",
              phone: values.phone || "",
              name: realUser.name!,
            },
          });
          if (map) {
            return {
              success:
                "Thank-you-for-your-request!-It's-now-under-review-and-we-will-have-a-solution-for-you-soon.",
              job: map,
            };
          }
        } else if (values.plot === "plot1") {
          const map = await prisma.maps.create({
            data: {
              A: values.A || 0,
              B: values.B || 0,
              C: values.C || 0,
              D: values.D || 0,
              plot: values.plot,
              specifications: values.specifications || "",
              givenBy: `${session.user.id}`,
              price: values.price,
              floors: values.floor,
              area: area || "",
              imageUrl: values.imageUrl || "",
              type: values.property || "",
              direction: values.direction || "",
              publishable: false,
              phone: values.phone || "",
              name: realUser.name!,
            },
          });
          if (map) {
            return {
              success:
                "Thank-you-for-your-request!-It's-now-under-review-and-we-will-have-a-solution-for-you-soon.",
            };
          }
        } else if (values.plot === "plot3") {
          const map = await prisma.maps.create({
            data: {
              A: values.A || 0,
              B: values.B || 0,
              C: values.C || 0,
              D: values.D || 0,
              E: values.E || 0,
              D1: values.D1 || 0,
              D2: values.D2 || 0,
              D3: values.D3 || 0,
              D4: values.D4 || 0,
              plot: values.plot || "",
              area: area || "",
              specifications: values.specifications || "",
              givenBy: `${session.user.id}`,
              price: values.price,
              floors: values.floor,
              imageUrl: values.imageUrl || "",
              type: values.property,
              direction: values.direction || "",
              publishable: false,
              phone: values.phone || "",
              name: realUser.name!,
            },
          });
          if (map) {
            return {
              success:
                "Thank-you-for-your-request!-It's-now-under-review-and-we-will-have-a-solution-for-you-soon.",
              job: map,
            };
          }
        }
        // }
        else {
          return {
            error: "Invalid-User-or-Token Expired!-Please-login-again",
          };
        }
      }
    }
  } catch (err) {
    console.log(err);
    console.log("GG");
    return { error: "ERROR" };
  }
};
