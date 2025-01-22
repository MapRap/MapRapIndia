"use client";
import Foot from "@/components/common/foot";
// import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
import Spline from "@splinetool/react-spline";
import SignTri from "@/components/auth/signClientTrigger";
import { Button } from "@/components/ui/button";
import CardHolder from "@/components/common/CardHolder";
import Slide from "@/components/common/slide";
import { Loading } from "@/components/common/Loading";
// import { createAdmin } from "@/_actions/createAdmin";
import { getId } from "@/_actions/getId";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { clearUserSession } from "@/_actions/logout";
// import PricingCard from "@/components/common/pricingCard";
// import { getClientJobsWithSteps } from "@/_actions/bs";
import { Loading2 } from "@/components/common/loader2";
// import { useUploadThing } from "@/lib/uploadthing";
import { RazorpayPaymentResponse } from "@/components/common/trapPlot";
// import { createSiteVisit } from "@/_actions/createSiteVisit";
// import { getRealUsers } from "@/_actions/getRealUsers";

declare global {
  interface Window {
    Razorpay: new (options: RazorpayOptions) => RazorpayInstance;
  }
}

interface RazorpayOptions {
  key: string;
  amount: number;
  currency: string;
  name?: string;
  description?: string;
  order_id: string;
  prefill?: {
    name?: string;
    email?: string;
    contact?: string;
  };
  theme?: {
    color?: string;
  };
  handler?: (response: RazorpayPaymentResponse) => void;
}

interface RazorpayInstance {
  open: () => void;
}

