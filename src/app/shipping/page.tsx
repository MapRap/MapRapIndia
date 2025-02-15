"use client";
import React from "react";

const ShippingPage = () => {
  return (
    <div className="flex flex-col items-center m-2">
      <img
        src={`../logo.png`}
        alt="logo"
        width={80}
        className="rounded-lg cursor-pointer absolute top-0 left-0"
        onClick={() => {
          window.location.replace("/");
        }}
      />
      <div className="font-bold mt-6">Shipping and Delivery</div>
      <div className="w-4/5">
        You hereby agree that the delivery dates are estimates, unless a fixed
        date for the delivery has been expressly agreed in writing. The cost for
        delivery shall be calculated at the time of initiation of Transaction
        based on the shipping address and will be collected from you as a part
        of the Transaction Amount paid for the products and/or services. In the
        event that you do not receive the delivery even after seven days have
        passed from the estimated date of delivery, you must promptly reach out
        to us at seller+12d7dd52d6b741a68a8922090fafd735@instamojo.com.
      </div>
    </div>
  );
};

export default ShippingPage;
