import React from "react";
import axios from "axios";
import { passwordResetOtp } from "@/_actions/passwordRestOtp";

const RegenerateOtp = ({
  gmail,
  id,
  setError,
  setFound,
  setSuccess,
}: {
  gmail: string;
  id: string;
  setError: React.Dispatch<React.SetStateAction<string | undefined>>;
  setFound: React.Dispatch<React.SetStateAction<boolean>>;
  setSuccess: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const regenerateOtp = async ({ gmail }: { gmail: string }) => {
    try {
      const otpGen = Math.floor(Math.random() * 900000) + 100000;
      axios
        .post("/api/sendMail", {
          to: gmail,
          subject: "Your OTP for MyNaksha Password Reset",
          text: `Your OTP is ${otpGen}`,
          otp: otpGen,
        })
        .then((res) => {
          if (res) {
            passwordResetOtp({ id: id, otp: otpGen.toString() }).then(
              (result) => {
                if (result) {
                  if (result === "Timeout") {
                    setError(`${result} ! Please Try again`);
                  }
                  if (result === "Error") {
                    setError(`${result} ! Please Try again`);
                  }
                  if (result === "Successfully Generated OTP") {
                    setFound(true);
                    setSuccess(result);
                  }
                }
              }
            );
          }
        });
    } catch (err) {
      console.log(err);
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

export default RegenerateOtp;
