// import Script from "next/script";
import type { Metadata } from "next";
import "./globals.css";
import { DM_Sans } from "next/font/google";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";
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

// import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import Script from "next/script";

// const initialOptions = {
//   clientId: process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID || "",
//   currency: "USD",
//   intent: "capture",
// };

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <SessionProvider session={session}>
      <html lang="en">
        {/* <Head> */}
        {/* Include Razorpay's checkout script */}
        {/* <script src="https://checkout.razorpay.com/v1/checkout.js"></script> */}
        {/* </Head> */}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive" // Ensures script loads after page is interactive
        />

        <body className={`${font.className} text-black`}>
          {/* <PayPalScriptProvider options={initialOptions}> */}
          {children}
          {/* </PayPalScriptProvider> */}
        </body>
      </html>
    </SessionProvider>
  );
}
