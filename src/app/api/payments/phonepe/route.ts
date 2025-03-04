import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    const request = await req.json();
    // console.log("SAFDA", process.env.PHONEPE_CLIENT_ID);
    // const MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076";
    // const MERCHANT_ID = "PGTESTPAYUAT86";
    // const MERCHANT_BASE_URL =
    //   "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";
    const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay";
    const orderId = "T" + Date.now();
    const redirectUrl = `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/api/payments/status`;
    // const successUrl = "http://localhost:3000/payment/success";
    // const failureUrl = "http://localhost:3000/payment/failure";
    const paymentPayload = {
      merchantId: process.env.PHONEPE_MERCHANT_ID,
      merchantUserId: `${request.name}`,
      mobileNumber: `${request.phone}`,
      amount: Number(request.amount) * 100,
      merchantTransactionId: orderId,
      redirectUrl: `${redirectUrl}/?id=${orderId}`,
      redirectMode: "POST",
      paymentInstrument: {
        type: "PAY_PAGE",
      },
    };
    const payload = Buffer.from(JSON.stringify(paymentPayload)).toString(
      "base64"
    );
    const keyIndex = 1;
    const string = payload + "/pg/v1/pay" + process.env.PHONEPE_API_KEY;
    const sha256 = crypto.createHash("sha256").update(string).digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const option = {
      method: "POST",
      url: prod_URL,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
      },
      data: {
        request: payload,
      },
    };

    const response = await axios.request(option);
    if (!response) {
      return NextResponse.json({ error: "No res" });
    }

    console.log("res", response.data.data.instrumentResponse.redirectInfo.url);
    return NextResponse.json({
      message: `${response.data.data.instrumentResponse.redirectInfo.url}`,
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
