import { PERMISSIONS } from "@/constants/permissions";
import { ROLES } from "@/constants/roles";

/**
 * Check whether a role is the system administrator.
 */
export function isAdmin(role?: string) {
  return role === ROLES.ADMIN;
}

/**
 * Temporary permission checker.
 *
 * Until we finish connecting Roles ↔ Permissions,
 * only Administrators have access.
 */
export function hasPermission(
  role: string | undefined,
  permission: string
): boolean {

  // Prevent unused variable warning while we're building.
  void permission;

  if (!role) return false;

  if (isAdmin(role)) {
    return true;
  }

  return false;
}

export { PERMISSIONS };