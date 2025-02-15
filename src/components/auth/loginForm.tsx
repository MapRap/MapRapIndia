"use client";

import * as z from "zod";
import React, { useState, useTransition } from "react";
import { CardWrapper } from "./cardWrapper";
import { useForm } from "react-hook-form";
import { LoginSchema } from "@/lib";
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
import { login } from "@/_actions/login";
import { useSearchParams } from "next/navigation";
// import { set } from "date-fns";

const LoginForm = () => {
  const searchParams = useSearchParams();
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider"
      : "";
  // const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      gmail: "",
      password: "",
    },
  });

  const onLoginSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    startTransition(() => {
      login(values).then((data) => {
        setError(data?.error);
        //     if(data?.success) {
        //     setSuccess(data?.success);
        //   }
      });
    });
  };

  return (
    <CardWrapper
      headerLabel="Welcome back"
      backButtonLabel="Don't have an account?"
      backButtonHref="/auth/register"
      showSocial
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onLoginSubmit)}>
          <div className="grid w-full items-center gap-4">
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
            <FormSuccess message={success} />
            <FormError message={error || urlError} />
            <Button type="submit" disabled={isPending}>
              Login
            </Button>
          </div>
        </form>
        <div className="pt-3 text-center">
          or
          {/* <button
            className="text-sm hover:font-semibold hover:underline"
            onClick={() => {
              // setReg(!reg);
              setError("");
              setSuccess("");
            }}
          >
            Don{"'"}t have an account?
          </button> */}
        </div>
      </Form>
    </CardWrapper>
  );
};

export default LoginForm;
