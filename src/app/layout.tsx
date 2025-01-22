import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
// import Document, { Html, Head, Main, NextScript } from 'next/document';

const font = DM_Sans({ subsets: ["latin"] });

// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

export const metadata: Metadata = {
  title: "MapRap",
  description: "The Art of Home Design",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      {/* <Head> */}
      {/* Include Razorpay's checkout script */}
      {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
      {/* </Head> */}
      <Script
        src="https://checkout.razorpay.com/v1/checkout.js"
        strategy="afterInteractive" // Ensures script loads after page is interactive
      />
      <body className={`${font.className} text-black`}>{children}</body>
    </html>
  );
}
