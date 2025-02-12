// import { DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";

// type Props = {};

const Foot = () => {
  console.log(process.env.NEXT_PUBLIC_DOMAIN_NAME);
  return (
    <div className="flex gap-3 justify-evenly">
      <div className="m-4 flex flex-col gap-4 text-sm items-center font-semibold">
        <a
          href="https://www.instagram.com/mynaksha/"
          className="flex hover:underline semibold text-sm"
        >
          <img
            width={20}
            className="border rounded-3xl"
            src="../Screenshot (41).png"
          />
          instagram
        </a>
        <div className="flex ">
          <img
            src="../Screenshot (42).png"
            alt=""
            width={20}
            className="border rounded-3xl"
          />
          Gmail:
        </div>
        <div className="flex ">
          <img
            src="../Screenshot (43).png"
            alt=""
            width={20}
            className="border rounded-3xl"
          />
          Phone:8899781150
        </div>
        {/* <div>Owner Gmail:</div> */}
      </div>
      <div className="m-4 flex flex-wrap flex-col gap-4 text-xs gs:text-sm md:text-base items-center ">
        {/* <a
          href="https://merchant.razorpay.com/policy/PewAz9Toht0Y2Z/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          Privacy Policy
        </a> */}
        <a
          href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/terms`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          Terms And Conditions
        </a>
        <a
          href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/cancellation`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          Cancellataion And Refund
        </a>
      </div>
      <div className="m-4 flex flex-col gap-4 flex-wrap items-center text-xs gs:text-sm md:text-base">
        <a
          href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/shipping`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          Shipping
        </a>
        <a
          href="https://merchant.razorpay.com/policy/PewAz9Toht0Y2Z/contact_us"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          Contact us
        </a>
      </div>
    </div>
  );
};

export default Foot;
