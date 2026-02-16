"use client";

import "dotenv/config";
import { useState } from "react";
import { Role } from "@/db/generated/prisma/enums";

interface DataType {
  message: string;
}

export default function Home() {
  const [data, setData] = useState<DataType>({
    message: "No request made!!!",
  });

  const handleClick = async (
    removeRole = false,
    currentRole: Role = "USER",
  ) => {
    try {
      const result = await fetch(
        "https://next-level-web-three.vercel.app/api/protected",
        !removeRole
          ? {
              headers: {
                role: currentRole,
              },
            }
          : {},
      );
      const data = await result.json();
      setData(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="w-screen h-screen flex flex-col items-center justify-center">
        <h1 className="text-3xl font-semibold">Next Level Web</h1>
        <div className="flex gap-4 my-5">
          <button
            onClick={() => handleClick(true)}
            className="rounded-lg py-1 px-3 text-white bg-orange-500 cursor-pointer hover:shadow-md transition duration-300 ease-in-out"
          >
            Request as New User
          </button>
          <button
            onClick={() => handleClick(false, "ADMIN")}
            className="text-white bg-green-500 rounded-lg py-1 px-3 cursor-pointer hover:shadow-md transition duration-300 ease-in-out"
          >
            Request as Admin
          </button>
          <button
            onClick={() => handleClick(false, "USER")}
            className="text-white bg-blue-500 rounded-lg py-1 px-3 cursor-pointer hover:shadow-md transition duration-300 ease-in-out"
          >
            Request as User
          </button>
        </div>
        <div>
          <p className="text-lg italic">{data.message}</p>
        </div>
      </div>
    </>
  );
}
