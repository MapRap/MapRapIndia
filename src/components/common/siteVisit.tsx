import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { ChevronDownIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Input } from "../ui/input";

type Props = {
  user:
    | {
        id: string;
        email: string | null;
        name: string | null;
        password: string | null;
        otp: string | null;
        emailVerified: Date | null;
        otpExpiry: Date | null;
        type: string;
        Phone: string | null;
      }
    | undefined;
  currency: string;
  setMessage: React.Dispatch<React.SetStateAction<string>>;
};

const indianStatesAndUTs = [
  "Andhra Pradesh",
  "Arunachal Pradesh",
  "Assam",
  "Bihar",
  "Chhattisgarh",
  "Goa",
  "Gujarat",
  "Haryana",
  "Himachal Pradesh",
  "Jharkhand",
  "Karnataka",
  "Kerala",
  "Madhya Pradesh",
  "Maharashtra",
  "Manipur",
  "Meghalaya",
  "Mizoram",
  "Nagaland",
  "Odisha",
  "Punjab",
  "Rajasthan",
  "Sikkim",
  "Tamil Nadu",
  "Telangana",
  "Tripura",
  "Uttar Pradesh",
  "Uttarakhand",
  "West Bengal",
  "Andaman and Nicobar Islands",
  "Chandigarh",
  "Dadra and Nagar Haveli and Daman and Diu",
  "Delhi",
  "Jammu and Kashmir",
  "Ladakh",
  "Lakshadweep",
  "Puducherry",
];

const SiteVisitComp = ({}: Props) => {
  const [box, setBox] = useState(false);

  // const handleVisitPayment = ({ price }: { price: number }) => {
  //   try {
  //     //   if (user) {
  //     //     const response = await fetch("/api/payments/create-order", {
  //     //       method: "POST",
  //     //       headers: {
  //     //         "Content-Type": "application/json",
  //     //       },
  //     //       body: JSON.stringify({
  //     //         totalAmount: 100 * price,
  //     //         currency,
  //     //       }),
  //     //     });

  //     //     const order = await response.json();
  //     //     console.log(order);
  //     //     if (!order.id) {
  //     //       console.error("Failed to create order:", order);
  //     //       return;
  //     //     }

  //     //     const options = {
  //     //       key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
  //     //       amount: order.amount,
  //     //       currency: order.currency,
  //     //       name: "Make My Naksha",
  //     //       description: `Premium Payment`,
  //     //       order_id: order.id,
  //     //       handler: async (response: RazorpayPaymentResponse) => {
  //     //         // Verify payment
  //     //         const payment_id = response.razorpay_payment_id;
  //     //         const verificationResponse = await fetch(
  //     //           "/api/payments/payment-verification",
  //     //           {
  //     //             method: "POST",
  //     //             headers: { "Content-Type": "application/json" },
  //     //             body: JSON.stringify({
  //     //               razorpay_order_id: response.razorpay_order_id,
  //     //               razorpay_payment_id: response.razorpay_payment_id,
  //     //               razorpay_signature: response.razorpay_signature,
  //     //             }),
  //     //           }
  //     //         );

  //     //         const verificationResult = await verificationResponse.json();
  //     //         console.log(verificationResult);

  //     //         if (verificationResult.success) {
  //     //           alert(`Payment successful!`);
  //     //           const visit = await createSiteVisit({
  //     //             userId: user.id,
  //     //             gmail: user.email!,
  //     //           });
  //     //           if (visit === "Success") {
  //     //             setMessage(
  //     //               `Our team will contact you soon for further details `
  //     //             );

  //     //             fetch("/api/payments/receipt", {
  //     //               method: "POST",
  //     //               headers: {
  //     //                 "Content-Type": "application/json",
  //     //               },
  //     //               body: JSON.stringify({
  //     //                 payment_id: `${payment_id}`,
  //     //               }),
  //     //             }).then((rece) => {
  //     //               if (rece.ok) {
  //     //                 rece.blob().then((blob) => {
  //     //                   const file = new File(
  //     //                     [blob],
  //     //                     `receipt${user.email}1.pdf`,
  //     //                     {
  //     //                       type: "application/pdf",
  //     //                     }
  //     //                   );
  //     //                   try {
  //     //                     startUpload([file]).then((uploadedFiles) => {
  //     //                       if (uploadedFiles && uploadedFiles[0]) {
  //     //                         console.log(
  //     //                           "File uploaded successfully:",
  //     //                           uploadedFiles[0].url
  //     //                         );
  //     //                         setReceipt(`${uploadedFiles[0].url}`);
  //     //                       } else {
  //     //                         console.error("File upload failed");
  //     //                       }
  //     //                     });
  //     //                   } catch (error) {
  //     //                     console.error("Error uploading file:", error);
  //     //                   }
  //     //                 });
  //     //               }
  //     //             });
  //     //           }
  //     //         } else {
  //     //           alert("Payment verification failed!");
  //     //         }
  //     //       },
  //     //       prefill: {
  //     //         name: user.name!,
  //     //         email: `${user.email}`,
  //     //       },
  //     //       theme: {
  //     //         color: "#3399cc",
  //     //       },
  //     //     };

  //     //     const razorpay = new window.Razorpay(options);
  //     //     razorpay.open();
  //     //     return { success: "Payment started" };
  //     //   }
  //     if (!user) {
  //       console.log("hey");

  //       setMessage("Please Login to continue!");
  //     }
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //     return { error: error };
  //   } finally {
  //   }
  // };
  const [tex, setTex] = useState("Please wait...");
  const showLoader = async () => {
    setTimeout(() => {
      setTex("Sorry Site Visit not available in your area");
    }, 2000);
  };

  return (
    <div>
      <Popover>
        <PopoverTrigger
          asChild
          className="flex items-center justify-center p-0 cursor-pointer"
        >
          <div className="text-black hover:underline hover:text-gray-500 px-2 py-2 text-base md:text-base rounded-xla">
            <ChevronDownIcon />
            Want a site visit
          </div>
        </PopoverTrigger>
        <PopoverContent className="flex flex-col p-0 mt-4">
          <Command className="rounded-lg border shadow-md ">
            <CommandInput placeholder="Type a command or search..." />
            <CommandList>
              <CommandEmpty>No results found.</CommandEmpty>
              <CommandGroup heading="Select location">
                {indianStatesAndUTs.map((state) => (
                  <CommandItem key={state}>
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-gray-50 w-full text-start hover:bg-gray-100">
                        {state}
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <Input
                            placeholder="Enter your pincode"
                            onChange={(e) => {
                              if (e.currentTarget.value !== "") {
                                setBox(true);
                                showLoader();
                              } else {
                                setBox(false);
                                setTex("Please wait...");
                              }
                            }}
                          />
                          {box && (
                            <div>
                              <div className="w-full flex items-end justify-end">
                                <div
                                  className="w-fit px-2 cursor-pointer hover:bg-gray-100 rounded-xl h-fit "
                                  onClick={() => {
                                    setBox(false);
                                  }}
                                >
                                  x
                                </div>
                              </div>
                              <div className="text-xs text-gray-500">{tex}</div>
                            </div>
                          )}
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default SiteVisitComp;
