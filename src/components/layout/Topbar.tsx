"use client";

import { useSession } from "next-auth/react";

export default function Topbar() {
  const { data: session, status } = useSession();

  // Show placeholder while session is loading
  if (status === "loading") {
    return (
      <div className="bg-white shadow p-4 flex justify-between">
        <h1 className="text-2xl font-bold">
          Dashboard
        </h1>

        <div>Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-white shadow p-4 flex justify-between">
      <h1 className="text-2xl font-bold">
        Dashboard
      </h1>

      <div>
        Welcome, {session?.user?.name}
      </div>
    </div>
  );
}