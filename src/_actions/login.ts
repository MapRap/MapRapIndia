"use server";
import { LoginSchema } from "@/lib";
// import prisma from "@/lib/db";
import * as z from "zod";
// import { comparePassword } from "./passwordManage";
// import { redirect } from "next/navigation";
// import { generateAuthToken } from "./token-generator";
// import { cookies } from "next/headers";
import { signIn } from "@/auth";
import { DEFAULT_LOGIN_REDIRECT } from "../../route";
import { AuthError } from "next-auth";
export const login = async (values: z.infer<typeof LoginSchema>) => {
  const validatedFields = LoginSchema.safeParse(values);
  if (!validatedFields.success) {
    return { error: "Invalid fields!" };
  }
  const { gmail, password } = validatedFields.data;
  try {
    await signIn("credentials", {
      email: gmail,
      password,
      redirectTo: DEFAULT_LOGIN_REDIRECT,
    });
    // const user = await prisma.user.findUnique({
    //   where: {
    //     gmail: values.gmail,
    //   },
    // });
    // // console.log(user);
    // if (user === null) {
    //   return { error: "No such user exists! Please register" };
    // } else if (user) {
    //   const realUser = await prisma.realUsers.findUnique({
    //     where: { id: user?.id, isReal: true },
    //   });
    //   if (realUser) {
    //     if (user.isVerified === true) {
    //       if (
    //         realUser.isReal === false &&
    //         (user.type === "student" || user.type === "professionl")
    //       ) {
    //         return { error: "Please wait for our team to approve our account" };
    //       }
    //       const comp = await comparePassword(values.password, user.password);
    //       // console.log("comp=", comp);
    //       const token = await generateAuthToken({
    //         id: user.id,
    //         type: user.type,
    //       });
    //       // console.log(token);
    //       if (!token) {
    //         return { error: "Please login again" };
    //       }

    //       // const cookieStore = cookies();
    //       // cookieStore.set("token", token, {
    //       //   httpOnly: true,
    //       //   path: "/",
    //       //   maxAge: 60 * 60 * 24 * 7,
    //       //   sameSite:"lax",
    //       //   secure: process.env.NODE_ENV === 'production',
    //       // });
    //       console.log("Init");
    //       if (comp) {
    //         const cookieStore = await cookies();
    //         cookieStore.set({
    //           name: "token",
    //           value: token,
    //           httpOnly: true,
    //           secure: process.env.NODE_ENV === "production",
    //           path: "/",
    //           maxAge: 60 * 60 * 24 * 3, // 2 hours in seconds
    //         });
    //         return { success: "Login Successful", type: user.type };
    //       }
    //       if (!comp) {
    //         return { error: "Wrong pasasword! Please enter right password" };
    //       }
    //     }
    //   }
    // }
  } catch (err) {
    if (err instanceof AuthError) {
      switch (err.type) {
        case "CredentialsSignin":
          return { error: "Invalid Credentials" };
        default:
          return { error: "An error occurred" };
      }
    }
    // console.log(err);
    // return { error: "Wrong Id or password, Please try again" };
  }
  // redirect(`${process.env.PROTOCOL}${process.env.DOMAIN_NAME}`);
};
