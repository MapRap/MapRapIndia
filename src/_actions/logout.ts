"use server";

import { cookies } from "next/headers";

export async function clearUserSession() {
  // Access cookies
  try {
    const cookieStore = await cookies();

    // Clear the session cookie
    cookieStore.set("token", "", {
      path: "/",
      expires: new Date(0), // Set an expiration date in the past
      httpOnly: true,
      secure: true, // Set to true in production
    });
    return "success";
  } catch (err) {
    console.log(err);
  }
}
