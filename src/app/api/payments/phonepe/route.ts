// import { randomUUID } from "crypto";
// import crypto from "crypto";
// import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
// import axios from "axios";
// import { client } from "@/lib/phonepe";
// import { StandardCheckoutPayRequest } from "pg-sdk-node";
// import axios from "axios";

let cachedToken: string | null = null;
let merchantId: string | null = null;

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    console.log(request.udf1);
    // console.log("SAFDA", process.env.PHONEPE_CLIENT_ID);
    // const MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076";
    // const MERCHANT_ID = "PGTESTPAYUAT86";
    // const MERCHANT_BASE_URL =
    //   "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    const urlEncodedData = new URLSearchParams({
      client_id: `${process.env.PHONEPE_CLIENT_ID}`,
      client_version: `${1}`, // Convert to string dynamically
      client_secret: `${process.env.PHONEPE_API_KEY}`,
      grant_type: "client_credentials",
    }).toString();
    // const tokenUrl =
    //   "https://api-preprod.phonepe.com/apis/pg-sandbox/v1/oauth/token";
    // const tokenOptions = {
    //   method: "POST",
    //   url: tokenUrl,
    //   headers: {
    //     // accept: "application/json",
    //     "Content-Type": "application/x-www-form-urlencoded",
    //   },
    //   data: {
    //     body: urlEncodedData,
    //   },
    // };
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
    // const orderId = "T" + Date.now();
    if (
      !process.env.NEXT_PUBLIC_DOMAIN_NAME ||
      !process.env.PHONEPE_MERCHANT_ID
    ) {
      // console.log("KEMKfmK");
      return NextResponse.json({ error: "No env" });
    }
    // const redirectUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/payments/status`;
    // const successUrl = "http://localhost:3000/payment/success";
    // const failureUrl = "http://localhost:3000/payment/failure";
    // const paymentPayload = {
    //   merchantId: process.env.PHONEPE_MERCHANT_ID,
    //   merchantUserId: `${request.name}`,
    //   mobileNumber: `${request.phone}`,
    //   amount: Number(request.amount) * 100,
    //   merchantTransactionId: orderId,
    //   redirectUrl: `${redirectUrl}/?id=${orderId}`,
    //   redirectMode: "POST",
    //   paymentInstrument: {
    //     type: "PAY_PAGE",
    //   },
    // };
    const response = await fetch(`${prod_URL}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `O-Bearer ${cachedToken}`,
      },
      body: JSON.stringify({
        merchantOrderId: "T" + Date.now(),
        amount: 100,
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
            redirectUrl: "http://localhost:3000/api/payments/phonepe",
          },
        },
      }),
    });
    if (!response) {
      console.log("SereE");
      return NextResponse.json({ error: "Initialization error" });
    }
    const initialtePayment = await response.json();
    merchantId = initialtePayment.merchantOrderId;
    console.log(initialtePayment);
    // console.log("res", response.data.data.instrumentResponse.redirectInfo.url);
    return NextResponse.json({
      message: `${initialtePayment.redirectUrl}`,
    });
    // return NextResponse.json({
    //   message: `${"GG"}`,
    // });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
  // const { amount, redirectUrl } = await req.json();

  // const merchantOrderId = randomUUID();

  // const payRequest = StandardCheckoutPayRequest.builder()
  //   .merchantOrderId(merchantOrderId)
  //   .amount(amount)
  //   .redirectUrl(redirectUrl)
  //   .build();
  // try {
  //   const response = await client.pay(payRequest);
  //   return NextResponse.json({ checkoutPageUrl: response.redirectUrl });
  // } catch (err) {
  //   console.log(err);
  //   return NextResponse.json(
  //     { error: "Payment initiation failed" },
  //     { status: 500 }
  //   );
  // }
}

export async function GET(req: NextRequest) {
  try {
    const request = await req.json();
    console.log(request);
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
    if (orderStatusObj.state !== "COMPLETED") {
      return NextResponse.redirect(
        new URL("/payment/failure", process.env.NEXT_PUBLIC_DOMAIN_NAME)
      );
    }
    return NextResponse.redirect(
      new URL("/payment/success", process.env.NEXT_PUBLIC_DOMAIN_NAME)
    );
  } catch (err) {
    console.log(err);
  }
}
