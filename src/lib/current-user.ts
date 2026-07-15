import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

/**
 * Returns the currently authenticated user
 * together with role and company.
 */
export async function getCurrentUser() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return null;
  }

  return await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
    include: {
      role: true,
      company: true,
    },
  });
}