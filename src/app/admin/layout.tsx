"use client";
const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="m-0 p-0 ">
      <div
        className="p-4 rounded-full bg-blue-600 w-fit text-white font-semibold sticky top-3 right-2 cursor-pointer "
        onClick={() => {
          window.location.replace(
            `${process.env.NEXT_PUBLIC_DOMAIN_NAME}/admin`
          );
        }}
      >
        Admin
      </div>
      <img
        src={`../logo.png`}
        alt="logo"
        width={80}
        className="rounded-lg cursor-pointer absolute top-4 left-2"
        onClick={() => {
          window.location.replace("/");
        }}
      />
      {children}
    </div>
  );
};
export default layout;
