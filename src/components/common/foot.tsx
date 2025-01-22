// import { DotsVerticalIcon } from "@radix-ui/react-icons";
import React from "react";

// type Props = {};

const Foot = () => {
  return (
    <div className="flex justify-evenly">
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
      <div>Privacy Policy</div>
    </div>
  );
};

export default Foot;
