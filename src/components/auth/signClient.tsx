"use client";
import React, { FormEvent, useEffect, useState, useTransition } from "react";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import {
  LoginSchema,
  OtpFormSchema,
  // OtpVerifySchema,
  // RegisterSchema,
} from "@/lib";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Button } from "../ui/button";
import FormError from "../common/formError";
import FormSuccess from "../common/formSuccess";
import { login } from "@/_actions/login";
import { register } from "@/_actions/register";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandItem, CommandList } from "../ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import axios from "axios";
import { otpGen } from "@/_actions/otp";
import { useRouter } from "next/navigation";
import FileUpload from "../common/fileUpload";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "../ui/input-otp";
import Regenerate from "./regenerate";
import { Checkbox } from "../ui/checkbox";

type Props = {
  reg: boolean;
  setReg: React.Dispatch<React.SetStateAction<boolean>>;
};

const userTypes = [
  {
    label: "4th/5th Year Student",
    value: "student",
  },
  {
    label: "Customer",
    value: "customer",
  },
  {
    label: "Professional",
    value: "professional",
  },
];

const SignClient = ({ reg, setReg }: Props) => {
  const router = useRouter();
  // const [coun, setCountry] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [mail, setMail] = useState("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [value] = React.useState("");
  const [filled, setFilled] = React.useState("");
  const [sentMail, setSentMail] = React.useState(false);
  const [type, setType] = useState("");
  const [img, setImg] = useState("");
  useEffect(() => {
    if (success === "Login Successful") {
      // if (type === "admin") {
      //   router.push("/admin");
      // }
      setSuccess("");
      setTimeout(() => {
        window.location.reload();
      }, 4000);
      console.log(error);
      console.log(success);
    }
  }, [error, router, success, type]);
  console.log(error);
  console.log(success);
  console.log(type);
  const form3 = useForm<z.infer<typeof OtpFormSchema>>({
    resolver: zodResolver(OtpFormSchema),
    defaultValues: {
      gmail: "",
      password: "",
      name: "",
      type: "",
      Phone: "",
      country: true,
      paymentId: "",
    },
  });
  const form2 = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      gmail: "",
      password: "",
    },
  });
  const onLoginSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values).then((data) => {
        if (data) {
          console.log("data", data);
          setError(data.error);
          setSuccess(data.success);
          if (data.type) {
            setType(data.type);
            if (data.type === "admin" || data.type === "owner") {
              router.push("/admin");
            }
          }
          if (!data) {
            setError("No such user exists, please create an account");
          }
        }
      });
    });
  };
  const onRegisterSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    startTransition(() => {
      register(filled, mail).then((data) => {
        console.log(data);
        // if(typeof data?.error !=="undefined" || data?.error !==null){
        if (data?.error instanceof Error) {
          setError(data?.error.message);
        }
        // }
        setSuccess(data?.success);
        setTimeout(() => {
          window.location.reload();
        }, 4000);
      });
    });
  };
  const handleOtp = async (values: z.infer<typeof OtpFormSchema>) => {
    const otp = Math.floor(Math.random() * 900000) + 100000;
    try {
      const result = await axios.post("/api/sendMail", {
        to: values.gmail,
        subject: "Your OTP for MyNaksha Verification",
        text: `Your OTP is ${otp}`,
        otp: otp,
      });
      setMail(values.gmail);
      setSentMail(true);
      const gen = await otpGen({ ...values, otp, img });
      if (gen) {
        if (gen.success === true) {
          // if (gen.message) {
          // console.log(gen)
          setSuccess(gen.message);
          // }
        } else {
          setError(gen.error);
        }
      }
      return { message: result.data || "Email sent successfully!" };
    } catch (error) {
      return { message: error };
    }
  };
  return (
    <Card
      className={`font-sans hover:bg-slate-100 ${
        reg === true ? `h-[95vh]` : `h-[55vh]`
      } mt-40 lg:mt-16`}
    >
      <CardTitle>
        <CardHeader className="font-extrabold text-center">
          {reg === true ? "Create an account" : "Login"}
        </CardHeader>
      </CardTitle>
      <CardContent className="">
        {reg === true ? (
          <div>
            {!sentMail ? (
              <Form {...form3}>
                <form onSubmit={form3.handleSubmit(handleOtp)}>
                  <div className="grid w-full items-center gap-4">
                    <div className="flex gap-2 justify-between">
                      <FormField
                        control={form3.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your name"
                                type="name"
                                disabled={isPending}
                                className="hover:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form3.control}
                        name="Phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Phone</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your phonoe number"
                                type="Phone"
                                disabled={isPending}
                                className="hover:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form3.control}
                        name="paymentId"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Enter your paypal/upi Id</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter your Id"
                                type="paymentId"
                                disabled={isPending}
                                className="hover:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex items-center gap-2 justify-between">
                      <FormField
                        control={form3.control}
                        name="gmail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Gmail</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="abc@gmail.com"
                                type="gmail"
                                disabled={isPending}
                                className="hover:border-slate-400"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form3.control}
                        name="password"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                placeholder="Enter password"
                                type="password"
                                className="hover:border-slate-400"
                                disabled={isPending}
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form3.control}
                        name="country"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Checkbox
                                checked={field.value}
                                onCheckedChange={field.onChange}
                              />
                            </FormControl>
                            <FormLabel>
                              {" "}
                              Do you live in India {`(Yes/No)`}
                            </FormLabel>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <FormField
                      control={form3.control}
                      name="type"
                      render={({ field }) => (
                        <FormItem>
                          {/* <FormLabel>Enter your role</FormLabel> */}
                          <FormControl>
                            <Popover open={open} onOpenChange={setOpen}>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  role="combobox"
                                  aria-expanded={open}
                                  className="w-[200px] justify-between ml-3"
                                >
                                  {field.value
                                    ? userTypes.find(
                                        (userType) =>
                                          userType.value === field.value
                                      )?.label
                                    : "Enter your role..."}
                                  <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent>
                                <Command>
                                  <CommandList>
                                    {userTypes.map((userType) => (
                                      <CommandItem
                                        key={userType.value}
                                        onSelect={() => {
                                          field.onChange(userType.value);
                                          setOpen(false);
                                        }}
                                      >
                                        {userType.label}
                                        <CheckIcon
                                          className={cn(
                                            "ml-auto h-4 w-4",
                                            value === userType.value
                                              ? "opacity-100"
                                              : "opacity-0"
                                          )}
                                        />
                                      </CommandItem>
                                    ))}
                                  </CommandList>
                                </Command>
                              </PopoverContent>
                            </Popover>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form3.control}
                      name="Proof"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-center">
                            Upload Id {"(Adhaar/pan)"} Proof{" "}
                            {
                              "(Id card/Degree certificte for student/professionals)"
                            }
                          </FormLabel>

                          <FormControl>
                            {/* <div className="h-14"> */}
                            <FileUpload
                              endPoint="imageUploader"
                              onChange={field.onChange}
                              value={field.value}
                              setImageUrl={setImg}
                            />
                            {/* </div> */}
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button type="submit" disabled={isPending}>
                      Generate otp
                    </Button>
                    {/* <FormSuccess message={} /> */}
                    {/* <FormError message={error} /> */}
                    <FormSuccess message={success} />
                    <FormError message={error} />
                  </div>
                </form>
                <div className="py-4  text-center">
                  <button
                    className="text-sm hover:font-semibold hover:underline"
                    onClick={() => {
                      setReg(!reg);
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Already have an account?
                  </button>
                </div>
              </Form>
            ) : (
              <div>
                <form onSubmit={onRegisterSubmit}>
                  <div className="grid w-full items-center gap-4">
                    <div className="text-sm font-bold">Enter Otp</div>
                    {/* <input
                      placeholder={"Enter the otp send to you"}
                      type="number"
                      disabled={false}
                      className="hover:border-slate-400 w-1/2 rounded-lg p-3"
                      onChange={(e) => {
                        const value = e.target.value;
                        console.log(value);
                        setFilled(e.target.value);
                      }}
                    /> */}
                    <InputOTP
                      maxLength={6}
                      onChange={(e) => {
                        // const value = e;
                        // console.log(value);
                        setFilled(e);
                        // setOtp(e);
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
                    <FormSuccess message={success} />
                    <FormError message={error} />
                    <Button type="submit" disabled={isPending}>
                      Create an Account
                    </Button>
                  </div>
                </form>
                {/* <Button
                  className="bg-green-600 hover:bg-green-700 w-1/2 mt-5"
                  onClick={() => {}}
                >
                  Regnerate otp
                </Button> */}
                <Regenerate
                  gmail={mail}
                  setError={setError}
                  setSuccess={setSuccess}
                />
                <div className="py-4  text-center">
                  <button
                    className="text-sm hover:font-semibold hover:underline"
                    onClick={() => {
                      setReg(!reg);
                      setError("");
                      setSuccess("");
                    }}
                  >
                    Already have an account?
                  </button>
                </div>
              </div>
            )}
          </div>
        ) : (
          <Form {...form2}>
            <form onSubmit={form2.handleSubmit(onLoginSubmit)}>
              <div className="grid w-full items-center gap-4">
                <FormField
                  control={form2.control}
                  name="gmail"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gmail</FormLabel>
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
                <FormField
                  control={form2.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter password"
                          type="password"
                          className="hover:border-slate-400"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSuccess message={success} />
                <FormError message={error} />
                <Button type="submit" disabled={isPending}>
                  Login
                </Button>
              </div>
            </form>
            <div className="py-4  text-center">
              <button
                className="text-sm hover:font-semibold hover:underline"
                onClick={() => {
                  setReg(!reg);
                  setError("");
                  setSuccess("");
                }}
              >
                Don{"'"}t have an account?
              </button>
            </div>
          </Form>
        )}
        {!reg === true && (
          <button
            className="text-sm hover:underline cursor-pointer"
            onClick={() => {
              router.push(`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/reset`);
            }}
          >
            Forgot Password?
          </button>
        )}
      </CardContent>
    </Card>
  );
};

export default SignClient;
