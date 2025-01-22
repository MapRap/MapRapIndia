import { razorpay } from "@/lib/razorpay";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { totalAmount, currency, step } = await req.json();

    // Calculate the percentage for this step
    const stepPercentages = [25, 25, 25, 25]; // Percentages for 4 steps
    const stepPercentage = stepPercentages[step - 1]; // 1-based index
    const stepAmount = Math.round((totalAmount * stepPercentage) / 100); // Amount in smallest unit (e.g., paise)
    console.log(totalAmount);
    // Create Razorpay order
    const order = step
      ? await razorpay.orders.create({
          amount: stepAmount,
          currency,
          receipt: `step_${step}_${Date.now()}`,
          notes: {
            receipt_id: `step_${step}_${Date.now()}`,
          }, // Unique receipt for each step
          payment_capture: true, // Auto-capture payment
        })
      : await razorpay.orders.create({
          amount: totalAmount,
          currency,
          receipt: `Plan_${Date.now()}`,
          notes: {
            receipt_id: `Plan_${Date.now()}`,
          }, // Unique receipt for each step
          payment_capture: true, // Auto-capture payment
        });

    return NextResponse.json(order); // Send the order details to the client
  } catch (error) {
    console.error("Error creating Razorpay order:", error);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }
}
