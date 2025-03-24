// components/DownloadReceiptButton.tsx
import React from "react";
import { PDFDocument, StandardFonts, rgb } from "pdf-lib";

interface DownloadReceiptButtonProps {
  gmail?: string;
  id: string;
  amount: string;
}

const DownloadReceiptButton: React.FC<DownloadReceiptButtonProps> = ({
  gmail,
  id,
  amount,
}) => {
  const handleDownload = async () => {
    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);

    // Set up fonts
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);

    // Add content to the PDF
    const { width, height } = page.getSize();
    const fontSize = 24;
    const textColor = rgb(0, 0, 0);
    console.log(width);
    // Add heading
    page.drawText(" MapRap - Receipt", {
      x: 50,
      y: height - 50,
      size: fontSize,
      font: boldFont,
      color: textColor,
    });

    // Add receipt details
    if (gmail) {
      page.drawText(`Name: ${gmail}`, {
        x: 50,
        y: height - 100,
        size: 16,
        font,
        color: textColor,
      });
    }

    page.drawText(`Order ID: ${id}`, {
      x: 50,
      y: height - 130,
      size: 16,
      font,
      color: textColor,
    });

    page.drawText(`Amount: Rs. ${Number(amount) / 100}`, {
      x: 50,
      y: height - 160,
      size: 16,
      font,
      color: textColor,
    });

    // Add a thank you message
    page.drawText("Thank you for your purchase!", {
      x: 50,
      y: height - 200,
      size: 16,
      font: boldFont,
      color: textColor,
    });

    // Serialize the PDF to bytes
    const pdfBytes = await pdfDoc.save();

    // Create a Blob and trigger the download
    const blob = new Blob([pdfBytes], { type: "application/pdf" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `receipt-${id}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={handleDownload}
      style={{ padding: "10px 20px", cursor: "pointer" }}
      className="bg-green-500 text-white rounded-lg hover:bg-green-600"
    >
      Download Receipt
    </button>
  );
};

export default DownloadReceiptButton;
