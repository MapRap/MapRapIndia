import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

// Type definition for the request body

export async function POST(req: NextRequest) {
  // if (req) {
  const re = await req.json();
  const to = re.to;
  const subject = re.subject;
  const text = re.text;
  const otp = re.otp;
  console.log(process.env.GMAIL_PASS);
  // Create a Nodemailer transporter object using Gmail's SMTP server
  const transporter = nodemailer.createTransport({
    service: "gmail", // Use Gmail as the service
    auth: {
      user: process.env.GMAIL_USER, // Your Gmail address
      pass: process.env.GMAIL_PASS, // Your Gmail App Password or regular password (if 2FA is disabled)
    },
  });

  try {
    // Send the email
    await transporter.sendMail({
      from: process.env.GMAIL_USER, // Sender address (your Gmail address)
      to: to, // Receiver address
      subject: subject, // Email subject
      text: text, // Email body
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
        <h2 style="color: #333; text-align: center;">MakeMyNaksha OTP Verification</h2>
        <p style="font-size: 16px; color: #555;">Hi</p>
        <p style="font-size: 16px; color: #555;">To complete your login or verify your email ${to} for MakeMyNaksha, please use the following OTP:</p>
        <div style="text-align: center; margin: 20px 0;">
        <span style="font-size: 24px; font-weight: bold; color: #2d3748; padding: 10px 20px; background-color: #f0f0f0; border-radius: 5px; display: inline-block;">${otp}</span>
        </div>
        <p style="font-size: 16px; color: #555;">Please note, this OTP is valid for only 10 minutes. If you didn’t request this, please ignore this email or contact our support team immediately.</p>
        <p style="font-size: 16px; color: #555;">Thank you,<br/>MakeMyNaksha Team</p>
        <hr style="margin-top: 20px;"/>
        <p style="font-size: 12px; color: #888; text-align: center;">This is an automated email, please do not reply.</p>
        </div>`,
    });

    // Respond with success
    return NextResponse.json({ message: "Email sent successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    return NextResponse.json({ error: "Error sending email" }, { status: 500 });
  }
}
// else {
//   return NextResponse.json({ error: "Method Not Allowed" }); // Only allow POST method
// }
// }
