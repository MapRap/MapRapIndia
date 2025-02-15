"use client";
import { signOut } from "next-auth/react";
import React from "react";

const LogOutButton = () => {
  return (
    <div
      onClick={async () => {
        // onClick={async () => {
        await signOut();
        // clearUserSession().then((e) => {
        //   if (e) {
        //     if (e === "success") {
        //       window.location.reload();
        //     }
        //   }
        // });
        //   }}
      }}
    >
      Logout
    </div>
  );
};

export default LogOutButton;
