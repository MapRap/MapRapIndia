"use client";
import { startInteriorStepProp } from "@/_actions/startInteriorStepProp";
import { Loading2 } from "@/components/common/loader2";
import DownloadReceiptButton from "@/components/common/receipt";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const stepId = searchParams.get("stepId");
  const orderId = searchParams.get("orderId");
  const [loading, setLoading] = useState(true);
  const amount = searchParams.get("amount");

  useEffect(() => {
    if (stepId) {
      startInteriorStepProp({ id: stepId }).then((changed) => {
        if (changed) {
          if (changed === "Successfully strted the step") {
            setLoading(false);
          }
        }
      });
    }
  }, [stepId]);
  console.log(orderId, stepId, amount);
  console.log(orderId, stepId, amount);
  return loading ? (
    <div className="h-screen w-screen flex items-center flex-col justify-center">
      <Loading2 loading={loading} />
      <div>Please do not close the window!</div>
    </div>
  ) : (
    <div>
      {orderId && stepId && amount && (
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="flex flex-col items-center justify-center">
            <h1>Payment Successful!</h1>
            <div>orderId: {orderId}</div>
            <div>Amount: {Number(amount) / 100}</div>
          </div>
          <div>Our Team will soon start working on your project</div>

          <div className="mt-4">
            <DownloadReceiptButton id={orderId} amount={amount} />
          </div>
        </div>
      )}
    </div>
  );
}
