"use server";
// import jwt, { JwtPayload } from "jsonwebtoken";
import { jwtVerify, SignJWT } from "jose";

export const generateAuthToken = async ({
  id,
  type,
}: {
  id: string;
  type: string;
}) => {
  const secret = new TextEncoder().encode(process.env.JWT_SECRET);
  const payload = { id: `${id}`, type: `${type}` };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("2h")
    .sign(secret);
  if (!token) {
    return undefined;
  }
  return token;
};

export const decodeAuthToken = async (token: string) => {
  try {
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);

    return { payload };
  } catch (error) {
    console.error("JWT Verification Error:", error);
    throw new Error("Invalid or expired token");
  }
};
