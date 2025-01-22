import { jwtVerify } from "jose";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const cookie = await cookies();
  const token = cookie.get("token")?.value;
  try {
    if (token) {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET);
      const { payload } = await jwtVerify(token, secret);
      console.log(pathname);
      // if (payload) {
      // return NextResponse.redirect(new URL("/", request.url));
      const id = payload.id;
      if (!id) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      // if (
      //   pathname.startsWith("/list") &&
      //   !["customer", "admin"].includes(`${payload.type}`)
      // ) {
      //   return NextResponse.redirect(new URL("/unauthorized", request.url));
      // }
      //  else
      if (
        pathname.startsWith("/jobs") &&
        !["student", "admin", "owner", "professional"].includes(
          `${payload.type}`
        )
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      } else if (
        pathname.startsWith("/admin/addPlan") &&
        !["owner"].includes(`${payload.type}`)
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      } else if (pathname.endsWith("/")) {
      } else if (
        pathname.startsWith("/admin/addAdmin") &&
        !["owner"].includes(`${payload.type}`)
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      } else if (pathname.endsWith("/")) {
      } else if (
        pathname.startsWith("/admin") &&
        !["admin", "owner"].includes(`${payload.type}`)
      ) {
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      } else if (pathname.endsWith("/")) {
      } else if (pathname.endsWith("/")) {
      }
      //   else if (
      //   pathname.startsWith("/") &&
      //   !["student", "admin", "professional"].includes(`${payload.type}`)
      // ) {
      //   return NextResponse.redirect(new URL("/unauthorized", request.url));
      //   }
      else if (pathname.endsWith("/")) {
        return NextResponse.next();
      }
      // }
    }
    if (!token) {
      if (pathname.startsWith("/admin")) {
        // console.log("gg");
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      } else if (pathname.startsWith("/plans/choose")) {
        // console.log("gg");
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      } else if (pathname.startsWith("/misc")) {
        // console.log("gg");
        return NextResponse.redirect(new URL("/unauthorized", request.url));
      }
      // if (pathname.startsWith("/jobs")) {
      //   return NextResponse.redirect(new URL("/unauthorized", request.url));
      // }
    }
  } catch (err) {
    console.log(err);
    cookie.set("token", "", { maxAge: 0 });
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
  return NextResponse.next();
}

// Config to exclude API and static routes
export const config = {
  matcher: "/((?!api|_next|favicon.ico).*)",
};
