import NextAuth from "next-auth";
import authConfig from "../auth.config";
import prisma from "./lib/db";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { getUserById } from "./_actions/getUserById";

declare module "@auth/core" {
  interface Session {
    user: {
      type: string;
    };
  }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/auth/login",
    error: "/auth/error",
  },
  events: {
    async linkAccount({ user }) {
      // console.log("Sdfekndf");
      if (user.id) {
        const exist = await prisma.user.findUnique({ where: { id: user.id } });
        if (exist) {
          if (
            exist.type === "admin" ||
            exist.type === "customer" ||
            exist.type === "owner"
          ) {
            // console.log("link", user);
            await prisma.user.update({
              where: { id: user.id },
              data: { emailVerified: new Date() },
            });
            await prisma.realUsers.create({
              data: {
                id: user.id!,
                name: user.name!,
                gmail: user.email!,
                type: exist.type,
                isReal: true,
              },
            });
          }
        }
      }
    },
  },
  callbacks: {
    async session({ session, token }) {
      // console.log("Dsfde");
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      if (token.type && session.user) {
        session.user.type = token.type as string;
      }
      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.type = existingUser.type;
      return token;
    },
    async redirect({ url, baseUrl }) {
      console.log("e", url);
      console.log("ew", baseUrl);
      // Always redirect to dashboard after login
      return "/list";
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
