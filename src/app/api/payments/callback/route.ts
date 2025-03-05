import { client } from "@/lib/phonepe";
import { NextRequest, NextResponse } from "next/server";
// import { client } from ''; // Adjust the import as necessary

export async function POST(request: NextRequest) {
  const authorizationHeader = request.headers.get("authorization");
  const callbackBody = await request.text();

  try {
    const orderStatusResponse = await fetch(
      `https://api.phonepe.com/apis/pg/checkout/v2/order/${initialtePayment.merchantOrderId}/status?details=false&errorContext=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${tokenObj.access_token}`,
        },
      }
    );

    return NextResponse.json({ message: "Callback processed successfully" });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Invalid callback" }, { status: 400 });
  }
}
