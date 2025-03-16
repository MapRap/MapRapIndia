"use client";
import { changeInteriorInititalPayment } from "@/_actions/changeInteriorInitialPayment";
// import { changeInititalPayment } from "@/_actions/changeInititalPaymentDetails";
import { Loading2 } from "@/components/common/loader2";
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
    specifications: string | null;
    floors: number | null;
    property: string;
    area: string;
    givenBy: string;
    price: string;
    isVerified: boolean | null;
    assignedTo: string | null;
    completed: boolean;
    imageUrl: string;
    publishable: boolean;
    attachment: string | null;
    phone: string;
    name: string;
    plan: string;
    studentPrice: string | null;
    initialPayment: boolean;
  }>();
  useEffect(() => {
    if (jobId) {
      changeInteriorInititalPayment({ id: jobId }).then((e) => {
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
    <div className="h-screen w-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div>
      {job && orderId && jobId && amount && (
        <div>
          <div className="flex flex-col items-center justify-center h-screen">
            <h1>Payment Successful!</h1>
            <div>orderId: {orderId}</div>
            <div>Amount: {amount}</div>
            <div>By: {job.name}</div>
          </div>
          <div>Our Team will soon start working on your project</div>
        </div>
      )}
    </div>
  );
}
