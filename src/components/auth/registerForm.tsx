"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./cardWrapper";
import { useForm } from "react-hook-form";
// import { LoginSchema } from "@/lib";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import FormSuccess from "../common/formSuccess";
import FormError from "../common/formError";
import { Button } from "../ui/button";
// import { set } from "date-fns";
// import { login } from "@/_actions/login";
// import { useRouter } from "next/navigation";
import { OtpFormSchema, RegisterSchema } from "@/lib";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";
import { Checkbox } from "../ui/checkbox";
import { registerClient } from "@/_actions/registerClient";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { Command, CommandItem, CommandList } from "../ui/command";
import { CheckIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import FileUpload from "../common/fileUpload";
// import axios from "axios";
import { otpGen } from "@/_actions/otp";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

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

const RegisterForm = () => {
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [open, setOpen] = React.useState(false);
  const [success, setSuccess] = useState<string | undefined>("");
  const [value] = React.useState("");
  const [img, setImg] = useState("");
  // const [mail, setMail] = useState("");
  // const [sentMail, setSentMail] = React.useState(false);
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      gmail: "",
      password: "",
      name: "",
      country: false,
    },
  });
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
  const handleOtp = async (values: z.infer<typeof OtpFormSchema>) => {
    // const otp = Math.floor(Math.random() * 900000) + 100000;
    try {
      // const result = await axios.post("/api/sendMail", {
      //   to: values.gmail,
      //   subject: "Your OTP for MapRap Verification",
      //   text: `Your OTP is ${otp}`,
      //   otp: otp,
      // });
      // setMail(values.gmail);
      // setSentMail(true);
      const gen = await otpGen({ ...values, img });
      if (gen) {
        if (gen.success) {
          // if (gen.message) {
          // console.log(gen)
          setSuccess(gen.success);
          window.location.replace("/");
          // }
        } else {
          setError(gen.error);
        }
      }
      return { message: "Our team will sonn approve your account!" };
    } catch (error) {
      return { message: error };
    }
  };
  const onRegisterSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      registerClient(values).then((data) => {
        if (data) {
          console.log("data", data);
          setError(data.error);
          if (data.success) {
            setSuccess("Successfully registered");
          }
          // if (data.type) {
          //   setType(data.type);
          //   if (data.type === "admin" || data.type === "owner") {
          //     router.push("/admin");
          //   }
          // }
          if (!data) {
            setError("No such user exists, please create an account");
          }
        }
      });
    });
  };

  return (
    <Tabs>
      <TabsList className="w-full">
        <TabsTrigger value="Client" className="w-full">
          Client
        </TabsTrigger>
        <TabsTrigger value="Student" className="w-fit">
          Student/Professional
        </TabsTrigger>
      </TabsList>
      <TabsContent value="Student">
        {" "}
        <Card className="flex flex-col items-center w-[90vw] h-[60vh] overflow-scroll">
          <CardHeader>
            <CardTitle>Student Register</CardTitle>
          </CardHeader>
          <CardContent>
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
                    Register
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
                    // setReg(!reg);
                    window.location.replace(
                      `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/auth/login/`
                    );
                  }}
                >
                  Already have an account?
                </button>
              </div>
            </Form>
          </CardContent>
        </Card>
      </TabsContent>
      <TabsContent value="Client">
        <CardWrapper
          headerLabel="Create an account"
          backButtonLabel="Already have an account?"
          backButtonHref="/auth/login"
          showSocial
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onRegisterSubmit)}>
              <div className="grid w-full items-center gap-4 h-[40vh]">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="John doe"
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
                  control={form.control}
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
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="*******"
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
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <FormLabel> Do you live in India {`(Yes/No)`}</FormLabel>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSuccess message={success} />
                <FormError message={error} />
                <Button type="submit" disabled={isPending}>
                  Register
                </Button>
              </div>
            </form>
            <div className="pt-4  text-center">or</div>
          </Form>
        </CardWrapper>
      </TabsContent>
    </Tabs>
  );
};

export default RegisterForm;
