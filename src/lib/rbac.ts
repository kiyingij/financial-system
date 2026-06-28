import { PERMISSIONS } from "@/constants/permissions";
import { ROLES } from "@/constants/roles";

/**
 * Checks whether a user is an administrator.
 */
export function isAdmin(role?: string) {
  return role === ROLES.ADMIN;
}

/**
 * Checks whether a role has a permission.
 *
 * Temporary implementation.
 * In the next step this will read from the database.
 */
export function hasPermission(
  role: string | undefined,
  permission: string
): boolean {

  // Prevent unused parameter warning.
  void permission;

  if (!role) {
    return false;
  }

  return isAdmin(role);
}

export { PERMISSIONS };