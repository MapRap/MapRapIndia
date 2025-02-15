"use client";

// import { useRouter } from "next/navigation";

interface LoginButtonProps {
  children: React.ReactNode;
  mode?: "modal" | "redirect";
  asChild?: boolean;
}

export const LoginButton = ({
  children,
  mode = "redirect",
}: LoginButtonProps) => {
  // const router = useRouter();
  // const onClick = () => {};
  return (
    <button
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={() => {
        if (mode === "modal") {
          alert("Open modal");
        } else {
          alert("Redirect to login page");
        }
      }}
    >
      {children}
    </button>
  );
};
