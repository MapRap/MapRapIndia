"use client";
import { changeInititalPayment } from "@/_actions/changeInititalPaymentDetails";
import { Loading2 } from "@/components/common/loader2";
import DownloadReceiptButton from "@/components/common/receipt";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const jobId = searchParams.get("jobId");
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(true);
  const amount = searchParams.get("amount");
  const [job, setJob] = useState<{
    id: string;
    type: string;
    direction: string;
    floors: number;
    price: number;
    plot: string;
    specifications: string | null;
    imageUrl: string;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number | null;
    D1: number | null;
    D3: number | null;
    D4: number | null;
    D2: number | null;
    givenBy: string;
    isVerified: boolean | null;
    assignedTo: string | null;
    completed: boolean;
    publishable: boolean;
    name: string;
    phone: string;
    expected: string | null;
    studentPrice: string | null;
    initialPayment: boolean;
  }>();
  useEffect(() => {
    if (jobId) {
      changeInititalPayment({ id: jobId }).then((e) => {
        console.log(e);
        if (e) {
          if (e !== "Error") {
            if (e !== "Error! Please try again") {
              if (e !== "No such job") {
                setLoading(false);
                setJob(e);
              }
            }
          }
        }
      });
    }
  }, [jobId]);
  // console.log(job, orderId, jobId, amount);
  return loading ? (
    <div className="h-screen w-screen flex items-center flex-col justify-center">
      <Loading2 loading={loading} />
      <div>Please do not close the window!</div>
    </div>
  ) : (
    <div>
      {job && orderId && jobId && amount && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <h1>Payment Successful!</h1>
            <div>orderId: {orderId}</div>
            <div>Amount: {Number(amount) / 100}</div>
            <div>By: {job.name}</div>
          </div>
          <div>Our Team will soon start working on your project</div>
          <div className="mt-4">
            <DownloadReceiptButton
              id={orderId}
              amount={amount}
              gmail={job.name}
            />
          </div>
        </div>
      )}
    </div>
  );
}
