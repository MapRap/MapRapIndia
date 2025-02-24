"use client";
import React, { useState } from "react";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";
import { useForm } from "react-hook-form";
import { QuerySchema } from "@/lib";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";
import axios from "axios";
import FormSuccess from "./formSuccess";
import FormError from "./formError";

const QueryForm = () => {
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<string>("");
  const form = useForm<z.infer<typeof QuerySchema>>({
    resolver: zodResolver(QuerySchema),
    defaultValues: {
      email: "",
      name: "",
      phone: "",
      requirement: "",
      city: "",
    },
  });

  const handleSubmit = async (e: {
    name: string;
    phone: string;
    email: string;
    requirement: string;
    city: string;
  }) => {
    try {
      // startTransition(() => {
      axios
        .post("/api/queryMail", {
          to: e.email,
          subject: "MapRap Query",
          text: `name:${e.name}  | Phone:${e.phone}  | city:${e.city}  | requirement : ${e.requirement}`,
          requirement: `${e.requirement}`,
        })
        .then((res) => {
          if (res) {
            // window.location.reload();
            setSuccess("Our Team will soon contact you");
          } else {
            setError("Error! Please try again");
          }
          // });
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex justify-center m-4">
      <Card className="w-3/4 lg:w-1/2 hover:bg-gray-50">
        <CardHeader>
          <CardTitle className="text-center">
            Consult With Our Home Design Experts
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full">
              <div className="grid w-full justify-center items-center gap-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem className="lg:w-[30vw]">
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="name"
                          className="hover:border-slate-400"
                          placeholder="Enter your name"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Phone</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="name"
                          className="hover:border-slate-400"
                          placeholder="Enter your phone number"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Gmail</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="name"
                          className="hover:border-slate-400"
                          placeholder="Enter your Gmail"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="city"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          type="name"
                          className="hover:border-slate-400"
                          placeholder="Enter your City"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="requirement"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Requirement</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          className="hover:border-slate-400"
                          placeholder="Enter your Requirement"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormSuccess message={success} />
                <FormError message={error} />
                <Button className="bg-green-500 hover:bg-green-600">
                  Book Online Consultatioin
                </Button>
              </div>
            </form>
          </Form>
          <div className="text-slate-600 text-[10px] lg:text-xs w-3/4 lg:w-1/2 mt-10 text-center">
            By submitting this form, you consent to our team contacting you.
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QueryForm;
