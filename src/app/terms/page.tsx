"use client";
import React from "react";

const TermsPage = () => {
  return (
    <div className="m-2 flex flex-col ">
      <img
        src={`../logo.png`}
        alt="logo"
        width={80}
        className="rounded-lg cursor-pointer absolute top-0 left-0"
        onClick={() => {
          window.location.replace("/");
        }}
      />
      <div className="font-bold text-center mt-4">Terms and Condition</div>
      <div className="text-center">
        {" "}
        Maprap operated by MyNaksha by Ar.Ayush Choudhary
      </div>
    </div>
  );
};

export default TermsPage;
