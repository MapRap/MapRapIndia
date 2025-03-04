import React from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
// import { ChevronDownIcon } from "lucide-react";

const TestSiteVisitComp = () => {
  const initiatePayment = async () => {
    {
      //   setLoading(true);
      const merchantTransactionId = "T" + Date.now(); // Unique transaction ID

      try {
        const response = await fetch("/api/payments/phonepe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            amount: 3,
            name: "Vishwansh",
            phone: "8899735010",
            transactionId: merchantTransactionId,
            muid: "M" + Date.now(),
          }),
        });
        // console.log("da", response);
        const res = await response.json();
        // console.log("dasf", res);
        if (res) {
          if (!res.message) {
            // if(!response)
            window.location.replace("/payment/failure");
          }
          window.location.href = `${res.message}`;
        }

        const data = await response.json();
        if (data.data && data.data.instrumentResponse.redirectInfo.url) {
          //   setPaymentUrl(data.data.instrumentResponse.redirectInfo.url);
          window.location.href = data.data.instrumentResponse.redirectInfo.url;
        }
      } catch (error) {
        console.log("Payment error:", error);
      } finally {
        // setLoading(false);
      }
    }
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger
          asChild
          className="flex items-center justify-center p-0 cursor-pointer"
        >
          <div className="hover:underline text-[8px] font-semibold md:text-base rounded-xl text-white w-20 md:w-32 ">
            {/* <ChevronDownIcon /> */}
            Want a site visit
          </div>
        </PopoverTrigger>
        <PopoverContent
          className="flex cursor-pointer flex-col p-2 hover:bg-slate-50 mt-6"
          //   className="cursor-pointer"
          onClick={() => {
            initiatePayment();
          }}
        >
          Trikuta Nagar
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default TestSiteVisitComp;
