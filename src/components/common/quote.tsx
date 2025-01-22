import React from "react";

const Quote = () => {
  return (
    <div className=" hover:bg-gray-200 h-60 p-4 bg-slate-100">
      <div className="h-full gap-8">
        <div className="flex flex-col justify-center items-center h-[90%] gap-6">
          <h1 className="font-extrabold text-3xl">
            {" "}
            Building Dreams, One Brick at a Time
          </h1>
          <div className="font-semibold">
            We don’t just build structures, we bring your visions to life with
            quality, precision, and passion.
          </div>
        </div>
        <div className="text-end font-semibold">~AR.AYUSH CHOUDHARY</div>
      </div>
    </div>
  );
};

export default Quote;
