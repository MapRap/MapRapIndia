"use client";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-0 p-0 ">
      {" "}
      <img
        src={`../logo.png`}
        alt="logo"
        width={80}
        className="rounded-lg cursor-pointer absolute top-4 left-2 z-50"
        onClick={() => {
          window.location.replace("/");
        }}
      />
      <div className="bg-black absolute z-10 top-10 h-screen opacity-75"></div>
      {children}
    </div>
  );
};
export default layout;
