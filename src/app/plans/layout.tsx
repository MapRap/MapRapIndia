"use client";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-0 bg-cover p-0 bg-[url(https://utfs.io/f/GH57qH88dIR16XKLQ9jxgPGhBNQryDlCL3wSsbFTdA1ni47v)]">
      {" "}
      <img
        src={`../logo6.png`}
        alt="logo"
        width={80}
        className="rounded-lg cursor-pointer top-4 left-2 z-50"
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
