"use client";
import React from "react";

const LogoComp = () => {
  return (
    <img
      src={`../logo.png`}
      alt="logo"
      width={80}
      className="rounded-lg cursor-pointer top-4 left-2"
      onClick={() => {
        window.location.replace("/");
      }}
    />
  );
};

export default LogoComp;
