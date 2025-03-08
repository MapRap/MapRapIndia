import { NextRequest, NextResponse } from "next/server";

let cachedToken: string | null = null;

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const merchantId = searchParams.get("merchantId");
    const step = searchParams.get("step");
    const stepAmount = searchParams.get("amount");
    // console.log("dsf", stepAmount);
    // const request = await req.json();
    // console.log(request.udf1);
    const jobId = searchParams.get("jobId");
    const urlEncodedData = new URLSearchParams({
      client_id: `${process.env.PHONEPE_CLIENT_ID}`,
      client_version: `${1}`,
      client_secret: `${process.env.PHONEPE_API_KEY}`,
      grant_type: "client_credentials",
    }).toString();
    const tokenResponse = await fetch(
      "	https://api.phonepe.com/apis/identity-manager/v1/oauth/token",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: urlEncodedData,
      }
    );
    if (!tokenResponse) {
      // console.log("SJE");
      return NextResponse.json({ error: "No token" });
    }
    const tokenObj = await tokenResponse.json();
    cachedToken = tokenObj.access_token;
    // const request = await req.json();
    // console.log(request);
    const orderStatusResponse = await fetch(
      `https://api.phonepe.com/apis/pg/checkout/v2/order/${merchantId}/status?details=false&errorContext=true`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `O-Bearer ${cachedToken}`,
        },
      }
    );
    if (!orderStatusResponse) {
      return NextResponse.json({ error: "Order Status Error" });
    }
    const orderStatusObj = await orderStatusResponse.json();
    if (orderStatusObj.state === "COMPLETED") {
      return NextResponse.redirect(
        new URL(
          `/payment/success?orderId=${merchantId}&step=${step}&amount=${stepAmount}&jobId=${jobId}`,
          process.env.NEXT_PUBLIC_DOMAIN_NAME
        )
      );
    }
    return NextResponse.redirect(
      new URL("/payment/failure", process.env.NEXT_PUBLIC_DOMAIN_NAME)
    );
  } catch (err) {
    console.log(err);
  }
}
