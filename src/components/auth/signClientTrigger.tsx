"use client";
import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import SignClient from "./signClient";

const SignTri = () => {
  const [reg, setReg] = useState(false);
  return (
    <Dialog>
      <DialogTrigger className="bg-blue-600 border hover:bg-blue-700 rounded-lg text-white font-medium text-md w-20 p-2">
        Login
      </DialogTrigger>
      <DialogContent className="p-0">
        <DialogTitle>
          <SignClient reg={reg} setReg={setReg} />
        </DialogTitle>
        <DialogDescription></DialogDescription>
      </DialogContent>
    </Dialog>
  );
};

export default SignTri;
