"use client";

import { SessionProvider } from "next-auth/react";

/**
 * Makes authentication session available
 * to the entire application.
 */
export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      {children}
    </SessionProvider>
  );
}