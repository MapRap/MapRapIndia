"use client";
import React from "react";

const CancellationPage = () => {
  return (
    <div className="m-2 flex flex-col items-center">
      <img
        src={`../logo.png`}
        alt="logo"
        width={80}
        className="rounded-lg cursor-pointer absolute top-0 left-0"
        onClick={() => {
          window.location.replace("/");
        }}
      />
      <div className="font-bold text-center mt-6">Cancellation Policy</div>
      <div className="w-4/5">WE DO NOT OFFER ANY CANCELLATION AND REFUND</div>
    </div>
  );
};

export default CancellationPage;
