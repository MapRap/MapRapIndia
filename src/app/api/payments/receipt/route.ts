// import { razorpay } from "@/lib/razorpay";
// import { NextRequest, NextResponse } from "next/server";
// import { PDFDocument } from "pdf-lib";

// export async function POST(request: NextRequest) {
//   try {
//     // Parse the request body
//     const { payment_id } = await request.json();

//     if (!payment_id) {
//       return NextResponse.json(
//         { error: "Payment ID is required" },
//         { status: 400 }
//       );
//     }

//     // Fetch payment details
//     const payment = await razorpay.payments.fetch(payment_id as string);
//     const pdfDoc = await PDFDocument.create();
//     const page = pdfDoc.addPage([600, 400]);
//     page.drawText(`Receipt ID: ${payment.notes?.receipt_id || "N/A"}`, {
//       x: 50,
//       y: 350,
//     });
//     page.drawText(`Amount: ₹${Number(payment.amount) / 100}`, {
//       x: 50,
//       y: 330,
//     });
//     page.drawText(`Status: ${payment.status}`, { x: 50, y: 310 });
//     page.drawText(
//       `Date: ${new Date(payment.created_at * 1000).toLocaleString()}`,
//       { x: 50, y: 290 }
//     );

//     const pdfBytes = await pdfDoc.save();

//     // Return the PDF as a response
//     const headers = new Headers({
//       "Content-Type": "application/pdf",
//       "Content-Disposition": `attachment; filename=receipt_${payment_id}.pdf`,
//     });

//     return new NextResponse(pdfBytes, {
//       status: 200,
//       headers,
//     });
//   } catch (error) {
//     console.error("Error generating receipt:", error);

//     return NextResponse.json(
//       { error: "Error generating receipt", details: (error as Error).message },
//       { status: 500 }
//     );
//   }
// }

import { razorpay } from "@/lib/razorpay";
import { NextRequest, NextResponse } from "next/server";
import { PDFDocument, StandardFonts } from "pdf-lib"; // Import StandardFonts here

export async function POST(request: NextRequest) {
  try {
    const { payment_id } = await request.json();

    if (!payment_id) {
      return NextResponse.json(
        { error: "Payment ID is required" },
        { status: 400 }
      );
    }

    // Fetch payment details from Razorpay
    const payment = await razorpay.payments.fetch(payment_id);

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();

    // Use StandardFonts enum to embed Helvetica
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const page = pdfDoc.addPage([600, 400]);
    const fontSize = 12;

    // Get the page's width and height for positioning text
    const { width, height } = page.getSize();
    console.log(width);
    // Set font and font size
    page.setFont(helveticaFont);
    page.setFontSize(fontSize);

    // Draw text on the PDF using the built-in font
    page.drawText(`Receipt ID: ${payment.notes?.receipt_id || "N/A"}`, {
      x: 50,
      y: height - 50,
    });
    page.drawText(`Amount: Rs. ${Number(payment.amount) / 100}`, {
      x: 50,
      y: height - 80,
    });
    page.drawText(`Status: ${payment.status}`, { x: 50, y: height - 110 });
    page.drawText(
      `Date: ${new Date(payment.created_at * 1000).toLocaleString()}`,
      { x: 50, y: height - 140 }
    );

    // Save the PDF as bytes
    const pdfBytes = await pdfDoc.save();

    // Return the PDF as a response
    return new NextResponse(pdfBytes, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=receipt_${payment_id}.pdf`,
      },
    });
  } catch (error) {
    console.error("Error generating receipt:", error);

    return NextResponse.json(
      {
        error: "Error generating receipt",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