export default function Home() {
  // const cont = {};
  // const [receipt, setReceipt] = useState("");
  const [user, setUser] = useState<
    | {
        id: string;
        gmail: string;
        name: string;
        password: string;
        otp: string | null;
        isVerified: boolean | null;
        otpExpiry: Date;
        type: string;
        Phone: string;
      }
    | undefined
  >();
  // const [job, setJob] = useState<{
  //   id: string;
  //   type: string;
  //   direction: string;
  //   floors: number;
  //   price: number;
  //   plot: string;
  //   specifications: string | null;
  //   imageUrl: string;
  //   A: number;
  //   B: number;
  //   C: number;
  //   D: number;
  //   E: number | null;
  //   D1: number | null;
  //   D3: number | null;
  //   D4: number | null;
  //   D2: number | null;
  //   givenBy: string;
  //   isVerified: boolean | null;
  //   assignedTo: string | null;
  //   completed: boolean;
  //   publishable: boolean;
  //   name: string;
  //   phone: string;
  //   interior: string;
  // }>();
  const [loading, setLoading] = useState(true);
  // const [currency] = useState("INR");
  // const [message, setMessage] = useState("");
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  // const section3Ref = useRef<HTMLDivElement>(null);
  // const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);
  const [tim, setTim] = useState<boolean>(false);
  // const { startUpload } = useUploadThing("pdfUploader");
  useEffect(() => {
    setTimeout(() => {
      setTim(true);
    }, 1000);
    getId().then((e) => {
      if (e) {
        setLoading(false);
        if (e !== "/unauthorized") {
          setUser(e);
          // getClientJobsWithSteps().then((j) => {
          //   if (j) {
          //     if (typeof j !== "string") {
          //       setJob(j);
          //     }
          //   }
          // });
        }
      }
    });
  }, []);
  const scrollToSection1 = () => {
    section1Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSection2 = () => {
    section2Ref.current?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToSection5 = () => {
    section5Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  const scrollToSection6 = () => {
    section6Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  // const handlePayment = async ({ price }: { price: number }) => {
  //   try {
  //     if (user) {
  //       // })
  //       // if (job) {
  //       // let area: string | undefined;
  //       // if (
  //       //   (job?.type === "Commercial" && type === "Commercial Premium") ||
  //       //   (job?.type === "Residential" && type === "Residential Premium")
  //       // ) {
  //       // if (job.area !== "") {
  //       // for (const key in areaList) {
  //       //   if (key === job.area) {
  //       //     area = `${areaList[key as keyof typeof areaList]}`;
  //       //   }
  //       // }
  //       // if (area) {
  //       // const newArea = Number(area);
  //       // if (newArea !== 0) {
  //       // console.log();
  //       // const totalPrice = price * newArea;
  //       // console.log("Area", totalPrice);
  //       const response = await fetch("/api/payments/create-order", {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({
  //           totalAmount: 100 * price,
  //           currency,
  //         }),
  //       });

  //       const order = await response.json();
  //       console.log(order);
  //       if (!order.id) {
  //         console.error("Failed to create order:", order);
  //         return;
  //       }

  //       // Razorpay options
  //       const options = {
  //         key: process.env.NEXT_PUBLIC_RAZORPAY_ID as string,
  //         amount: order.amount,
  //         currency: order.currency,
  //         name: "Make My Naksha",
  //         description: `Premium Payment`,
  //         order_id: order.id,
  //         handler: async (response: RazorpayPaymentResponse) => {
  //           // Verify payment
  //           const payment_id = response.razorpay_payment_id;
  //           const verificationResponse = await fetch(
  //             "/api/payments/payment-verification",
  //             {
  //               method: "POST",
  //               headers: { "Content-Type": "application/json" },
  //               body: JSON.stringify({
  //                 razorpay_order_id: response.razorpay_order_id,
  //                 razorpay_payment_id: response.razorpay_payment_id,
  //                 razorpay_signature: response.razorpay_signature,
  //               }),
  //             }
  //           );

  //           const verificationResult = await verificationResponse.json();
  //           console.log(verificationResult);

  //           if (verificationResult.success) {
  //             alert(`Payment successful!`);
  //             const visit = await createSiteVisit({
  //               userId: user.id,
  //               phone: user.Phone,
  //               gmail: user.gmail,
  //             });
  //             if (visit === "Success") {
  //               setMessage(
  //                 `Our team will contact you soon for further details `
  //               );
  //               // const changePlan = await changeExteriorPlan({
  //               //   id: job.id,
  //               // });

  //               // setReceipts((prev) => [...prev, order.receipt]); // Add receipt to the list
  //               // setCurrentStep((prevStep) => prevStep + 1); // Move to next step
  //               // createJob({
  //               //   ...e,
  //               //   plot: "plot2",
  //               //   imageUrl: imageUrl,
  //               //   price: price,
  //               //   type: type,
  //               //   direction: direction,
  //               // }).then((res) => {
  //               // if (res) {
  //               // if (res === "user not approved") {
  //               // }
  //               // else if (res?.success && res?.job) {
  //               // createStep({
  //               //   jobId: res.job?.id,
  //               //   type: "full",
  //               //   step: 1,
  //               // }).then((e) => {
  //               // if (e) {
  //               // if (e !== "Network error") {
  //               // if (e !== "No such job exists") {
  //               fetch("/api/payments/receipt", {
  //                 method: "POST",
  //                 headers: {
  //                   "Content-Type": "application/json",
  //                 },
  //                 body: JSON.stringify({
  //                   payment_id: `${payment_id}`,
  //                 }),
  //               }).then((rece) => {
  //                 if (rece.ok) {
  //                   rece.blob().then((blob) => {
  //                     // Create a temporary download link for the Blob
  //                     const file = new File(
  //                       [blob],
  //                       `receipt${user.gmail}1.pdf`,
  //                       {
  //                         type: "application/pdf",
  //                       }
  //                     );
  //                     try {
  //                       startUpload([file]).then((uploadedFiles) => {
  //                         if (uploadedFiles && uploadedFiles[0]) {
  //                           console.log(
  //                             "File uploaded successfully:",
  //                             uploadedFiles[0].url
  //                           );
  //                           setReceipt(`${uploadedFiles[0].url}`);
  //                           //   router.push(
  //                           //     `${window.location.pathname}/success?receipt=${uploadedFiles[0].url}`
  //                           //   );
  //                         } else {
  //                           console.error("File upload failed");
  //                         }
  //                       });
  //                     } catch (error) {
  //                       console.error("Error uploading file:", error);
  //                     }
  //                   });
  //                 }
  //               });
  //               // }
  //               //  else {
  //               //   console.log("GG");
  //               // }
  //               // }
  //               // }
  //               // });
  //               // }
  //               // else if (res?.error) {
  //               //   router.push(`${window.location.pathname}/error`);
  //               // }
  //               // }
  //               // });
  //             }
  //           } else {
  //             alert("Payment verification failed!");
  //           }
  //         },
  //         prefill: {
  //           name: user.name,
  //           email: `${user.gmail}`,
  //           contact: user.Phone,
  //         },
  //         theme: {
  //           color: "#3399cc",
  //         },
  //       };

  //       const razorpay = new window.Razorpay(options);
  //       razorpay.open();
  //       return { success: "Payment started" };
  //       // }
  //       // }
  //       // }
  //       // } else {
  //       //   setMessage(
  //       //     `You have selected a ${job.type} Building, please select ${job.type} Premium`
  //       //   );
  //       // }
  //       // }
  //       // if (!job) {
  //       //   setMessage("Please first assign a job");
  //       // }
  //     }
  //     if (!user) {
  //       console.log("hey");

  //       setMessage("Please Login to continue!");
  //     }
  //   } catch (error) {
  //     console.error("Error initiating payment:", error);
  //     return { error: error };
  //   } finally {
  //     // setIsProcessing(false);
  //   }
  // };

  return loading ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div className="m-0 p-0">
      {/* <div className="absolute z-[-10]">
        <img src="../yel4.webp" alt="" className="h-[400vh]" />
      </div> */}
      <section className="top-0 left-0 z-[1000] shadow-[#c7c3c3] shadow-md sticky bg-[url(https://utfs.io/f/GH57qH88dIR103p7T3PFZxh3y25JpRuUtmg0Yn4HXWMl8IrG)]">
        <section className=" mt-0 flex flex-wrap justify-between items-center z-100 w-[90vw] p-2">
          <div className="">
            <img
              src={`../logo.png`}
              alt="logo"
              width={80}
              className="rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex flex-wrap w-[60vw] z-40 md:gap-10 justify-between text-white">
            {/* <div className="text-md hover:underline cursor-pointer p-0 m-0 flex justify-center items-center">
              <div>
                <Popover>
                  <PopoverTrigger
                    asChild
                    className="flex items-center justify-center p-0"
                  >
                    <div className="bg-[#273392] text-white hover:underline hover:text-orange-500 px-2 py-2 text-xs md:text-base rounded-xl">
                      <ChevronDownIcon />
                      Want a site visit
                    </div>
                  </PopoverTrigger>
                  <PopoverContent className="flex flex-col p-0 mt-4">
              
                    <DropdownMenu>
                      <DropdownMenuTrigger className="bg-gray-50 hover:bg-gray-100">
                        Trikuta Nagar-Jammu
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuGroup>
                          <DropdownMenuItem
                            className="cursor-pointer border-b"
                            onClick={() => {
                              handlePayment({ price: 2000 });
                            }}
                          >
                            Upto 5 km : Rs 1200
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            className="cursor-pointer border-b"
                            onClick={() => {
                              handlePayment({ price: 2500 });
                            }}
                          >
                            Upto 10 km : Rs 1800
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                    </PopoverContent>
                </Popover>
              </div>
            </div> */}
            <button
              className="md:text-base bg-[#273392] text-white hover:text-orange-500 text-xs hover:underline cursor-pointer p-2 m-2 px-2 py-0 rounded-xl"
              onClick={() => {
                scrollToSection2();
              }}
            >
              Contact us
            </button>

            <button
              className="p-2 m-2 text-xs md:text-base hover:underline hover:text-orange-500 cursor-pointer bg-[#273392] text-white px-2 py-1 rounded-xl"
              onClick={() => {
                scrollToSection6();
              }}
            >
              Past Projects
            </button>
            <button
              className="p-2 m-2 text-xs md:text-base hover:underline hover:text-orange-500 cursor-pointer bg-[#273392] text-white px-2 py-1 rounded-xl"
              onClick={() => {
                window.location.replace("/plans");
              }}
            >
              Interior
            </button>
            <button
              className="p-2 m-2 text-xs md:text-base hover:underline hover:text-orange-500 cursor-pointer bg-[#273392] text-white px-2 py-1 rounded-xl"
              onClick={() => {
                window.location.replace("/jobs");
              }}
            >
              Jobs
            </button>
            {user ? (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xl bg-purple-700 text-white hover:cursor-pointer">
                      {user.name[0]}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-4">
                    <DropdownMenuLabel>{user.name}</DropdownMenuLabel>

                    {user.type === "admin" && (
                      <DropdownMenuLabel className="font-normal">
                        Admin Account
                      </DropdownMenuLabel>
                    )}
                    {user.type === "student" && (
                      <DropdownMenuLabel className="font-normal">
                        Student Account
                      </DropdownMenuLabel>
                    )}
                    {user.type === "customer" && (
                      <DropdownMenuLabel className="font-normal">
                        Client Account
                      </DropdownMenuLabel>
                    )}
                    {user.type === "professional" && (
                      <DropdownMenuLabel className="font-normal">
                        Professional Account
                      </DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {user.type === "customer" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/projects");
                          }}
                          className="cursor-pointer"
                        >
                          My Projects
                        </DropdownMenuItem>
                      )}
                      {user.type === "student" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/assigned");
                          }}
                          className="cursor-pointer"
                        >
                          My Workshop
                        </DropdownMenuItem>
                      )}
                      {user.type === "student" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/assigned");
                          }}
                          className="cursor-pointer"
                        >
                          My Workshop
                        </DropdownMenuItem>
                      )}
                      {user.type === "admin" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/admin");
                          }}
                          className="cursor-pointer"
                        >
                          Admin Page
                        </DropdownMenuItem>
                      )}
                      {user.type === "owner" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/admin");
                          }}
                          className="cursor-pointer"
                        >
                          Admin Page
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem
                        className="text-red-600 cursor-pointer"
                        onClick={() => {
                          clearUserSession().then((e) => {
                            if (e) {
                              if (e === "success") {
                                window.location.reload();
                              }
                            }
                          });
                        }}
                      >
                        Logout
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <button
                className="p-2 m-2 md:text-base hover:text-orange-500 text-xs hover:underline cursor-pointer bg-[#273392] text-white px-2 py-0 rounded-xl"
                onClick={() => {
                  scrollToSection1();
                }}
              >
                Login
              </button>
            )}
          </div>
        </section>
      </section>
      {/* <div className="flex justify-center text-center text-green-600 bg-green-300">
        {message}{" "}
        {receipt !== "" && (
          <a
            href={`${receipt}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline flex text-black font-bold"
          >
            Receipt
          </a>
        )}
      </div> */}
      <div className="items-center justify-center lg:m-24 lg:mx-16 ">
        <div className="spl relative lg:w-full hidden lg:h-[10vh] lg:flex top-[-10vh]">
          <div className="absolute w-[50vw] h-[100vh] top-0">
            {tim ? (
              <Spline
                scene="https://prod.spline.design/uxt2HKImyLJhYBYU/scene.splinecode"
                className="w-full h-full object-contain scale-90"
              />
            ) : (
              <Loading />
            )}
          </div>
        </div>
        <div className="visit flex flex-col w-screen lg:absolute z-10 lg:top-56 lg:w-[30vw] lg:h-[60vh] lg:right-44">
          <h1 className="text-xl md:text-3xl xl:h-[5vw] font-bold lg:h-[10vw] my-8 lg:w-[40vw] w-full text-center text-black">
            Designing spaces that inspire, nurture, and elevate your lifestyle.
          </h1>
          <div className="text-gray-500 text-sm md:text-2xl font-light text-center lg:w-[40vw]">
            Let MyNaksha bring your home ideas to life with exceptional design.
          </div>
          <div className="flex items-center justify-center lg:w-[40vw]">
            <Button
              className="text-md border rounded-lg text-white font-medium hover:bg-blue-800 p-4 cursor-pointer m-gap-10a text-center bg-[#273392]"
              onClick={() => {
                scrollToSection5();
              }}
            >
              Get Started
            </Button>
            {/* <Button
              className="text-md border rounded-lg text-white font-medium p-4 cursor-pointer m-gap-10a text-center bg-[#273392]"
              onClick={() => {
                createAdmin();
              }}
            >
              Crete Admin
            </Button> */}
          </div>
        </div>
      </div>
      <div
        className="flex gap-36 md:m-20 items-center justify-center mx-16 lg:mt-[40vw]"
        ref={section6Ref}
      >
        <div>
          <div className="scrollAniRight">
            <Slide />
          </div>
          <h1 className="scrollAniLeft text-lg lg:text-5xl font-bold w-[80vw] text-center md:ml-24 mt-5">
            Our Past Projects Showcase Our Expertise and Commitment to
            Excellence.
          </h1>
        </div>
      </div>
      <section ref={section5Ref} className="">
        <CardHolder />
      </section>
      <section>
        <div
          className="flex-wrap flex gap-10 lg:gap-32 w-[95vw] items-center justify-center mt-10"
          ref={section1Ref}
        >
          <div className="scrollAniLeft lg:w-[45vw]">
            <h1 className="text-2xl lg:text-4xl font-bold w-full text-center">
              Streamlined Project Planning from the Comfort of Your Home
            </h1>
            <div className="text-gray-600 px-20 lg:px-0 text-lg lg:text-2xl font-light text-center">
              Easily provide your land{"'"}s dimensions and specs from home.
              Just share your details online, and our experts will handle the
              rest!
            </div>
            {/* </div> */}
            <div className="text-center m-4">{!user && <SignTri />}</div>
          </div>
          <div className="flex items-center w-[50vw] lg:w-[25vw] justify-center">
            <img
              src="../img-2.png"
              alt="bg"
              className="scrollAniRight w-full rounded-xl"
            />
          </div>
        </div>
        <div className="w-[95vw] flex flex-wrap-reverse gap-10 lg:gap-36 items-center justify-center lg:mt-20">
          <div className="flex justify-center lg:m-4 w-[50vw] lg:w-[30vw]">
            <img
              src="../img1.webp"
              alt="bg"
              className="scrollAniLeft lg:w-full m-2 md:m-0 rounded-xl"
            />
          </div>
          <div className="scrollAniRight lg:w-[50vw]">
            <h1 className=" text-2xl lg:text-4xl font-bold w-full text-center">
              Empowering the Next Generation of Architects.
            </h1>
            <div className="text-gray-600 px-20 lg:px-0 text-lg lg:text-2xl font-light mt-2 text-center">
              At MyNaksha, we help college students gain practical skills and
              real-world experience through hands-on projects, preparing them
              for successful careers in the industry.
            </div>
          </div>
        </div>
        <div className=" w-[95vw] flex flex-wrap gap-10 lg:gap-36 items-center justify-center lg:mt-20 mt-8">
          <div className="scrollAniRight lg:w-[50vw]">
            <h1 className="text-2xl lg:text-4xl font-bold w-full text-center">
              Easier Client Engagement, Anytime, Anywhere
            </h1>
            <div className="text-gray-600 text-lg mt-2 px-20 lg:px-0 lg:text-2xl font-light text-center">
              Online clients enable efficient project management. Just share
              your location and details, and our experts will handle the rest—no
              site visits needed!
            </div>
          </div>
          <img
            src="../img4.webp"
            alt="bg"
            className="scrollAniLeft w-1/3 rounded-xl"
          />
        </div>
      </section>
      <section className="">
        <div ref={section2Ref} className="bg-slate-200 p-4">
          <Foot />
        </div>
      </section>
    </div>
  );
}
