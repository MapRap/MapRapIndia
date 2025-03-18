// import { DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";

// type Props = {};

const Foot = () => {
  return (
    <div className="flex text-slate-700 w-[90vw] justify-evenly text-[8px] md:text-base">
      <div className="flex flex-col gap-4 items-start ">
        <a
          href="https://www.instagram.com/mynaksha/"
          className="flex hover:underline"
        >
          <img
            width={20}
            className="border rounded-3xl"
            src="../Screenshot (41).png"
          />
          instagram
        </a>
        <a className="flex hover:underline" href="mailto:maprapindia@gmail.com">
          <img
            src="../Screenshot (42).png"
            alt=""
            width={20}
            className="border rounded-3xl"
          />
          Gmail : maprapindia@gmail.com
        </a>
        <div className="flex ">
          <img
            src="../Screenshot (43).png"
            alt=""
            width={20}
            className="border rounded-3xl"
          />
          Phone : 8899781150
        </div>
        {/* <div>Owner Gmail:</div> */}
      </div>
      <div className="m-4 flex justify-center text-center flex-col gap-4 items-center ">
        {/* <a
          href="https://merchant.razorpay.com/policy/PewAz9Toht0Y2Z/privacy"
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          Privacy Policy
        </a> */}
        <a
          href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/privacy`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer flex-1 hover:underline"
        >
          Privacy Policy
        </a>

        <a
          href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/cancellation`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline flex-1"
        >
          Cancellataion And Refund
        </a>
      </div>
      <div className="m-4 flex flex-col gap-4 justify-center text-center flex-wrap items-center ">
        <a
          href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/terms`}
          target="_blank"
          rel="noopener noreferrer"
          className="cursor-pointer hover:underline"
        >
          Terms And Conditions
        </a>
        <a
          href={`${process.env.NEXT_PUBLIC_DOMAIN_NAME}/contact`}
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
