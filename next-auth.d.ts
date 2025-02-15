import { type DefaultSession } from "next-auth";
// import { decl } from "postcss";

export type ExtendedUser = DefaultSession["user"] & {
  type: string;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }

  // interface User {
  //   id: string;
  //   name: string | null | undefined;
  //   email: string | undefined | null;
  //   password: string | null | undefined;
  //   otp: string | null | undefined;
  //   emailVerified: DateTime | null | undefined;
  //   otpExpiry: DateTime | null | undefined;
  //   type: string;
  //   Phone: string | null | undefined;
  //   paymentId: string | null | undefined;
  //   country: boolean | undefined;
  //   stars: string | null | undefined;
  // }
}
