import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";

type Props = {
  title: string;
  content: string;
  img: string;
  Butto: string;
  onClick: () => void;
};
const WorkCard = ({ title, content, img, Butto, onClick }: Props) => {
  return (
    <Card className="w-[70vw] md:h-[65vh] md:w-[30vw] lg:w-[25vw] shadow-xl p-6 cursor-pointer border-none bg-gray-50 hover:bg-gray-100">
      <CardTitle className="flex flex-col items-center">
        <img
          width={100}
          src={`../${img}`}
          alt="ava1"
          className="rounded-full"
        />
        <CardHeader className="font-bold text-base lg:text-2xl text-center text-black">
          {title}
        </CardHeader>
      </CardTitle>
      <CardContent className="flex items-center flex-col text-gray-600 text-sm lg:text-base text-center">
        {content}
        <Button
          className="bg-blue-600 font-medium border rounded-lg text-white text-sm hover:bg-blue-700 p-4 mt-4"
          onClick={onClick}
        >
          {Butto}
        </Button>
      </CardContent>
    </Card>
  );
};

export default WorkCard;
