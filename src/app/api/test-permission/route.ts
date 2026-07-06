import { NextResponse } from "next/server";
import { hasPermission, PERMISSIONS } from "@/lib/rbac";

export async function GET() {
  const adminCanCreateUsers = await hasPermission(
    "Admin",
    PERMISSIONS.USERS.CREATE
  );

  const managerCanDeleteUsers = await hasPermission(
    "Manager",
    PERMISSIONS.USERS.DELETE
  );

  return NextResponse.json({
    adminCanCreateUsers,
    managerCanDeleteUsers,
  });
}