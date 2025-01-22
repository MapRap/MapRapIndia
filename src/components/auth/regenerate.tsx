import React from "react";
import { regenerate } from "@/_actions/regenerateOtp";
import axios from "axios";

const Regenerate = ({
  gmail,
  setError,
  setSuccess,
}: {
  gmail: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const regenerateOtp = async ({ gmail }: { gmail: string }) => {
    const otp = Math.floor(Math.random() * 900000) + 100000;
    try {
      const result = await axios.post("/api/sendMail", {
        to: gmail,
        subject: "Your OTP for MyNaksha Verification",
        text: `Your OTP is ${otp}`,
        otp: otp,
      });
      //   setMail(values.gmail);
      // setSentMail(true);
      const gen = await regenerate({ gmail, otp: otp.toString() });
      if (gen) {
        if (gen === "Network Error") {
          // if (gen.message) {
          // console.log(gen)
          setError(`${gen}! Please try again`);
          // }
        } else {
          setSuccess(gen);
        }
      }
      return { message: result.data || "Email sent successfully!" };
    } catch (error) {
      return { message: error };
    }
  };
  return (
    <div
      className=" hover:underline text-black text-sm mt-2 cursor-pointer"
      onClick={() => {
        regenerateOtp({ gmail });
      }}
    >
      Regenerate OTP
    </div>
  );
};

export default Regenerate;
