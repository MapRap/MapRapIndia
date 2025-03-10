import { NextRequest, NextResponse } from "next/server";

let cachedToken: string | null = null;

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    console.log(request.udf1);

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
      console.log("SJE");
      return NextResponse.json({ error: "No token" });
    }
    const tokenObj = await tokenResponse.json();
    cachedToken = tokenObj.access_token;
    const prod_URL = "https://api.phonepe.com/apis/pg/checkout/v2/pay";
    if (
      !process.env.NEXT_PUBLIC_DOMAIN_NAME ||
      !process.env.PHONEPE_MERCHANT_ID
    ) {
      return NextResponse.json({ error: "No env" });
    }
    const merchantOrderId = "T" + Date.now();
    const response = await fetch(`${prod_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${cachedToken}`,
      },
      body: JSON.stringify({
        merchantOrderId: merchantOrderId,
        amount: 5000,
        expireAfter: 1200,
        metaInfo: {
          udf1: "additional-information-1",
          udf2: "additional-information-2",
          udf3: "additional-information-3",
          udf4: "additional-information-4",
          udf5: "additional-information-5",
        },
        paymentFlow: {
          type: "PG_CHECKOUT",
          message: "Payment message used for collect requests",
          merchantUrls: {
            redirectUrl: `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/payments/status/?merchantId=${merchantOrderId}`,
          },
        },
      }),
    });
    if (!response) {
      console.log("SereE");
      return NextResponse.json({ error: "Initialization error" });
    }
    const initialtePayment = await response.json();
    if (!initialtePayment) {
      console.log("SereE");
      return NextResponse.json({ error: "Initialization error" });
    }
    console.log(initialtePayment);
    return NextResponse.json({
      message: `${initialtePayment.redirectUrl}`,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
