"use client";
const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex items-center justify-center bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-sky-400 to-blue-800">
      <img
        src={`../logo.png`}
        alt="logo"
        width={80}
        className="w-12 md:w-16 rounded-lg cursor-pointer absolute top-0 left-0"
        onClick={() => {
          window.location.replace("/");
        }}
      />
      {children}
    </div>
  );
};

export default AuthLayout;
