"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the homepage after a short delay
    const timer = setTimeout(() => {
      router.replace("/");
    }, 1000); // Set delay as desired

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="h-screen bg-black w-screen text-white text-2xl flex items-center justify-center flex-col">
      <div>
        You are not authorized to view this page, login as the required user to
        access this page
      </div>
      <div
        className="m-4"
        onClick={() => {
          router.push(`/`);
        }}
      >
        Redirectiong to Home page
      </div>
    </div>
  );
}
