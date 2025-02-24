"use client";
import React from "react";

const AdminComp = () => {
  return (
    <div
      className="p-4 rounded-full bg-blue-600 w-fit text-white font-semibold w-fit right-2 top-3 cursor-pointer "
      onClick={() => {
        window.location.replace(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/admin`);
      }}
    >
      Admin
    </div>
  );
};

export default AdminComp;
