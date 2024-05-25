"use client"
import { signOut } from "next-auth/react";
import Image from "next/image";

export default function Home() {
  return (
    <main className="bg-[#fefefe] min-h-dvh w-dvw  ">
      <div className="flex justify-end mt-2 px-4 " >
      <button onClick={() => signOut({ callbackUrl: '/login' })} className=" px-3 py-1 rounded-md text-[#fff] bg-[#49a39a] font-medium mr-4 " >
        sign out
      </button>
      </div>
      home

    </main>
  );
}
