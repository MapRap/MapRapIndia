// "use client";

import { auth } from "@/auth";
import AdminComp from "@/components/common/adminComp";
import LogoComp from "@/components/common/logo";
// import { Divide } from "lucide-react";

const layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  console.log(session?.user.type);
  return (
    <div className="m-0 p-0 ">
      {/* <div
        className="p-4 rounded-full bg-blue-600 w-fit text-white font-semibold sticky top-3 right-2 cursor-pointer "
        onClick={() => {
          window.location.replace(
            `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/admin`
          );
        }}
      >
        Admin
      </div> */}
      <div className="flex justify-between my-2">
        <LogoComp />
        <AdminComp />
        {/* <img
        src={`../logo.png`}
        alt="logo"
        width={80}
        className="rounded-lg cursor-pointer absolute top-4 left-2"
        onClick={() => {
          window.location.replace("/");
          }}
          /> */}
      </div>
      {session?.user.type === "admin" && children}
      {session?.user.type === "owner" && children}
      {session?.user.type === "customer" && (
        <div className="text-center">
          You are not authorized to view this page
        </div>
      )}
      {session?.user.type === "student" && (
        <div className="text-center">
          You are not authorized to view this page
        </div>
      )}
    </div>
  );
};
export default layout;
