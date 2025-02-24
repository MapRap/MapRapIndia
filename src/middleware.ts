// import { jwtVerify } from "jose";
// import { cookies } from "next/headers";
// import { NextRequest, NextResponse } from "next/server";

import NextAuth from "next-auth";
import authConfig from "../auth.config";
import {
  apiAuthPrefix,
  authRoutes,
  DEFAULT_LOGIN_REDIRECT,
  publicRoutes,
} from "../route";
// import { NextRequest } from "next/server";

// export async function middleware(request: NextRequest) {
// const { pathname } = request.nextUrl;
// const cookie = await cookies();
// const token = cookie.get("token")?.value;
// try {
// if (token) {
//   const secret = new TextEncoder().encode(process.env.JWT_SECRET);
//   const { payload } = await jwtVerify(token, secret);
//   console.log(pathname);
//   const id = payload.id;
//   if (!id) {
//     return NextResponse.redirect(new URL("/", request.url));
//   }
//   if (
//     pathname.startsWith("/jobs") &&
//     !["student", "admin", "owner", "professional"].includes(
//       `${payload.type}`
//     )
//   ) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   } else if (
//     pathname.startsWith("/admin/addPlan") &&
//     !["owner"].includes(`${payload.type}`)
//   ) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   } else if (pathname.endsWith("/")) {
//   } else if (
//     pathname.startsWith("/admin/addAdmin") &&
//     !["owner"].includes(`${payload.type}`)
//   ) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   } else if (pathname.endsWith("/")) {
//   } else if (
//     pathname.startsWith("/admin") &&
//     !["admin", "owner"].includes(`${payload.type}`)
//   ) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   } else if (pathname.endsWith("/")) {
//   } else if (pathname.endsWith("/")) {
//   } else if (pathname.endsWith("/")) {
//     return NextResponse.next();
//   }
// }
// if (!token) {
//   if (pathname.startsWith("/admin")) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   } else if (pathname.startsWith("/plans/choose")) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   } else if (pathname.startsWith("/misc")) {
//     return NextResponse.redirect(new URL("/unauthorized", request.url));
//   }
// }
// } catch (err) {
// console.log(err);
// cookie.set("token", "", { maxAge: 0 });
// return NextResponse.redirect(new URL("/unauthorized", request.url));
// }
// return NextResponse.next();
// }

// import { auth } from "@/auth";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  // const user=await auth()
  const isLoggedIn = !!req.nextUrl;
  const nextUrl = req.nextUrl;
  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = authRoutes.includes(nextUrl.pathname);
  // const adminRoute = nextUrl.pathname.startsWith("/admin");
  if (isApiAuthRoute) {
    // return null;
    return;
  }
  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
  }
  if (!isLoggedIn && !isPublicRoute) {
    return Response.redirect(new URL("/auth/login", nextUrl));
  }

  return;
});

// Config to exclude API and static routes
export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
};
