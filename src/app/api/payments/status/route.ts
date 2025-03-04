import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import axios from "axios";

// const MERCHANT_KEY = "96434309-7796-489d-8924-ab56988a6076";
// const MERCHANT_ID = "PGTESTPAYUAT86";

// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/pay"
// const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status"

// const MERCHANT_BASE_URL =
//   "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/pay";

const prod_URL = "https://api.phonepe.com/apis/hermes/pg/v1/status";
// const MERCHANT_STATUS_URL =
//   "https://api-preprod.phonepe.com/apis/pg-sandbox/pg/v1/status";

// const redirectUrl = "http://localhost:8000/status";

const successUrl = new URL(
  "/payment/success",
  `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`
).toString();
const failureUrl = new URL(
  "/payment/failure",
  `${process.env.NEXT_PUBLIC_DOMAIN_NAME}`
).toString();
export async function POST(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const merchantTransactionId = searchParams.get("id");
    if (!merchantTransactionId) {
      return NextResponse.json(
        { error: "Missing merchantTransactionId" },
        { status: 400 }
      );
    }
    const keyIndex = 1;
    const stringToHash =
      `/pg/v1/status/${process.env.PHONEPE_MERCHANT_ID}/${merchantTransactionId}` +
      process.env.PHONEPE_API_KEY;
    const sha256 = crypto
      .createHash("sha256")
      .update(stringToHash)
      .digest("hex");
    const checksum = sha256 + "###" + keyIndex;

    const options = {
      method: "GET",
      url: `${prod_URL}/${process.env.PHONEPE_MERCHANT_ID}}/${merchantTransactionId}`,
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        "X-VERIFY": checksum,
        "X-MERCHANT-ID": process.env.PHONEPE_MERCHANT_ID,
      },
    };

    const response = await axios.request(options);

    if (response.data.success === true) {
      return NextResponse.redirect(successUrl, 307);
    } else {
      return NextResponse.redirect(failureUrl, 307);
    }
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
