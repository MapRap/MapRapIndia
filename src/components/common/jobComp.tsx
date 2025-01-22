import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Button } from "../ui/button";
import { PaperclipIcon } from "lucide-react";

type Props = {
  jobTitle: string;
  jobDescription: string;
};

const JobComp = ({ jobTitle, jobDescription }: Props) => {
  return (
    <Card className="m-4 hover:bg-gray-100 cursor-pointer w-1/2 bg-[#FAF4E6] opacity-90 text-[#4A3D36]">
      <CardHeader>
        <CardTitle>{jobTitle}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col">
          <div className="p-4">{jobDescription}</div>
          <div className="flex gap-3 items-center">
            <Button className="bg-green-600 hover:bg-green-700 w-1/3">
              Request job
            </Button>
            <div>
              <PaperclipIcon />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobComp;
