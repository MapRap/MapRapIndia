"use client";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-0 p-0 ">
      <div className="flex">
        <img
          src={`../logo.png`}
          alt="logo"
          width={80}
          className="rounded-lg cursor-pointer absolute top-2 left-2"
          onClick={() => {
            window.location.replace("/");
          }}
        />
        <div className="hidden xl:block">
          <video
            src="../../bg-vid2b.mp4"
            autoPlay
            muted
            loop
            className="absolute z-[-10] w-[100vw]"
          ></video>
        </div>
        <div className="hidden lg:block">
          <video
            src="../../bgVid2.mp4"
            autoPlay
            muted
            loop
            className="absolute z-[-10] w-[100vw]"
          ></video>
        </div>
        <div className="md:hidden">
          <img
            src={`../yel5.jpg`}
            alt="logo"
            width={80}
            className="absolute z-[-10] h-[550vh] w-full"
            onClick={() => {
              window.location.replace("/");
            }}
          />
        </div>
        <div className="hidden md:block lg:hidden">
          <video
            src="../../bg-vid3.mp4"
            autoPlay
            muted
            loop
            className="absolute z-[-10] w-[100vw]"
          ></video>
        </div>
      </div>
      <div className="bg-black absolute z-10 top-10 h-screen opacity-75"></div>
      {children}
    </div>
  );
};
export default layout;
