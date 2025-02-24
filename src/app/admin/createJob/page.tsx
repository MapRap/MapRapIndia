"use client";

import { createCustomJob } from "@/_actions/createCustomJob";
// import { createJob } from "@/_actions/createJob";
import FileUpload from "@/components/common/fileUpload";
import FormError from "@/components/common/formError";
import FormSuccess from "@/components/common/formSuccess";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Command, CommandItem, CommandList } from "@/components/ui/command";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { CreateJobSchema } from "@/lib";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { CheckIcon } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const plots = [
  { value: "plot1", label: "Plot1" },
  { value: "plot2", label: "Plot2" },
  { value: "plot3", label: "Plot3" },
];

const types = [
  { value: "Residential", label: "Residential" },
  { value: "Commercial", label: "Commercial" },
];

const directions = [
  {
    value: "north",
    label: "North",
  },
  {
    value: "south",
    label: "South",
  },
  {
    value: "east",
    label: "East",
  },
  {
    value: "west",
    label: "West",
  },
  {
    value: "northwest",
    label: "NorthWest",
  },
  {
    value: "southwest",
    label: "SouthWest",
  },
  {
    value: "northeast",
    label: "NorthEast",
  },
  {
    value: "southeast",
    label: "SouthEast",
  },
];

const CreateJobPage = () => {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [open, setOpen] = React.useState(false);
  const [value] = React.useState("");
  const [pl, setPl] = useState("plot1");
  const [plotOpen, setPlotOpen] = useState(false);
  const [img, setImageUrl] = useState("");
  const [typeOpen, setTypeOpen] = useState(false);
  const form = useForm<z.infer<typeof CreateJobSchema>>({
    resolver: zodResolver(CreateJobSchema),
    defaultValues: {
      specifications: "",
      floors: 0,
      area: "",
      A: 0,
      B: 0,
      C: 0,
      D: 0,
      E: 0,
      D1: 0,
      D2: 0,
      D3: 0,
      D4: 0,
      direction: "north",
      expected: "",
      studentPrice: "",
      plot: "plot1",
      drawing: "",
      type: "Residential",
    },
  });

  const handleSubmit = async (e: {
    specifications: string;
    A: number;
    B: number;
    C: number;
    D: number;
    E: number;
    D1: number;
    D2: number;
    D3: number;
    D4: number;
    direction: string;
    floors: number;
    plot: string;
    type: string;
    expected: string;
    studentPrice: string;
    area: string;
  }) => {
    try {
      const job = await createCustomJob({ ...e, imageUrl: img });
      if (!job) {
        setError("Network Error");
      }
      if (job) {
        if (job === "Error") {
          setError(job);
        }
        if (job === "Network Error") {
          setError(job);
        }
        if (job === "success") {
          setSuccess("Job Created");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex justify-around">
      <Card>
        <CardHeader className="text-center">
          <CardTitle> Create Job</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleSubmit)}>
              <div className="grid w-full justify-center items-center gap-4">
                <FormField
                  control={form.control}
                  name="plot"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Plot type</FormLabel>
                      <FormControl>
                        <Popover open={plotOpen} onOpenChange={setPlotOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={plotOpen}
                              className="w-[200px] justify-between ml-3"
                            >
                              {field.value
                                ? plots.find(
                                    (plot) => plot.value === field.value
                                  )?.label
                                : "Enter Plot Type..."}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Command>
                              <CommandList>
                                {plots.map((plot) => (
                                  <CommandItem
                                    key={plot.value}
                                    onSelect={() => {
                                      field.onChange(plot.value);
                                      setPl(plot.value);
                                    }}
                                  >
                                    {plot.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        value === plot.value
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
                  control={form.control}
                  name="specifications"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Specifications</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter the details of the job"
                          className="hover:border-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="expected"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>What do you want the student to do</FormLabel>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Enter what do you want the student to do"
                          className="hover:border-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="studentPrice"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>{"Enter Student Price"}</FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the student price"
                          className="hover:border-slate-400"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="A"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Length (A) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the length of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="B"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Length (B) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the width of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="C"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Length (C) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the length of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="D"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Length (D) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the width of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="E"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Length (E) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the length of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="D1"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Diagonal (D1) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the diagonal of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="D2"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Diagonal (D2) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the diagonal of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="D3"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Diagonal (D3) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the diagonal of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="D4"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        {"Diagonal (D4) in feet, leave it blank if needed "}
                      </FormLabel>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Enter the diagonal of the plot"
                          type="number"
                          className="hover:border-slate-400"
                          onChange={(e) => {
                            const value = e.target.value
                              ? Number(e.target.value)
                              : 0;
                            field.onChange(value);
                          }}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="direction"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Direction</FormLabel>
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
                                ? directions.find(
                                    (direction) =>
                                      direction.value === field.value
                                  )?.label
                                : "Enter Direction..."}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Command>
                              <CommandList>
                                {directions.map((direction) => (
                                  <CommandItem
                                    key={direction.value}
                                    onSelect={() => {
                                      field.onChange(direction.value);
                                    }}
                                  >
                                    {direction.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        value === direction.value
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
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter Type of house</FormLabel>
                      <FormControl>
                        <Popover open={typeOpen} onOpenChange={setTypeOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={open}
                              className="w-[200px] justify-between ml-3"
                            >
                              {field.value
                                ? types.find(
                                    (type) => type.value === field.value
                                  )?.label
                                : "Enter Type..."}
                              <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent>
                            <Command>
                              <CommandList>
                                {types.map((type) => (
                                  <CommandItem
                                    key={type.value}
                                    onSelect={() => {
                                      field.onChange(type.value);
                                    }}
                                  >
                                    {type.label}
                                    <CheckIcon
                                      className={cn(
                                        "ml-auto h-4 w-4",
                                        value === type.value
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
                  control={form.control}
                  name="drawing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Upload Plot Reference Image</FormLabel>
                      <FormControl>
                        <FileUpload
                          endPoint="imageUploader"
                          onChange={field.onChange}
                          value={field.value}
                          setImageUrl={setImageUrl}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormSuccess message={success} />
                <FormError message={error} />
                <Button>Create Job</Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div>
        <Image alt="plot1" width={600} height={600} src={`/${pl}.png`} />
      </div>
    </div>
  );
};

export default CreateJobPage;
