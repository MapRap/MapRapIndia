// import { NextRequest, NextResponse } from 'next';
import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await request.json();

    // Get your Razorpay secret key from environment variables
    const razorpaySecret = process.env.RAZORPAY_SECRET as string;

    // Create the string that you will use to verify the signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;

    // Create the expected signature using the Razorpay secret key
    const expectedSignature = crypto
      .createHmac("sha256", razorpaySecret)
      .update(body)
      .digest("hex");

    // Verify if the signatures match
    if (razorpay_signature === expectedSignature) {
      // Signature is valid, handle the successful payment
      console.log("Payment verification successful");
      return NextResponse.json({ success: true });
    } else {
      // Signature mismatch, handle the failure
      console.log("Payment verification failed");
      return NextResponse.json({ success: false });
    }
  } catch (error) {
    console.error("Error during payment verification", error);
    return NextResponse.json({ success: false });
  }
}
