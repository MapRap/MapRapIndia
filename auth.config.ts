import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { LoginSchema } from "@/lib";
import { getUseByEmail } from "@/_actions/getUserByEmail";
import { comparePassword } from "@/_actions/passwordManage";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        // const { mail, pass } = credentials;
        const validateFields = LoginSchema.safeParse({
          gmail: credentials.email,
          password: credentials.password,
        });
        // console.log("sre", validateFields.error);
        if (!validateFields.success) return null;
        if (validateFields.success) {
          console.log("gg");
          const { gmail, password } = validateFields.data;
          const user = await getUseByEmail(gmail);
          if (!user || !user.password) return null;
          const passwordsMatch = await comparePassword(password, user.password);
          if (!passwordsMatch) return null;
          if (passwordsMatch) {
            return user;
          }
          // return null;
        }
        return null;
        // }
      },
    }),
  ],
} satisfies NextAuthConfig;
