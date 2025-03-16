"use client";
import Foot from "@/components/common/foot";
// import { ChevronDownIcon } from "@radix-ui/react-icons";
import { useEffect, useRef, useState } from "react";

import Spline from "@splinetool/react-spline";
// import SignTri from "@/components/auth/signClientTrigger";
import { Button } from "@/components/ui/button";
import CardHolder from "@/components/common/CardHolder";
// import Slide from "@/components/common/slide";
import { Loading } from "@/components/common/Loading";
// import { createAdmin } from "@/_actions/createAdmin";
// import { getId } from "@/_actions/getId";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Loading2 } from "@/components/common/loader2";
// import { useUploadThing } from "@/lib/uploadthing";
import { RazorpayPaymentResponse } from "@/components/common/trapPlot";
// import { signOut } from "@/auth";
import LogOutButton from "@/components/auth/logOutButton";
// import { auth } from "@/auth";
import { useSession } from "next-auth/react";
import { HamburgerMenuIcon, LightningBoltIcon } from "@radix-ui/react-icons";
import HamburgerContent from "@/components/common/hamburgerContent";
import { FcCheckmark } from "react-icons/fc";
import {
  Building,
  DollarSign,
  Handshake,
  HomeIcon,
  ThumbsUp,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import Image from "next/image";
import Slide from "@/components/common/slide2";
import Slide2 from "@/components/common/slide";
import AnimatedNumberSection from "@/components/common/countNum";
import QueryForm from "@/components/common/queryForm";
import TestSiteVisitComp from "@/components/common/textComp";
import { createOwner } from "@/_actions/createOwner";
// import { createOwner } from "@/_actions/createOwner";

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
  const session = useSession();

  const [loading, setLoading] = useState(true);
  const [menu, setMenu] = useState(false);
  const section1Ref = useRef<HTMLDivElement>(null);
  const section2Ref = useRef<HTMLDivElement>(null);
  // const section3Ref = useRef<HTMLDivElement>(null);
  // const section4Ref = useRef<HTMLDivElement>(null);
  const section5Ref = useRef<HTMLDivElement>(null);
  const section6Ref = useRef<HTMLDivElement>(null);
  const [tim, setTim] = useState<boolean>(false);
  console.log(menu);
  // const [p, setP] = useState(1);
  // const [c, setC] = useState(1);
  // const { startUpload } = useUploadThing("pdfUploader");
  useEffect(() => {
    setTimeout(() => {
      setTim(true);
    }, 1000);
    // for (let i = 0; i < 1501; i++) {
    //   setTimeout(() => {
    //     setP(i);
    //   }, 300);
    // }
    // for (let i = 0; i < 201; i++) {
    //   setTimeout(() => {
    //     setC(i);
    //   }, 1000);
    // }
    if (session) {
      setLoading(false);
    }
    //   getId().then((e) => {
    //     if (e) {
    //       setLoading(false);
    //       if (e !== "/unauthorized") {
    //         setUser(e);
    //         // getClientJobsWithSteps().then((j) => {
    //         //   if (j) {
    //         //     if (typeof j !== "string") {
    //         //       setJob(j);
    //         //     }
    //         //   }
    //         // });
    //       }
    //     }
    //   });
  }, []);
  const scrollToSection1 = () => {
    section1Ref.current?.scrollIntoView({ behavior: "smooth" });
  };
  // const scrollToSection2 = () => {
  //   section2Ref.current?.scrollIntoView({ behavior: "smooth" });
  // };

  // const scrollToSection5 = () => {
  //   section5Ref.current?.scrollIntoView({ behavior: "smooth" });
  // };
  // const scrollToSection6 = () => {
  //   section6Ref.current?.scrollIntoView({ behavior: "smooth" });
  // };

  return loading ? (
    <div className="h-screen w-screen flex items-center justify-center">
      <Loading2 loading={loading} />
    </div>
  ) : (
    <div className="m-0 p-0">
      <section className="top-0 left-0 w-full z-[1000] shadow-[#c7c3c3] shadow-md sticky bg-[url(https://utfs.io/f/GH57qH88dIR103p7T3PFZxh3y25JpRuUtmg0Yn4HXWMl8IrG)]">
        <section className="flex mt-0 flex-wrap justify-between items-center z-100 w-[90vw] p-2">
          <div className="">
            <img
              src={`../logo.png`}
              alt="logo"
              width={80}
              className="rounded-lg cursor-pointer"
            />
          </div>
          <div className="flex w-[60vw] z-40 md:gap-10 justify-end items-center text-white">
            {/* <button
              className="p-2 m-2 flex-1 text-[10px] md:text-base hover:underline hover:text-orange-500 md:w-min cursor-pointer bg-[#273392] text-white px-2 w-[20vw] py-3 md:py-1 rounded-md md:rounded-xl"
              onClick={() => {
                window.location.replace("/jobs");
              }}
            >
              Jobs
            </button> */}
            <button
              className="p-2 m-2 hover:underline hover:text-orange-500 lg:w-fit cursor-pointer bg-[#273392] text-white px-2 w-min py-3 md:py-1 rounded-md md:rounded-xl opacity-100"
              onClick={() => {
                setMenu(!menu);
                // scrollToSection6();
              }}
            >
              <HamburgerMenuIcon className="w-5 h-3 md:w-10 md:h-7" />
            </button>
            <button
              className="p-2 m-2 hover:underline hover:text-orange-500 lg:w-fit cursor-pointer bg-[#273392] text-white px-2 w-min py-3 md:py-1 rounded-md md:rounded-xl opacity-100"
              onClick={() => {
                // setMenu(!menu);
                // scrollToSection6();
              }}
            >
              <TestSiteVisitComp />
            </button>
            {!session.data?.user && (
              <button
                className="md:text-base w-min bg-[#273392] text-white hover:text-orange-500 text-[10px] hover:underline cursor-pointer p-4 m-2 px-2 py-1 rounded- md:rounded-xl"
                onClick={() => {
                  window.location.replace("/auth/login");
                }}
              >
                Login
              </button>
            )}

            {session.data?.user && session.data?.user.name && (
              <div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <div className="h-10 w-10 rounded-full flex items-center justify-center text-xl bg-purple-700 text-white hover:cursor-pointer">
                      {session.data.user.name[0]}
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-4">
                    <DropdownMenuLabel>
                      {session.data.user.name}
                    </DropdownMenuLabel>

                    {session.data.user.type === "admin" && (
                      <DropdownMenuLabel className="font-normal">
                        Admin Account
                      </DropdownMenuLabel>
                    )}
                    {session.data.user.type === "student" && (
                      <DropdownMenuLabel className="font-normal">
                        Student Account
                      </DropdownMenuLabel>
                    )}
                    {session.data.user.type === "customer" && (
                      <DropdownMenuLabel className="font-normal">
                        Client Account
                      </DropdownMenuLabel>
                    )}
                    {session.data.user.type === "professional" && (
                      <DropdownMenuLabel className="font-normal">
                        Professional Account
                      </DropdownMenuLabel>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuGroup>
                      {session.data.user.type === "customer" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/projects");
                          }}
                          className="cursor-pointer"
                        >
                          My Projects
                        </DropdownMenuItem>
                      )}
                      {session.data.user.type === "student" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/assigned");
                          }}
                          className="cursor-pointer"
                        >
                          My Workshop
                        </DropdownMenuItem>
                      )}
                      {session.data.user.type === "professional" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/assigned");
                          }}
                          className="cursor-pointer"
                        >
                          My Workshop
                        </DropdownMenuItem>
                      )}
                      {session.data.user.type === "admin" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/admin");
                          }}
                          className="cursor-pointer"
                        >
                          Admin Page
                        </DropdownMenuItem>
                      )}
                      {session.data.user.type === "owner" && (
                        <DropdownMenuItem
                          onClick={() => {
                            window.location.replace("/admin");
                          }}
                          className="cursor-pointer"
                        >
                          Admin Page
                        </DropdownMenuItem>
                      )}

                      <DropdownMenuItem className="text-red-600 cursor-pointer">
                        <LogOutButton />
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>
        </section>
      </section>
      <div ref={section6Ref} className="sticky z-[1000] w-full top-20 right-0">
        {menu && <HamburgerContent scrollToSection1={scrollToSection1} />}
      </div>

      <div className="flex flex-col justify-center items-center xl:block lg:m-24 lg:mx-16 ">
        <div className="flex w-fit items-center justify-center xl:hidden h-fit top-20">
          <video autoPlay loop muted className="">
            <source src="../item.mp4" type="video/mp4" className=""></source>
          </video>
        </div>
        <div className="relative lg:h-[6vh] lg:w-full xl:w-full hidden xl:h-[10vh] lg:top-[-30vh] xl:top-[-10vh] xl:flex top-[-10vh]">
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

        <div className="visit flex flex-col w-[90vw] xl:absolute z-10 lg:top-56 xl:w-[30vw] xl:h-[60vh] lg:right-44">
          <h1 className="text-xl md:text-3xl  xl:h-[5vw] lg:w-[90vw] font-semibold my-8 xl:w-[40vw] w-full text-center text-black">
            Get your house map
            <strong className="font-extrabold underline text-4xl">
              {" "}
              online{" "}
            </strong>
            within 5 days
          </h1>
          <div className="md:mb-4 text-gray-500 text-sm md:text-2xl font-light text-center xl:w-[40vw]">
            No need to visit an architect{`'`}s office—get your house map
            designed online, quickly and conveniently
          </div>
          <div className="flex items-center justify-center xl:w-[40vw]">
            <Button
              className="text-md border rounded-lg text-white font-medium hover:bg-blue-800 p-4 cursor-pointer m-gap-10a text-center bg-[#273392]"
              onClick={() => {
                window.location.replace("/list");
              }}
            >
              Get Started
            </Button>
            <Button
              className="text-md border rounded-lg text-white font-medium hover:bg-blue-800 p-4 cursor-pointer m-gap-10a text-center bg-[#273392]"
              onClick={() => {
                createOwner();
              }}
            >
              Create owner
            </Button>
          </div>
        </div>
      </div>
      <div className="lg:h-fit p-4 font-medium lg:p-8 bg-[url('/bgImg1.png')] bg-fade flex mb-36 vs:mb-32 md:mt-48 lg:mb-20 gap-10 flex-col lg:flex-row mt-32 w-full txl:mt-[70vh] text-slate-800 text-xl md:my-20 md:mb-32 items-center justify-center lg:mt-[10vw] xl:mt-[40vw]">
        <div className="w-[80vw] lg:w-[25vw] flex items-center bg-white text-black border-gray-200 border-2 rounded-xl justify-center lg:h-[40vh] xl:h-[35vh]">
          <div className="flex flex-col items-center text-center w-[70vw] lg:w-[20vw]">
            <div className="bg-green-600">
              <DollarSign />
            </div>
            Get top-quality architectural services online at 70% less cost
          </div>
        </div>
        <div className="p-4 w-[80vw] lg:w-[25vw] flex items-center bg-white text-black border-gray-200 border-2 rounded-xl justify-center lg:h-[40vh] xl:h-[35vh]">
          <div className="flex flex-col items-center text-center w-[70vw] lg:w-[20vw]">
            <div className="bg-yellow-200">
              <FcCheckmark />
            </div>
            <div className="text-center w-[70vw] lg:w-[20vw]">
              Service delivered within 5 to 10 days{" "}
            </div>
          </div>
        </div>
        <div className=" w-[80vw] lg:w-[25vw] flex items-center bg-white text-black border-gray-200 border-2 rounded-xl justify-center lg:h-[40vh] xl:h-[35vh]">
          <div className="p-4 flex flex-col items-center text-center w-[70vw] lg:w-[20vw]">
            <div className="bg-green-600">
              <LightningBoltIcon width={30} height={25} />
            </div>
            2 revisions included
          </div>
        </div>
      </div>

      <div className="text-center text-3xl my-3 font-semibold">
        3 Step Success Journey
      </div>
      <div className="flex flex-col lg:flex-row p-8 bg-[url('/bgImg2.png')] bg-fade w-full items-center justify-center gap-20">
        <Card className="w-3/4 lg:w-1/4">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <div className="mb-2 bg-[#2090a0] rounded-full text-white w-min p-4 px-5">
                1
              </div>
              Registration
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">2-min form filling</CardContent>
        </Card>
        <Card className="w-3/4 lg:w-1/4">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <div className="mb-2 bg-[#2090a0] rounded-full text-white w-min p-4 px-5">
                2
              </div>
              Devlopment
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            Your House Map build in 5 to 10 days
          </CardContent>
        </Card>
        <Card className="w-3/4 lg:w-1/4">
          <CardHeader>
            <CardTitle className="flex flex-col items-center">
              <div className="mb-2 bg-[#2090a0] rounded-full text-white w-min p-4 px-5">
                3
              </div>
              Conclude
            </CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            Get your Plan in pdf form
          </CardContent>
        </Card>
      </div>
      <section ref={section5Ref} className="">
        <CardHolder />
      </section>
      <div className="flex flex-col items-center">
        <h1
          className="scrollAniLeft text-lg lg:text-5xl font-bold w-[80vw] text-center md:ml-24 mt-5"
          ref={section1Ref}
        >
          Our Past Projects Showcase Our Expertise and Commitment to Excellence.
        </h1>
        <div className="w-full">
          <Slide />
        </div>
      </div>
      <section className="flex items-center flex-col">
        <div className="flex-wrap bg-gray-50 shadow-xl p-2 md:p-0 rounded-lg md:border-none flex gap-10 lg:gap-32 w-[95vw] items-center justify-center mt-10">
          <div className="scrollAniLeft lg:w-[45vw] text-center">
            <h1 className="text-2xl lg:text-4xl font-bold w-full text-center">
              Streamlined Project Planning from the Comfort of Your Home
            </h1>
            <div className="text-gray-600 px-20 lg:px-0 text-lg lg:text-2xl font-light text-center">
              Easily provide your land{"'"}s dimensions and specs from home.
              Just share your details online, and our experts will handle the
              rest!
            </div>
          </div>
          <div className="flex items-center w-[50vw] lg:w-[25vw] justify-center">
            <img
              src="../img-2.png"
              alt="bg"
              className="scrollAniRight w-full rounded-xl"
            />
          </div>
        </div>
        <div className="w-[95vw] mt-4 md:mt-0 bg-gray-50 shadow-xl p-2 md:p-0 rounded-lg md:border-none flex flex-wrap-reverse gap-10 lg:gap-36 items-center justify-center lg:mt-20">
          <div className="flex justify-center lg:m-4 w-[50vw] lg:w-[30vw]">
            <img
              src="../img1.webp"
              alt="bg"
              className="scrollAniLeft lg:w-full m-2 md:m-0 rounded-xl"
            />
          </div>
          <div className="flex flex-col items-center scrollAniRight lg:w-[50vw] ">
            <h1 className=" text-2xl lg:text-4xl font-bold w-full text-center">
              Empowering the Next Generation of Architects.
            </h1>
            <div className=" px-20 lg:px-0 text-lg lg:text-2xl font-light mt-2 text-center">
              Our firm, Maprap, provides a healthy work environment instead of
              exploiting employees. We seek excellent work but also help our
              employees grow.{" "}
              <strong className="font-semibold">
                Maprap isn{`'`}t just ours—it truly belongs to our online
                employees.
              </strong>
            </div>
            <Button
              className="bg-blue-600 my-2 hover:bg-blue-700"
              onClick={() => {
                window.location.replace("/jobs");
              }}
            >
              Jobs
            </Button>
          </div>
        </div>
        {/* <div className=" bg-gray-50 shadow-xl mb-2 p-2 md:p-0 rounded-lg mt-4 w-[95vw] flex flex-wrap gap-10 lg:gap-36 items-center justify-center lg:mt-20 md:mt-8">
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
        </div> */}
      </section>

      <div>
        <QueryForm />{" "}
      </div>
      <div>
        <div className="text-3xl text-center font-semibold">
          Meet the Engineers
        </div>
        <div className="mb-5 w-full">
          <Slide2 />
        </div>
      </div>
      <div className="bg-[url('/office.jpg')] bg-cover">
        <div className="bg-black opacity-50">
          <div className="w-full">
            <div className="flex h-screen items-center justify-center gap-10 mb-8 flex-col">
              <div className="flex justify-center gap-10 lg:gap-28 h-[30vh] w-[80vw] text-3xl">
                <Card className="flex flex-col justify-center  bg-transparent flex-1 text-sm lg:text-3xl  text-white">
                  <CardHeader>
                    <CardTitle className="flex text-white flex-col items-center">
                      <HomeIcon />
                      <AnimatedNumberSection upto={2200} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    Projects Completed
                  </CardContent>
                </Card>
                <Card className="flex text-sm lg:text-3xl flex-col justify-center  bg-transparent flex-1  text-white">
                  <CardHeader>
                    <CardTitle className="flex flex-col items-center">
                      <Building />
                      <AnimatedNumberSection upto={2000} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    Cities Covered
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-center gap-10 lg:gap-28 h-[30vh] w-[80vw] text-3xl">
                <Card className="flex text-sm lg:text-3xl flex-col justify-center  bg-transparent flex-1  text-white">
                  <CardHeader>
                    <CardTitle className="flex flex-col items-center">
                      <Handshake />
                      <AnimatedNumberSection upto={20} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    Partener{`'`}s office in 20+ cities
                  </CardContent>
                </Card>
                <Card className="flex text-sm lg:text-3xl flex-col justify-center  bg-transparent flex-1  text-white">
                  <CardHeader>
                    <CardTitle className="flex flex-col items-center">
                      <ThumbsUp />
                      <AnimatedNumberSection upto={80250} />
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    Facebook Likes
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <section className="">
        <div ref={section2Ref} className="bg-slate-200 md:p-4">
          <Foot />
        </div>
      </section>
    </div>
  );
}
