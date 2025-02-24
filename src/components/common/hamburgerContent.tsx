// import { Cross, CrossIcon } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

interface ChildComponentProps {
  scrollToSection1: () => void;
}

const HamburgerContent: React.FC<ChildComponentProps> = ({
  scrollToSection1,
}) => {
  return (
    <div className="absolute z-[10000] bg-slate-100 shadow-xl text-gray-800 w-full left-0 pb-2">
      <ul className="flex flex-col items-center w-full">
        {/* <li
          className="border-b-2 w-full hover:bg-white cursor-pointer flex justify-center text-slate-600 py-2"
          onClick={() => {
            window.location.replace("/plans");
          }}
        >
          Interior
        </li> */}
        <li className="border-b-2 w-full hover:bg-white cursor-pointer flex justify-center text-slate-600 py-2">
          <DropdownMenu>
            <DropdownMenuTrigger className="w-full">
              Services
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-32">
              <DropdownMenuLabel
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  window.location.replace("/list");
                }}
              >
                Select your house map
              </DropdownMenuLabel>
              <DropdownMenuLabel
                className="cursor-pointer hover:bg-gray-100"
                onClick={() => {
                  window.location.replace("/plans");
                }}
              >
                Interior Design
              </DropdownMenuLabel>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        {/* <li
          className="flex w-full border-b-2 hover:bg-white cursor-pointer justify-center text-slate-600 py-2"
          onClick={() => {
            window.location.replace("/auth/login");
          }}
        >
          Login
        </li> */}
        <li
          className="flex w-full hover:bg-white cursor-pointer justify-center text-slate-600 py-2"
          onClick={() => {
            window.location.replace("/jobs");
          }}
        >
          Jobs
        </li>
        <li
          className="border-t-2 w-full flex hover:bg-white cursor-pointer justify-center text-slate-600 py-2"
          onClick={() => {
            scrollToSection1();
          }}
        >
          Past Projects
        </li>
      </ul>
    </div>
  );
};

export default HamburgerContent;
