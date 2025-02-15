"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { zodResolver } from "@hookform/resolvers/zod";
import { LockKeyholeIcon } from "lucide-react";
import React, { FormEvent, useState, useTransition } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { ResetSchema1 } from "@/lib";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormSuccess from "@/components/common/formSuccess";
import FormError from "@/components/common/formError";
import { Button } from "@/components/ui/button";
import { getUserByGmail } from "@/_actions/getUserByGmail";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import axios from "axios";
import { passwordResetOtp } from "@/_actions/passwordRestOtp";
import { verifyOtp } from "@/_actions/verifyPasswordResetOtp";
import { setNewPassword } from "@/_actions/setNewPassword";
import RegenerateOtp from "@/components/auth/regenerateOtp";

const ResetPage = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [password, setPassword] = useState<string | undefined>();
  const [confirmPassword, setConfirmPassword] = useState<string | undefined>();
  const [enterPass, setEnterPass] = useState(false);
  const [det, setDet] = useState<{ id: string; gmail: string | null }>({
    id: "",
    gmail: "",
  });
  const [otp, setOtp] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>("");
  const [found, setFound] = useState(false);
  const form1 = useForm<z.infer<typeof ResetSchema1>>({
    resolver: zodResolver(ResetSchema1),
    defaultValues: {
      gmail: "",
    },
  });
  // const form2 = useForm<z.infer<typeof ResetSchema2>>({
  //   resolver: zodResolver(ResetSchema2),
  //   defaultValues: {
  //     otp: 0,
  //   },
  // });
  const onResetSubmit = async (values: z.infer<typeof ResetSchema1>) => {
    startTransition(() => {
      getUserByGmail({ gmail: values.gmail }).then((e) => {
        if (e) {
          if (e === "Error! Please try again") {
            setError(e);
          } else if (e === "No user with this gmail Exists") {
            setError(e);
          } else {
            setDet({ id: e.id, gmail: e.email });
            const otpGen = Math.floor(Math.random() * 900000) + 100000;
            axios
              .post("/api/sendMail", {
                to: values.gmail,
                subject: "Your OTP for MyNaksha Password Reset",
                text: `Your OTP is ${otpGen}`,
                otp: otpGen,
              })
              .then((res) => {
                if (res) {
                  passwordResetOtp({ id: e.id, otp: otpGen.toString() }).then(
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
                        }
                      }
                    }
                  );
                }
              });
            // setSuccess("OTP successfully sent! Plese check your gmail");
          }
        }
      });
    });
  };
  const onOtpSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (otp) {
        const verify = await verifyOtp({ id: det.id, clientOtp: otp });
        if (verify === "Error") {
          setError("Error! Please try again");
        } else if (verify === "Session Timed Out! Please try again!") {
          setError(verify);
        } else if (verify === "Wrong OTP! Enter valid OTP.") {
          setError(verify);
        } else if (verify === "Timeout") {
          setError("Timeout! Please regenerate otp");
        } else if (
          verify === "OTP successfully Verified! Please enter new password"
        ) {
          // setSuccess(verify);
          setEnterPass(true);
          setError("");
          setSuccess("");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  const onPasswordSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (password) {
        if (password !== confirmPassword) {
          setError("Please enter correct password to confirm");
        } else {
          const result = await setNewPassword({
            id: det.id,
            password: password,
          });
          if (result === "Network Error! Please try again") {
            setError("Network Error! Please try again");
          }
          if (result === "Error") {
            setError("Network Error! Please try again");
          }
          if (result === "Password successfully changed") {
            setError("");
            setSuccess(`${result}! Redirecting to home page`);
            setTimeout(() => {
              if (process.env.NEXT_PUBLIC_DOMAIN_NAME) {
                window.location.replace(process.env.NEXT_PUBLIC_DOMAIN_NAME);
              }
            }, 4000);
          }
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="h-screen flex items-center justify-center bg-blue-500">
      {!found ? (
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center justify-center w-full underline">
              <LockKeyholeIcon />
              Reset Your Paassword
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form1}>
              <form onSubmit={form1.handleSubmit(onResetSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <FormField
                    control={form1.control}
                    name="gmail"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Enter Gmail for password reset</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            placeholder="abc@example.com"
                            type="gmail"
                            disabled={isPending}
                            className="hover:border-slate-400"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormSuccess message={success} />
                  <FormError message={error} />
                  <Button type="submit" disabled={isPending}>
                    Generate OTP
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      ) : (
        !enterPass && (
          <Card className="w-1/3">
            <CardHeader>
              <CardTitle className="flex items-center justify-center w-full underline">
                <LockKeyholeIcon />
                Reset Your Paassword
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={onOtpSubmit}>
                <div className="grid w-full items-center gap-4">
                  <div className="text-sm font-bold">Enter Otp</div>
                  <InputOTP
                    maxLength={6}
                    onChange={(e) => {
                      setOtp(e);
                      console.log(e);
                      if (e.length < 6) {
                        setError("6 digit OTP");
                      }
                    }}
                  >
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                    </InputOTPGroup>
                    <InputOTPSeparator />
                    <InputOTPGroup>
                      <InputOTPSlot index={3} />
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                    </InputOTPGroup>
                  </InputOTP>
                  {/* <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button type="submit" disabled={isPending}>
                      Create an Account
                    </Button>
                  </div>
                </form> */}

                  <FormSuccess message={success} />
                  <FormError message={error} />
                  <Button type="submit" disabled={isPending}>
                    Verify OTP
                  </Button>
                </div>
              </form>
              <RegenerateOtp
                gmail={det.gmail}
                id={det.id}
                setError={setError}
                setFound={setFound}
                setSuccess={setSuccess}
              />
              {/* </Form> */}
            </CardContent>
          </Card>
        )
      )}
      {enterPass && (
        <Card className="w-1/3">
          <CardHeader>
            <CardTitle className="flex items-center justify-center w-full underline">
              <LockKeyholeIcon />
              Enter Your Paassword
            </CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={onPasswordSubmit}>
              <div className="grid w-full items-center gap-4">
                <div className="text-sm font-bold">Enter Otp</div>
                <Input
                  placeholder="Enter your new password"
                  type="password"
                  disabled={isPending}
                  className="hover:border-slate-400"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <Input
                  placeholder="Confirm your password"
                  type="password"
                  disabled={isPending}
                  className="hover:border-slate-400"
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                  }}
                />
                {/* <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button type="submit" disabled={isPending}>
                      Create an Account
                    </Button>
                  </div>
                </form> */}

                <FormSuccess message={success} />
                <FormError message={error} />
                <Button type="submit" disabled={isPending}>
                  Change Password
                </Button>
              </div>
            </form>
            {/* </Form> */}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ResetPage;
