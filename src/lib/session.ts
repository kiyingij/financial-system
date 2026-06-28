import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

/**
 * Returns the authenticated user's session
 * from a Server Component.
 */
export async function getSession() {
  return getServerSession(authOptions);
}