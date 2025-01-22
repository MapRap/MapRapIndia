import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type Props = {
  title: string;
  content: string;
};

const Det = ({ title, content }: Props) => {
  return (
    <Card className="bg-white border hover:bg-[#dadada] text-xs text-black h-[20vh] p-0 m-2 border-black">
      <CardHeader>
        <CardTitle className="underline font-extrabold">{title}</CardTitle>
      </CardHeader>
      <CardContent className="h-40 text-gray-700">{content}</CardContent>
    </Card>
  );
};

export default Det;
